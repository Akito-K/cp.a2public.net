'use strict';
export class Dom {
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

}
export default Dom;
