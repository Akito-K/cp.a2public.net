'use strict';

export class PasswordForm {
    constructor() {
        if( !document.getElementById('trigShowPassword') ){
            return;
        }

        const trigShow = document.getElementById('trigShowPassword');
        const trigHide = document.getElementById('trigHidePassword');
        const bulletPassword = document.getElementById('bulletShowPassword');
        trigShow.addEventListener('click', () => {
            trigShow.classList.remove('show');
            trigHide.classList.add('show');
            bulletPassword.setAttribute('type', 'text');
        });

        trigHide.addEventListener("click", () => {
            trigShow.classList.add('show');
            trigHide.classList.remove('show');
            bulletPassword.setAttribute('type', 'password');
        });
    }
}

export default PasswordForm;