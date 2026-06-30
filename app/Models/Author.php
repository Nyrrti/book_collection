<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Author extends Model
{
    use HasFactory;
    protected $fillable = [
        'firstName', 
        'lastName'
    ,];

    public function items() {
        return $this->hasMany(Item::class);
    }
}
