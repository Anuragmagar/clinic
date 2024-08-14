<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Specialization;

class SpecializationController extends Controller
{
    public function index(){
        return Specialization::all();
    }
}
