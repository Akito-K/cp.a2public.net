<?php
namespace App\Library;

class Upload {

    // POSTで渡されたJSONを取得
    static public function getParamJSON(){
        $buff = file_get_contents('php://input');
        $json = json_decode($buff, true);

        return($json);
    }

    // サーバへ保存
    public static function saveAsImage($json, $save_directory, $save_filename){
        // Base64をバイナリに戻す
        $data = $json['data'];
        $data = str_replace('data:image/png;base64,', '', $data);  // 冒頭の部分を削除
        $data = str_replace(' ', '+', $data);  // 空白を'+'に変換
        $image = base64_decode($data);

        // ファイルへ保存
        $root = Func::getRootPath();

        return $result = file_put_contents($root . $save_directory . '/' . $save_filename, $image, LOCK_EX);
    }

}
