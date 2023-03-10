<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;

use App\Models\Text;
use App\Models\Tag;

class ViewController extends Controller
{
    public function dashboard() {
        $texts = Text::get()->keyBy('id');
        $tags  = Tag::get()->groupBy('text_id');

        return view('dashboard', compact('texts', 'tags'));
    }


}
