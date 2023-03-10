'use strict';
export class Func {

    // クリップボードにコピー
    static copyToClipboard(string){
        // 空div 生成
        var tmp = document.createElement("div");
        // 選択用のタグ生成
        var pre = document.createElement('pre');

        // 親要素のCSSで user-select: none だとコピーできないので書き換える
        pre.style.webkitUserSelect = 'auto';
        pre.style.userSelect = 'auto';

        tmp.appendChild(pre).textContent = string;

        // 要素を画面外へ
        var s = tmp.style;
        s.position = 'fixed';
        s.right = '200%';

        // body に追加
        document.body.appendChild(tmp);
        // 要素を選択
        document.getSelection().selectAllChildren(tmp);

        // クリップボードにコピー
        var result = document.execCommand("copy");

        // 要素削除
        document.body.removeChild(tmp);

        return result;
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

    static number( val ): number {
        val = val.replace(/[^0-9]/g, '');
        if( isNaN(val) ){
            return 0;
        }else{
            return Number(val);
        }
    }

    static showAjaxing(name){
        const ajaxing = document.getElementById('bulletAjaxing' + name);
        ajaxing.classList.add('show');
    }

    static hideAjaxing(name){
        const ajaxing = document.getElementById('bulletAjaxing' + name);
        ajaxing.classList.remove('show');
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
