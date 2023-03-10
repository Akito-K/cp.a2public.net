'use strict';
import Func from './_func';
import Dom  from './_dom';

export class CopyNPaste {

    constructor(
        private texts = {}
    ) {

        if( !document.querySelector('.trigCopy') ){
            return;
        }

        const self = this;
        let trigger, inputElements, box;

        // 読み込み時にテキストをオブジェクトに収納
        inputElements = document.querySelectorAll('.paramTextInput');
        inputElements.forEach( (inputElem) => {
            box = inputElem.parentNode.parentNode.parentNode;
            self.texts[ box.getAttribute('data-id') ] = inputElem.value;
        });

        // 検索
        trigger = document.getElementById('paramSearchInput');
        trigger.addEventListener('input', (e) => {
            const inputText = e.target.value;
            const words = self.getSearchWords(inputText.replace(/　/g, ' '));
            if(words.length === 0){
                return false;
            }
            Object.keys(self.texts).forEach( (textId, k) => {
                const box = document.querySelector('.bulletItemBox[data-id="' + textId + '"]');
                box.classList.remove('hide');
                const val = self.texts[textId];
                // And検索
                let has = true;
                words.forEach( (word) => {
                    if(val.indexOf(word) === -1){
                        has = false;
                        return;
                    }
                });
                if(!has){
                    box.classList.add('hide');
                }
            });
        });


            // ボタン操作
        trigger = document.getElementById('trigItemBoxes');
        trigger.addEventListener('click', (e) => {
            if( Func.hasClass('trigCopy', e) ){
                self.copy(e.target);
            }else if( Func.hasClass('trigEdit', e) ){
                self.edit(e.target);
            }else if( Func.hasClass('trigDuplicate', e) ){
                self.duplicate(e.target);
            }else if( Func.hasClass('trigUpdate', e) ){
                self.update(e.target);
            }else if( Func.hasClass('trigCancel', e) ){
                self.cancel(e.target);
            }else if( Func.hasClass('trigDelete', e) ){
                self.delete(e.target);
            }
        });

        // ボックスを追加
        trigger = document.getElementById('trigAddItemBox');
        trigger.addEventListener('click', () => {
            const clone = <HTMLElement>document.querySelector('.bulletItemBox').cloneNode(true);
            clone.setAttribute('data-id', '');
            const bulletText = <HTMLElement>clone.querySelector('.bulletText');
            bulletText.innerText = '';
            const bulletInput = <HTMLInputElement>clone.querySelector('.paramTextInput');
            bulletInput.value = '';
            const tags = <HTMLElement>clone.querySelector('.bulletTags');
            tags.innerHTML = '';
            const bullet = document.getElementById('trigItemBoxes');
            bullet.append(clone);

            const actionGroup = clone.querySelector('.bulletActionGroup');
            const editGroup   = clone.querySelector('.bulletEditGroup');
            actionGroup.classList.remove('show');
            editGroup.classList.add('show');

            const textElm  = clone.querySelector('.bulletText');
            const inputElm = <HTMLElement>clone.querySelector('.paramTextInput');
            textElm.classList.remove('show');
            inputElm.classList.add('show');
            self.focusEnd(inputElm);
        });
    }

    private copy(trigger) {
        const self = this;
        const textElm = self.getTextElement(trigger);
        Func.copyToClipboard(textElm.innerText);
        trigger.classList.add('btn-action-copied');
        setTimeout( () => {
            trigger.classList.remove('btn-action-copied');
        }, 2000)
    }

    private edit(trigger){
        const self = this;
        const actionGroup = self.getActionGroup(trigger);
        const editGroup   = self.getEditGroup(trigger);
        actionGroup.classList.remove('show');
        editGroup.classList.add('show');

        const textElm  = self.getTextElement(trigger);
        const inputElm = self.getInputElement(trigger);
        textElm.classList.remove('show');
        inputElm.classList.add('show');
        self.focusEnd(inputElm);

        const box = self.getBoxElement(trigger);
        const textId = box.getAttribute('data-id');
        self.texts[textId] = textElm.innerText;
    }

    private duplicate(trigger) {
        const self = this;
        const box = self.getBoxElement(trigger);
        const clone = <HTMLElement>box.cloneNode(true);
        clone.setAttribute('data-id', '');
        const bullet = document.getElementById('trigItemBoxes');
        bullet.append(clone);

        const actionGroup = clone.querySelector('.bulletActionGroup');
        const editGroup   = clone.querySelector('.bulletEditGroup');
        actionGroup.classList.remove('show');
        editGroup.classList.add('show');

        const textElm  = clone.querySelector('.bulletText');
        const inputElm = <HTMLElement>clone.querySelector('.paramTextInput');
        textElm.classList.remove('show');
        inputElm.classList.add('show');
        self.focusEnd(inputElm);
    }

    private update(trigger) {
        const self = this;
        const actionGroup = self.getActionGroup(trigger);
        const editGroup   = self.getEditGroup(trigger);
        actionGroup.classList.add('show');
        editGroup.classList.remove('show');

        const textElm  = self.getTextElement(trigger);
        const inputElm = self.getInputElement(trigger);
        textElm.classList.add('show');
        inputElm.classList.remove('show');

        const box = self.getBoxElement(trigger);
        const textId = box.getAttribute('data-id');
        const newText = inputElm.value;

        // 非同期通信
        self.asyncUpdate(textId, newText, trigger);
    }

    private asyncUpdate(textId, newText, trigger){
        // 送信データの準備
        const fd: FormData = new FormData();
        fd.append('text_id',  textId);
        fd.append('new_text', newText);

        // サーバへ送信
        const url = '/async/update';
        const param = {
            method: 'POST',
            body: fd,
        }
        this.sendServer(url, param, trigger);
    }

    private cancel(trigger) {
        const self = this;
        const actionGroup = self.getActionGroup(trigger);
        const editGroup   = self.getEditGroup(trigger);
        actionGroup.classList.add('show');
        editGroup.classList.remove('show');

        const textElm  = self.getTextElement(trigger);
        const inputElm = self.getInputElement(trigger);
        textElm.classList.add('show');
        inputElm.classList.remove('show');

        const box = self.getBoxElement(trigger);
        const textId = box.getAttribute('data-id');
        inputElm.value = self.texts[textId];
    }

    private delete(trigger) {
        const self = this;
        const box = self.getBoxElement(trigger);
        const textId = box.getAttribute('data-id');
        if(!textId){
            box.remove();
            return;
        }

        // 非同期通信
        self.asyncDelete(textId, trigger);
    }

    private asyncDelete(textId, trigger){
        // 送信データの準備
        const fd: FormData = new FormData();
        fd.append('text_id',  textId);

        // サーバへ送信
        const url = '/async/delete';
        const param = {
            method: 'POST',
            body: fd,
        }
        this.sendServer(url, param, trigger);
    }

    // サーバへ送信
    private sendServer(url, param, trigger){
        const self = this;
        const meta: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
        const token = meta.content;
        let box;
        param.headers = {
            'X-CSRF-TOKEN': token,
        };

        // Func.showAjaxing('Uploading');
        fetch(url, param)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if(json.status){
                    switch(json.callback){
                        case 'updated':
                            const textElm  = self.getTextElement(trigger);
                            textElm.innerText = json.newText;
                            self.texts[json.textId] = json.newText;
                            box = self.getBoxElement(trigger);
                            if(box.getAttribute('data-id').length === 0){
                                box.setAttribute('data-id', json.textId);
                            }
                            break;

                        case 'deleted':
                            box = self.getBoxElement(trigger);
                            box.remove();
                            break;
                    }
                }
                else{
                    alert("送信に『失敗』しました1");
                    console.log(`[error1] ${json.result}`);
                }
                // Func.hideAjaxing('Uploading');
            })
            .catch((error) => {
                alert("送信に『失敗』しました2");
                console.log(`[error2] ${error}`);
            });
    }


    public getBoxElement(trigger: HTMLElement){
        return <HTMLElement>trigger.parentNode.parentNode.parentNode;
    }

    private getActionGroup(trigger: HTMLElement){
        return <HTMLElement>trigger.parentNode.parentNode.querySelector('.bulletActionGroup');
    }

    private getEditGroup(trigger: HTMLElement){
        return <HTMLElement>trigger.parentNode.parentNode.querySelector('.bulletEditGroup');
    }

    private getTextElement(trigger: HTMLElement){
        return <HTMLElement>trigger.parentNode.parentNode.querySelector('.bulletText');
    }

    private getInputElement(trigger: HTMLElement){
        return <HTMLInputElement>trigger.parentNode.parentNode.querySelector('.paramTextInput');
    }

    private focusEnd(inputElm){
        const value = inputElm.value;
        const len = value.length;
        inputElm.focus();
        inputElm.setSelectionRange(len, len);
    }

    private getSearchWords(inputText){
        let ary = [];
        if(inputText.indexOf(' ') === -1){
            ary = [inputText];
        }else{
            ary = inputText.split(' ');
            ary.forEach( (v, k) => {
                if(v == ''){
                    ary.splice(k, 1);
                }else if(v.match('^\s+$')){
                    ary.splice(k, 1);
                }
            });
        }

        return ary;
    }

}

export default CopyNPaste;