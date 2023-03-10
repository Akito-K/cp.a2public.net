<?php

namespace App\Library;

class Form
{
    public static function open(array $args){
        $body = '<form method="post" action="' . $args['url'] . '"';
        foreach($args as $k => $v){
            if($v == 'url'){
                continue;
            }
            $body .= ' ' . $k . '="' . $v . '"';
        }
        $body .= '>';
        $body .= '<input name="_token" type="hidden" value="' . csrf_token() . '">';

        return $body;
    }

    public static function close(){
        $body = '</form>';

        return $body;
    }

    public static function file($name, $text, $class_name, $options = []){
        $body = '<label for="input-file-' . $name . '" class="' . $class_name . '">';
        $body .= $text;
        $body .= '<input type="file" id="input-file-' . $name . '" class="trigFileButton" data-name="' . $name . '"';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>';
        $body .= '</label>';

        return $body;
    }

    public static function date($name, $value, $options = []){
        $body = '';
        $body .= '<input type="date" name="' . $name . '" value="' . $value . '"';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>';

        return $body;
    }

    public static function time($name, $value, $options = []){
        $body = '';
        $body .= '<input type="time" name="' . $name . '" value="' . $value . '"';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>';

        return $body;
    }

    public static function button($text, $options = []){
        $body = '<button ';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>' . $text . '</button>';

        return $body;
    }

    public static function hidden($name, $value, $options = []){
        $body = '<input type="hidden" name="' . $name . '" value="' . $value . '"';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>';

        return $body;
    }

    public static function text($name, $value, $options = []){
        $body = '';
        $body .= '<input type="text" name="' . $name . '" value="' . $value . '"';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>';

        return $body;
    }

    public static function email($name, $value, $options = []){
        $body = '';
        $body .= '<input type="email" name="' . $name . '" value="' . $value . '"';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>';

        return $body;
    }

    public static function tel($name, $value, $options = []){
        $body = '';
        $body .= '<input type="tel" name="' . $name . '" value="' . $value . '"';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>';

        return $body;
    }

    public static function password($name, $options = []){
        $body = '';
        $body .= '<input type="password" name="' . $name . '"';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>';

        return $body;
    }

    public static function textarea($name, $value, $options = []){
        $body = '';
        $body .= '<textarea name="' . $name . '" value="' . $value . '"';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>' . $value . '</textarea>';

        return $body;
    }


    public static function checkbox($name, $values, $default_value, $input_class = ''): string {
        $body = '';
        if(!empty($values)) {
            foreach ($values as $k => $v) {
                $checked = in_array($k , $default_value) ? ' checked="checked"' : '';
                $body .= '  <input type="checkbox" name="' . $name . '[]" value="' . $k . '" id="' . $name . '-' . $k . '"' . $checked . ' class="' . $input_class . '" data-name="'.$name.'">';
                $body .= '  <label class="contact-form__check-icon" for="' . $name . '-' . $k . '">' . $v . '</label>';
            }
        }

        return $body;
    }

    public static function radioBox($name, $values, $default_value, $input_class = ''): string {
        $body = '';
        if(!empty($values)) {
            foreach ($values as $k => $v) {
                $checked = $k == $default_value ? ' checked="checked"' : '';
                $body .= '<li class="contact-form__radio" data-name="'.$name.'">';
                $body .= '  <input type="radio" name="' . $name . '" value="' . $k . '" id="' . $name . '-' . $k . '"' . $checked . ' class="' . $input_class . '" data-name="'.$name.'">';
                $body .= '  <label class="contact-form__check-icon" for="' . $name . '-' . $k . '">' . $v . '</label>';
                $body .= '</li>';
            }
        }

        return $body;
    }

    public static function checkboxes(string $name, $values, array $checked_values = [], ?string $class = ''){
        $body  = '<fieldset class="' . $class . '__fieldset">';
        if(!empty($values)){
            $i = 0;
            foreach($values as $k => $v){
                $i++;
                $checked = in_array($k, $checked_values) ? ' checked': '';
                $body .= '
                <div class="' . $class . '">
                    <input name="' . $name . '[]" id="' . $name . '-' . $i . '" type="checkbox" value="' . $k . '" ' . $checked . ' class="' . $class . '__checkbox">
                    <label for="' . $name . '-' . $i . '" class="' . $class . '__label">' . $v . '</label>
                </div>';
            }
        }
        $body .= '</fieldset>';

        return $body;
    }

    public static function checkboxesWithRadio(string $name, $values, array $checked_values = [], ?string $class = ''){
        $body  = '
        <fieldset class="' . $class . '__fieldset">
            <table class="' . $class . '">
        ';
        if(!empty($values)){
            $i = 0;
            foreach($values as $k => $v){
                $i++;
                $checked1 = '';
                $checked2 = ' checked';
                if(in_array($k, $checked_values)){
                    $checked1 = ' checked';
                    $checked2 = '';
                }
                $body .= '
                    <tr>
                        <th>' . $v . '</th>
                        <td>
                            <input type="radio" name="' . $name . '[' . $i . ']" id="' . $name . '-' . $i . '-1" ' . $checked1 . ' value="' . $k . '">
                            <label for="' . $name . '-' . $i . '-1" class="' . $class . '__label">有</label>
                        </td>
                        <td>
                            <input type="radio" name="' . $name . '[' . $i . ']" id="' . $name . '-' . $i . '-2" ' . $checked2 . ' value="">
                            <label for="' . $name . '-' . $i . '-2" class="' . $class . '__label">無</label>
                        </td>
                    </tr>
                ';
            }
        }
        $body .= '
            </table>
        </fieldset>';

        return $body;
    }

    public static function select(string $name, $values, string $selected_value = NULL, $options = []){
        $body  = '';
        $body .= '<label class="select-arrow">';
        $body .= '<select name="' . $name . '"';
        if(!empty($options)){
            foreach($options as $k => $v){
                $body .= ' ' . $k . '="' . $v . '"';
            }
        }
        $body .= '>';
        if(!empty($values)){
            foreach($values as $k => $v){
                $selected = $selected_value == $k ? ' selected': '';
                $add = '';
                if( isset($options['readonly']) && $options['readonly'] == 'readonly' ){
                    $add = ' disabled="disabled"';
                }
                $body .= '<option value="' . $k . '"' . $selected . $add . '>';
                $body .= $v;
                $body .= '</option>';
            }
        }
        $body .= '</select>';
        $body .= '</label>';

        return $body;
    }

    public static function radios(string $name, $values, string $checked_value = NULL, ?string $class = ''){
        $body  = '<fieldset class="' . $class . '__fieldset">';
        if(!empty($values)){
            $i = 0;
            foreach($values as $k => $v){
                $i++;
                $checked = $checked_value == $k ? ' checked': '';
                $body .= '<div class="' . $class . '">';
                $body .= '<input name="' . $name . '" id="' . $name . '-' . $i . '" type="radio" value="' . $k . '" ' . $checked;
                $body .= ' class="' . $class . '__radio"';
                $body .= '>';
                $body .= '<label for="' . $name . '-' . $i . '"';
                $body .= ' class="' . $class . '__label"';
                $body .= '>';
                $body .= $v;
                $body .= '</label>';
                $body .= '</div>';
            }
        }
        $body .= '</fieldset>';

        return $body;
    }

    // 年選択肢
    public static function getSelectYears($min = 1930, $max = 2014){
        $ary = ['' => '選択'];
        for($i = $max; $i >= $min; $i--){
            $ary[$i] = $i . Func::jpnYear($i);
        }

        return $ary;
    }

    // 月選択肢
    public static function getSelectMonthes(){
        $ary = ['' => '選択'];
        for($i = 1; $i <= 12; $i++){
            $ary[$i] = $i;
        }

        return $ary;
    }

    // 日選択肢
    public static function getSelectDays(){
        $ary = ['' => '選択'];
        for($i = 1; $i <= 31; $i++){
            $ary[$i] = $i;
        }

        return $ary;
    }


}
