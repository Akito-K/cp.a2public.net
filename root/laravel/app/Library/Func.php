<?php
namespace App\Library;

use App\models\User;
use Illuminate\Support\Facades\Auth;

class Func {

    public static function getRandomString($char = 'Aa0', $len = 8, $count = 1){
        $alphabet_upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        $alphabet_lower = 'abcdefghijkmnprstuvwxyz';
        $numbers = '123456789';
        $chars = "";
        $limits = "";
        if(strpos($char, "0") !== false){
            $chars .= $limits = $numbers;
        }
        if(strpos($char, "a") !== false){
            $chars .= $limits = $alphabet_lower;
        }
        if(strpos($char, "A") !== false){
            $chars .= $limits = $alphabet_upper;
        }

        // $count数繰り返す
        $strings = [];
        for($i = 0; $i < $count; $i++){
            $str = "";
            $len = $len ?: rand(16, 24);
            // 1文字目は限定させる
            $pos = rand(0, strlen($limits) - 1 );
            $str = $limits[$pos];

            // 2文字目以降
            for($j=1; $j<$len; $j++){
                $pos = rand(0, strlen($chars) - 1 );
                $str .= $chars[$pos];
            }
            $strings[] = $str;
        }

        if($count == 1){
            return $strings[0];
        }else{
            return $strings;
        }
    }

    private static $wdays = [
        0 => '日',
        1 => '月',
        2 => '火',
        3 => '水',
        4 => '木',
        5 => '金',
        6 => '土',
    ];

    // var_dump
    public static function var_dump($data, $exit = NULL){
        echo '<pre>';
        var_dump($data);
        echo '</pre>';
        if($exit){
            exit;
        }
    }

    public static function getRootPath(){
        return dirname(dirname(dirname(__DIR__)));
    }

    public static function getWday($wnum){
        return isset(self::$wdays[$wnum])? self::$wdays[$wnum]: '-';
    }

    public static function dateFormat($datetime, $format = 'Y/m/d'){
        $result = '';
        if($datetime instanceof \Datetime || $datetime instanceof \DatetimeImmutable){
            $datetime_at = $datetime;
        }elseif(preg_match('/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/', $datetime)){
            $datetime_at = new \Datetime($datetime);
        }

        if(isset($datetime_at)){
            if(preg_match('/\(wday\)/', $format)){
                $formats = explode('(wday)', $format);
                foreach($formats as $i => $myformat){
                    $result .= $datetime_at->format($myformat);
                    if(!$i) {
                        $result .= '（' . self::$wdays[$datetime_at->format('w')] . '）';
                    }
                }
            }else{
                $result = $datetime_at->format($format);
            }
        }

        return $result;
    }

    // 西暦を元号に
    public static function jpnYear($year){
        $jp = "";
        if($year >= 2019) {
            $jp = '令和' . ($year - 2019 + 1);
        }elseif($year >= 1989){
            $jp = '平成'.($year - 1989 + 1);
        }elseif($year >= 1926){
            $jp = '昭和'.($year - 1926 + 1);
        }elseif($year >= 1912){
            $jp = '大正'.($year - 1912 + 1);
        }elseif($year >= 1868){
            $jp = '明治'.($year - 1868 + 1);
        }

        return '（'.$jp.'）';
    }

    public static function var_var_dump($data) {
        // 出力バッファリング開始
        ob_start();
        var_dump($data);
        // バッファの内容を変数へ格納
        $var = ob_get_contents();
        // 出力バッファを消去してバッファリング終了
        ob_end_clean();

        return $var;
    }

    // ファイル名から拡張子を小文字で取得
    public static function getExtension($filename){
        $ext = "";
        if(strpos($filename, '.') !== FALSE){
            $arr = explode('.', $filename);
            $ext = strtolower( end($arr) );
        }

        return $ext;
    }

    public static function getFileName($filepath){
        $filename = $filepath;
        if(strpos($filepath, '/') !== FALSE){
            $arr = explode('/', $filepath);
            $filename = end($arr);
        }

        return $filename;
    }

}
