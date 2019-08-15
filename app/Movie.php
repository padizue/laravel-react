<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    //
    protected $table = 'movie';

    function genre(){
        return $this->belongsTo(Genre::class,'genre_id');
    }
}
