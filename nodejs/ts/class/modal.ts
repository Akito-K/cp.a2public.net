'use strict';
import Func from './_func';

interface Env {
    readonly target: string;
    readonly action: string;
}
export class Modal {
    public static currentTarget = '';
    constructor(){
        if( !document.querySelector('.trigEdit') ){
            return;
        }

        const self = this;
        /*
        // キーボード操作
        $(window).keydown( (e) => {
            // Esc
            if(e.keyCode == 27){
                // console.log(Modal.currentTarget);
                $('.bulletModalArea[data-target="' + Modal.currentTarget + '"]').attr('data-open', 0).hide();
                if(Modal.currentTarget.indexOf('delete') > -1) {
                    Modal.currentTarget = Modal.currentTarget.replace('delete-', '');
                }else if(Modal.currentTarget.indexOf('cannot') > -1){
                    Modal.currentTarget = Modal.currentTarget.replace('cannot-', '');
                }else if(Modal.currentTarget === 'code-search'){
                    Modal.currentTarget = 'reservation';
                }
                e.preventDefault();
            }
            // Enter
            if(e.keyCode == 13){
                e.preventDefault();
            }
        });
*/
        // モーダルを開く
        const trigEdits = document.querySelectorAll('.trigEdit');
        trigEdits.forEach( (trigEdit, k) => {
            trigEdit.addEventListener('click', function(e){
                e.preventDefault();
                const env: Env = {
                    target: trigEdit.getAttribute('data-target'),
                    action: trigEdit.getAttribute('data-action'),
                };
                Modal.currentTarget = env.target;
                const area = document.querySelector('.bulletModalArea[data-target="' + env.target + '"]');
                area.setAttribute('data-open', '1');
                area.classList.add('show');
                Func.setAttributes('.bulletModelDelete', 'data-action', env.action);

                switch(true){
                    case self.match(env, 'password-reset', 'edit'):
                        return self.openPasswordResetEdit( trigEdit, env );
                    case self.match(env, 'daily-laundry', 'edit'):
                        return self.openDailyEdit( trigEdit, env, 'laundry' );
                    case self.match(env, 'daily-smell', 'edit'):
                        return self.openDailyEdit( trigEdit, env, 'smell' );
                    case self.match(env, 'daily-noise', 'edit'):
                        return self.openDailyEdit( trigEdit, env, 'noise' );
                    case self.match(env, 'daily-laundry', 'edit-group'):
                        return self.openDailyGroupEdit( trigEdit, env, 'laundry' );
                    case self.match(env, 'daily-smell', 'edit-group'):
                        return self.openDailyGroupEdit( trigEdit, env, 'smell' );
                    case self.match(env, 'daily-noise', 'edit-group'):
                        return self.openDailyGroupEdit( trigEdit, env, 'noise' );
                    case self.match(env, 'icon-duplicate', 'edit'):
                        return self.openIconDuplicate( trigEdit, env );

                    default:
                        return;

                    // case self.match(env, 'plans', 'view'):
                    //     return self.openPlansView( trigEdit, env );
                    // case self.match(env, 'cars', 'view'):
                    //     return self.openCarsView( trigEdit, env );
                }
            });
        });

        // モーダルを閉じる
        const trigCloses = document.querySelectorAll('.trigCloseModalArea');
        trigCloses.forEach( (trigClose, k) => {
            trigClose.addEventListener('click', function(e) {
                const target = trigClose.getAttribute('data-target');
                // console.log(target)
                Func.setAttributes('.bulletModalArea[data-target="' + target + '"]', 'data-open', '0');
                Func.removeClass('.bulletModalArea[data-target="' + target + '"]', 'show');
            });
        });
    }

    private match(e, target, action){
        return e.target === target && e.action === action;
    }


    private openPasswordResetEdit(trigEdit, env: Env): void {
        const id    = trigEdit.getAttribute('data-id');
        const email = trigEdit.getAttribute('data-email');
        document.querySelector('.paramEditUserId').setAttribute('value', id);
        document.querySelector('.paramEditUserEmail').setAttribute('value', email);
    }

    private openDailyEdit(trigEdit, env: Env, category): void {
        const day     = trigEdit.getAttribute('data-day');
        const roomId  = trigEdit.getAttribute('data-room');
        const groupId = trigEdit.getAttribute('data-group');
        const iconId  = trigEdit.getAttribute('data-icon');

        let elm: HTMLInputElement;
        elm = <HTMLInputElement>document.querySelector('.paramDailyDay[data-category="' + category + '"]');
        elm.value = day;
        elm = <HTMLInputElement>document.querySelector('.paramDailyGroupId[data-category="' + category + '"]');
        elm.value = groupId;
        elm = <HTMLInputElement>document.querySelector('.paramDailyRoomId[data-category="' + category + '"]');
        elm.value = roomId;
        elm = <HTMLInputElement>document.querySelector('.paramDailyEditMode[data-category="' + category + '"]');
        elm.value = 'room';

        // 選択状態を消去
        let checkedRadio = <HTMLInputElement>document.querySelector('.paramDailyIconId[data-category="' + category + '"]:checked');
        if(checkedRadio){
            checkedRadio.checked = false;
        }

        // 選択あれば設定
        let elms = document.querySelectorAll('.paramDailyIconId[data-category="' + category + '"]');
        elms.forEach( (v: HTMLInputElement, i) => {
            if(v.value == iconId){
                v.checked = true;
            }
        });
    }

    private openDailyGroupEdit(trigEdit, env: Env, category): void {
        const day     = trigEdit.getAttribute('data-day');
        const groupId = trigEdit.getAttribute('data-group');
        const iconId  = trigEdit.getAttribute('data-icon');

        let elm: HTMLInputElement;
        elm = <HTMLInputElement>document.querySelector('.paramDailyDay[data-category="' + category + '"]');
        elm.value = day;
        elm = <HTMLInputElement>document.querySelector('.paramDailyGroupId[data-category="' + category + '"]');
        elm.value = groupId;
        elm = <HTMLInputElement>document.querySelector('.paramDailyRoomId[data-category="' + category + '"]');
        elm.value = '';
        elm = <HTMLInputElement>document.querySelector('.paramDailyEditMode[data-category="' + category + '"]');
        elm.value = 'group';

        // 選択状態を消去
        let checkedRadio = <HTMLInputElement>document.querySelector('.paramDailyIconId[data-category="' + category + '"]:checked');
        if(checkedRadio){
            checkedRadio.checked = false;
        }

        // 選択あれば設定
        let elms = document.querySelectorAll('.paramDailyIconId[data-category="' + category + '"]');
        elms.forEach( (v: HTMLInputElement, i) => {
            if(v.value == iconId){
                v.checked = true;
            }
        });
    }

    private openIconDuplicate(trigEdit, env: Env): void {
        const category = trigEdit.getAttribute('data-category');
        const elm = <HTMLSelectElement>document.getElementById('paramCategory');
        elm.value = category;
    }

}
export default Modal;