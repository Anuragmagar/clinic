<?php

use App\Http\Controllers\DoctorTimeSlotController;
use App\Http\Controllers\HolidayController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Doctor;
use App\Http\Controllers\SpecializationController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\UserController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// doctor routes
Route::get('/doctors', [DoctorController::class, 'index'])->middleware('auth:sanctum');
Route::get('/all-specialization', [SpecializationController::class, 'index'])->middleware('auth:sanctum');
Route::post('/doctor-create', [DoctorController::class, 'store'])->middleware('auth:sanctum');

//doctors schedule
Route::post('/doctor-schedule-edit', [DoctorTimeSlotController::class, 'schedule_edit'])->middleware('auth:sanctum');
Route::get('/doctor-schedule', [DoctorTimeSlotController::class, 'schedule'])->middleware('auth:sanctum');

// doctors holiday
Route::get('/holidays', [HolidayController::class, 'index'])->middleware('auth:sanctum');
Route::post('/holiday-create', [HolidayController::class, 'store'])->middleware('auth:sanctum');

// Staffs routes
Route::get('/all-staffs', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::post('/staff-create', [UserController::class, 'store'])->middleware('auth:sanctum');

// Patients routes
Route::get('/all-patients', [PatientController::class, 'index'])->middleware('auth:sanctum');
Route::post('/patient-create', [PatientController::class, 'store'])->middleware('auth:sanctum');