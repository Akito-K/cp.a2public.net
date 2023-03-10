<?php
namespace App\Library;

class Asset
{
    public static function css($path = null){
        return '/shared/css/dest' . $path;
    }

    public static function js($path = null){
        return '/shared/js/dest' . $path;
    }

    public static function img($path = null){
        return '/shared/img' . $path;
    }
}
