'use strict';
import Func from './_func';
import Dom  from './_dom';

export class Copy {

    constructor(
        private texts = {}
    ) {

        if( !document.querySelector('.trigCopy') ){
            return;
        }

        const self = this;
        let text, textId, tagId, triggers;

        // copy
        triggers = document.querySelectorAll('.trigCopy');
        triggers.forEach( (trigger: HTMLElement) => {
            trigger.addEventListener('click', function(){
                const textElm = self.getTextElement(this);
                Func.copyToClipboard(textElm.innerText);
                this.classList.add('btn-action-copied');
                setTimeout( () => {
                    this.classList.remove('btn-action-copied');
                }, 2000)
            });
        });

        // edit
        triggers = document.querySelectorAll('.trigEdit');
        triggers.forEach( (trigger: HTMLElement) => {
            trigger.addEventListener('click', function(){
                const actionGroup = self.getActionGroup(this);
                const editGroup   = self.getEditGroup(this);
                actionGroup.classList.remove('show');
                editGroup.classList.add('show');

                const textElm  = self.getTextElement(this);
                const inputElm = self.getInputElement(this);
                textElm.classList.remove('show');
                inputElm.classList.add('show');

                const box = self.getBoxElement(this);
                textId = box.getAttribute('data-id');
                text = textElm.innerText
                self.texts[textId] = text;
            });
        });

        // update
        triggers = document.querySelectorAll('.trigUpdate');
        triggers.forEach( (trigger: HTMLElement) => {
            trigger.addEventListener('click', function(){
                const actionGroup = self.getActionGroup(this);
                const editGroup   = self.getEditGroup(this);
                actionGroup.classList.add('show');
                editGroup.classList.remove('show');

                const textElm  = self.getTextElement(this);
                const inputElm = self.getInputElement(this);
                textElm.classList.add('show');
                inputElm.classList.remove('show');

                const box = self.getBoxElement(this);
                textId = box.getAttribute('data-id');
                const newText = inputElm.value;

                // 非同期通信
                self.asyncUpdate(textId, newText, this);
            });
        });

        // cancel
        triggers = document.querySelectorAll('.trigCancel');
        triggers.forEach( (trigger: HTMLElement) => {
            trigger.addEventListener('click', function(){
                const actionGroup = self.getActionGroup(this);
                const editGroup   = self.getEditGroup(this);
                actionGroup.classList.add('show');
                editGroup.classList.remove('show');

                const textElm  = self.getTextElement(this);
                const inputElm = self.getInputElement(this);
                textElm.classList.add('show');
                inputElm.classList.remove('show');

                const box = self.getBoxElement(this);
                textId = box.getAttribute('data-id');
                inputElm.value = self.texts[textId];
            });
        });

        // update
        triggers = document.querySelectorAll('.trigDelete');
        triggers.forEach( (trigger: HTMLElement) => {
            trigger.addEventListener('click', function(){
                const box = self.getBoxElement(this);
                textId = box.getAttribute('data-id');

                // 非同期通信
                self.asyncDelete(textId, this);
            });
        });
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
        param.headers = {
            'X-CSRF-TOKEN': token,
        };

        Func.showAjaxing('Uploading');
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
                            break;

                        case 'deleted':
                            const box = self.getBoxElement(trigger);
                            box.remove();
                            break;
                    }
                }
                else{
                    alert("送信に『失敗』しました1");
                    console.log(`[error1] ${json.result}`);
                }
                Func.hideAjaxing('Uploading');
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

}

export default Copy;