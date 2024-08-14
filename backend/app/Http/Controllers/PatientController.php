<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Models\User;
use App\Models\Patient;

class PatientController extends Controller
{
    public function index()
    {
        return Patient::with(['user'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'address' => ['required'],
            'dob' => ['required'],
            'gender' => ['required'],
        ]);

        if ($request->hasFile('image')) {
            // Store the file in the 'images' directory within the 'public' disk
            $path = $request->file('image')->store('images', 'public');
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
            'profile' => $path ?? null,
            'role_id' => 4, //role_id = 1 for admin, 2 for doctor, 3 for staff and 4 for patient
        ]);
        if ($user) {
            // var_dump($user->id);
            $phone = $request->phone === 'undefined' ? null : $request->phone;
            $doctor = Patient::create([
                'user_id' => $user->id,
                'contact' => $phone,
                'gender' => $request->gender,
                'dob' => $request->dob,
                'address' => $request->address
            ]);
        }
        // var_dump($user);
    }
}
