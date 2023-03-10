<?php
namespace App\Library;
use App\Library\Form;

class HTML
{
    public static $NL = "\n";

    public static function img($dir, $filename, $ext, $alt = '', $class = '', $options = []) {
        $body  = '<img src="' . $dir . '/' . $filename . '.' . $ext . '" alt="' . $alt . '" class= "' . $class . '"';
        $body .= ' srcset="';
        $body .= $dir . '/' . $filename . '.' . $ext . ' 1x,';
        $body .= $dir . '/' . $filename . '@2x.' . $ext . ' 2x';
        $body .= '"';

        if (!empty($options)){
            foreach ($options as $k => $v) {
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>';

        return $body;
    }

    // nav の a タグ
    public static function navAOpen($route, $options = null){
        $active = \Route::currentRouteName() === $route ? 'active': '';
        $body = '<a href="' . route($route, $options) . '" class="nav-link ' . $active . '">';

        return $body;
    }
    public static function navAClose(){
        return '</a>';
    }

    // Form submit をテキストリンクっぽく
    public static function postLink($url, $text, $options = [], $hiddens = []){
        $body = '';
        $body .= Form::open(['url' => $url]) . self::$NL;

        $options['type'] = 'submit';
        $body .= Form::button($text, $options) . self::$NL;

        if(!empty($hiddens)){
            foreach($hiddens as $name => $value){
                $body .= Form::hidden($name, $value) . self::$NL;
            }
        }

        $body .= Form::close() . self::$NL;

        return $body;
    }

    /**
     * エラーアラート
     *
     * @param array $errors
     * @return String HTML
     */
    public static function errorAlert($errors = [], $class = ''){
        $body = "";
        if( count($errors) > 0){
            $body .= '
                <div class="alert alert-parent ' . $class . '">
                    <strong>【入力エラー】</strong> 入力に誤りがあります。ご確認の上もう一度送信してください。
                </div>';
        }

        return $body;
    }

    /**
     * 個別のエラーメッセージ
     *
     * @param array $errors
     * @return String HTML
     */
    public static function errorMessage(string $input_name, $errors = []){
        $body = "";
        if( count($errors) > 0){
            foreach ($errors->all() as $error){
                $body .= '<li>'.$error.'</li>';
            }
            $body .= '
                    </ul>
                </div>';
        }
        return $body;
    }

    /**
     * フラッシュメッセージ
     *
     * @return String HTML
     */
    public static function flashMessage(){
        $body = "";
        if (\Session::has('flash_message')){
            $body .= '<div class="alert alert-success">'.\Session::get('flash_message').'</div>';
        }
        return $body;
    }


    public static function Thumbnail($url){
        return '<span class="my-thumbnail">
                    <span class="my-thumbnail__img" style="background-image: url('.$url.');"></span>
                </span>';
    }

    public static function ThumbnailSquare($url, $options=[] ){
        $class = 'my-thumbnail__img my-thumbnail__img--square';
        $option = '';
        foreach($options as $k => $v){
            if($k == 'class'){
                $class .= ' '.$options['class'];
            }else{
                $option .= ' '.$k.'="'.$v.'"';
            }
        }

        return '<span class="my-thumbnail">
                    <span class="'.$class.'" style="background-image: url('.Func::getImage($url).');" '.$option.'></span>
                </span>';
    }

    public static function naviList($url, $name, $icon_html = ''){
        $body  = '';
        $body .= '<li class="navi__list">';
        $body .= '<a class="navi__list__body" href="' . $url . '">';
        $body .=    $icon_html;
        $body .=    ' ' . $name;
        $body .= '</a>';
        $body .= '</li>';

        return $body;
    }

    public static function naviListWithFontawesome($name, $url, $icon, $category = 'pickup'){
        $body  = '<li>';
        $body .= '<a class="navi__body" href="' . $url . '" data-category="' . $category . '">';
        $body .=    $icon;
        $body .=    $name;
        $body .= '</a>';
        $body .= '</li>';

        return $body;
    }

    public static function indexNaviList($name, $url, $icon_number, $category, $has_auth = true, $options = []){
        if( !$has_auth ) { $category = 'no-authority'; }

        $body  = '<li class="contents__box__list" data-category="' . $category . '">';

        if($has_auth){
            $body .= '<a href="' . $url . '" class="contents__box__list__link" data-category="' . $category . '">';
            $body .=    '<img src="' . Asset::img('/mypage/icon_' . $icon_number . '.png') . '">';
            $body .=    $name;
            $body .= '</a>';
        }else{
            $body .= '<span class="contents__box__list__link" data-category="' . $category . '">';
            $body .=    '<img src="' . Asset::img('/mypage/icon_' . $icon_number . '-gray.png') . '">';
            $body .=    $name;
            $body .= '</span>';
        }

        $body .= '</li>';

        return $body;
    }

    public static function indexNaviListWithFontawesome($name, $url, $icon, $category = 'pickup'){
        $body  = '<li class="contents__box__list" data-category="' . $category . '">';
        $body .= '<a href="' . $url . '" class="contents__box__list__link" data-category="' . $category . '">';
        $body .=    $icon;
        $body .=    $name;
        $body .= '</a>';
        $body .= '</li>';

        return $body;
    }


    public static function prevMonthDays($year, $month){
        $date_at = new \Datetime();
        $date_at->setDate($year, $month, 1);
        $wnum = $date_at->format('w');

        $body = '';
        for($i = 0; $i < $wnum; $i++){
            $body .= '<li>' . "&nbsp;" . '</li>';
        }

        return $body;
    }


}
