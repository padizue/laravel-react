<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



//genre
Route::get('genre','ApiController@genreFetchAll')->middleware('cors');
Route::post('genre','ApiController@genreCreate');
Route::post('genre/{genre}','ApiController@genreUpdate');
Route::get('genre/{genre}','ApiController@getGenre');
Route::post('genre/{genre}/remove','ApiController@genreDestroy');


//movie
Route::get('genre/{genre}/movies','ApiController@genreFetchMovies')->middleware('cors');
Route::post('movie','ApiController@createMovie');
Route::post('movie/{movie}','ApiController@updateMovie');
Route::get('movie/{movie}','ApiController@getMovie');
Route::post('movie/{movie}/remove','ApiController@destroyMovie');

