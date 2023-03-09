'use strict';
export class Func {
    static wdays = {
        0: '日',
        1: '月',
        2: '火',
        3: '水',
        4: '木',
        5: '金',
        6: '土',
    };

    static getExtention( filename ): string {
        let types = filename.split('.');

        return types[types.length - 1].toLowerCase();
    }

    static numberFormat( number ): string {
        return number.toString().replace(/([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,');
    }

    static unitFormat(number, unit = "B"): string {
        let str = number;
        if(number > 1*1000*1000*1000){
            str = Func.numberFormat( (number/1000/1000/1000).toFixed(2) ) + "G";
        }else if(number > 1*1000*1000){
            str = Func.numberFormat( (number/1000/1000).toFixed(2) ) + "M";
        }else if(number > 1*1000){
            str = Func.numberFormat( (number/1000).toFixed(2) ) + "K";
        }

        return str + unit;
    }

    static inArray(needle, haystack): boolean {
        let result = false;
        Object.keys( haystack ).forEach( function(i){
            if( needle == haystack[ Number(i) ]){
                result = true;
            }
        });
        return result;
    }

    static dateFormat(date, format='Y-m-d H:i:s'): string {
        const year    = date.getFullYear();
        const month   = date.getMonth() + 1;
        const day     = date.getDate();
        const hour    = date.getHours();
        const minutes = date.getMinutes();
        const second  = date.getSeconds();

        return format.replace('Y', year)
                    .replace('m', Func.sprintf(month, 2))
                    .replace('d', Func.sprintf(day, 2))
                    .replace('n', month)
                    .replace('j', day)
                    .replace('H', hour)
                    .replace('i', minutes)
                    .replace('s', second);
    }

    static sprintf(num: number, len: number): string{
        if( String(num).length >= len ){
            return String(num);
        }else{
            const zeros = len - String(num).length;
            let str = "";
            for( let i:number = 0; i<zeros; i++){
                str += "0";
            }
            return str + String(num);
        }
    }

    static number( val ): number {
        val = val.replace(/[^0-9]/g, '');
        if( isNaN(val) ){
            return 0;
        }else{
            return Number(val);
        }
    }

    static setAttributes(selector, attribute, value){
        const elms = document.querySelectorAll(selector);
        elms.forEach( (elm, k) => {
            elm.setAttribute(attribute, value);
        });
    }

    static addClass(selector, className){
        const elms = document.querySelectorAll(selector);
        elms.forEach( (elm, k) => {
            elm.classList.add(className);
        });
    }

    static removeClass(selector, className){
        const elms = document.querySelectorAll(selector);
        elms.forEach( (elm, k) => {
            elm.classList.remove(className);
        });
    }

    static showAjaxing(name){
        const ajaxing = document.getElementById('bulletAjaxing' + name);
        ajaxing.classList.add('show');
    }

    static hideAjaxing(name){
        const ajaxing = document.getElementById('bulletAjaxing' + name);
        ajaxing.classList.remove('show');
    }

    static classLists(elms, action, className){
        if(elms.length === 0){
            return;
        }
        elms.forEach( (v: HTMLInputElement, k) => {
            if(action === 'add'){
                v.classList.add(className);
            }else if(action === 'remove'){
                v.classList.remove(className);
            }
        });
    }

    static fadeIn(node, duration) {
        // display: noneでないときは何もしない
        if (getComputedStyle(node).display !== 'none') return;

        // style属性にdisplay: noneが設定されていたとき
        if (node.style.display === 'none') {
            node.style.display = '';
        } else {
            node.style.display = 'block';
        }
        node.style.opacity = 0;

        var start = performance.now();

        requestAnimationFrame(function tick(timestamp) {
            // イージング計算式（linear）
            var easing = (timestamp - start) / duration;

            // opacityが1を超えないように
            node.style.opacity = Math.min(easing, 1);

            // opacityが1より小さいとき
            if (easing < 1) {
                requestAnimationFrame(tick);
            } else {
                node.style.opacity = '';
            }
        });
    }


}
export default Func;
