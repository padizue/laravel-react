<?php

namespace App\Http\Controllers;

use App\Genre;
use App\Movie;
use Illuminate\Http\Request;


class ApiController extends BaseApiController
{
    //Genres
    function genreCreate(Genre $genre, Request $request)
    {
        $genre->name = $request->name;
        $genre->image = $request->image;
        $genre->save();
        return $this->withSuccess('New Genre Added', $genre);
    }

    function genreUpdate(Genre $genre, Request $request)
    {
        $genre->name = $request->name;
        $genre->image = $request->image;
        $genre->save();
        return $this->withSuccess('Genre Updated', $genre);
    }

    function getGenre(Genre $genre){
        return $this->withSuccess('',$genre);
    }

    function genreFetchAll(Genre $genre)
    {
        return $this->withSuccess('', $genre->all());
    }

    function genreFetchMovies(Genre $genre)
    {
        return $this->withSuccess('', $genre->movies);
    }

    function genreDestroy(Genre $genre)
    {
        $genre->delete();
        return $this->withSuccess('Genre Removed', $genre);
    }


    ///Movies//////////////
    function createMovie(Movie $movie, Request $request)
    {
        $movie->genre_id = $request->genre_id;
        $movie->name = $request->name;
        $movie->image = $request->image;
        $movie->description = $request->description;
        $movie->save();
        return $this->withSuccess('Movie Created', $movie);
    }

    function updateMovie(Movie $movie, Request $request)
    {
        // $movie->genre_id = $request->genre_id;
        $movie->name = $request->name;
        $movie->image = $request->image;
        $movie->description = $request->description;
        $movie->save();
        return $this->withSuccess('Movie Updated', $movie);
    }

    function getMovie(Movie $movie){
      return $this->withSuccess('',$movie);
    }

    function destroyMovie(Movie $movie)
    {
        $movie->delete();
        return $this->withSuccess('Movie removed', $movie);
    }
}
