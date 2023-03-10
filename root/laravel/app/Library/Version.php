<?php
namespace App\Library;

class Version {
    public static $ver = '0.5.5';

    public static function VER(){
        if(isset(self::$ver)){
            $ver = Version::$ver;
        }else{
            $ver = time();
        }

        return $ver;
    }
}
