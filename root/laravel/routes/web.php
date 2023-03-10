<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ViewController;
use App\Http\Controllers\AsyncController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});
Route::get('', [ViewController::class, 'dashboard']);

Route::group(['prefix' => 'async'], function(){
    Route::post('update', [AsyncController::class, 'update']);
    Route::post('delete', [AsyncController::class, 'delete']);
});

