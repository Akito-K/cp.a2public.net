<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Text;
use App\Models\Tag;

class AsyncController extends Controller
{
    public function update(Request $request) {
        $text_id  = $request->input('text_id');
        $new_text = $request->input('new_text');

        if($text_id){
            $data = Text::find($text_id);
        }else{
            $data = new Text;
        }
        $data->text = $new_text;
        $data->save();

        self::sendResult(true, [
            'textId'  => $data->id,
            'newText' => $new_text,
            'callback' => 'updated'
        ]);
    }

    public function delete(Request $request) {
        $text_id  = $request->input('text_id');

        $data = Text::find($text_id);
        $data->delete();

        Tag::where('text_id', $text_id)->delete();

        self::sendResult(true, [
            'callback' => 'deleted'
        ]);
    }

    public static function sendResult($status, $args = []){
        // CORS (必要に応じて指定)
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: *');
        $data = ['status' => $status];
        if(!empty($args)){
            $data = array_merge($data, $args);
        }

        echo json_encode($data);
    }

}
