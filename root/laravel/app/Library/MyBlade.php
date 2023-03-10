<?php
namespace App\Library;
use App\Models\Project;
use App\Library\Asset;
use App\Models\ProjectDaily;

class MyBlade {

    public static function projectStatus($status){
        return isset(Project::$statuses[$status]) ? Project::$statuses[$status]: '-';
    }

    public static function uploadedImgFilePath($images, int $number){
        $path = Asset::img('/common/no-image.png');
        if(isset($images[$number])){
            $path = $images[$number]->img_filepath;
        }

        return $path;
    }

    public static function uploadedRealFilePath($images, int $number){
        $path = '#';
        if(isset($images[$number])){
            $path = $images[$number]->real_filepath;
        }

        return $path;
    }

    public static function uploadedFileName($images, $number){
        $name = 'No Name';
        if(isset($images[$number])){
            $name = $images[$number]->original_filename;
        }

        return $name;
    }


    public static function roomName($room_id, $room_names){
        return isset($room_names[$room_id]) ? $room_names[$room_id]: '???';
    }

    public static function roomNames($rooms, $room_group_id){
        return isset($rooms[$room_group_id]) ? $rooms[$room_group_id]: [];
    }

    public static function roomGroupName($room_group_id, $room_groups){
        return isset($room_groups[$room_group_id]) ? $room_groups[$room_group_id]: '???';
    }

    public static function checked($room_id, $popups){
        return in_array($room_id, $popups) ? 'checked': '';
    }

    public static function hasPopupRoom($room_names, $popups){
        $has = 0;
        if(!empty($room_names)){
            foreach($room_names as $id => $name){
                if(in_array($id, $popups)){
                    $has = 1;
                    break;
                }
            }
        }

        return $has;
    }

    public static function presidentDailyData($datas, $Ymd){
        $data = new ProjectDaily;
        if(isset($datas[$Ymd])){
            $data = $datas[$Ymd];
            if($data->img_filepath){
                $data->img = '<img src="' . $data->img_filepath . '" alt="アイコン：' . $data->name . '">';
            }else{
                $data->img = '-';
                $data->name = '未設定';
            }
        }else{
            $data->img = '-';
            $data->name = '未設定';
            $data->description = '';
        }

        return $data;
    }

    public static function dailyCategoryName($category){
        return isset(ProjectDaily::$category_names[$category]) ? ProjectDaily::$category_names[$category]: '-';
    }

    public static function isDailyIconSelected($current_img_filepath, $icon_filename){
        return Func::getFileName($current_img_filepath) == $icon_filename;

    }

}
