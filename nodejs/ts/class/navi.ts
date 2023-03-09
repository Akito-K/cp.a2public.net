'use strict';

export class Navi {
    constructor() {

        if( !document.getElementById("trigOpenNavi") ){
            return;
        }

        const trigOpen = document.getElementById("trigOpenNavi");
        trigOpen.addEventListener("click", () => {
            const bulletOpen = document.getElementById("bulletOpenNavi");
            bulletOpen.classList.add("open");
            bulletOpen.setAttribute('data-open', '1');
            const bulletNavi = document.getElementById("bulletNavi");
            bulletNavi.classList.add("open");
        });

        const trigClose = document.getElementById("trigCloseNavi");
        trigClose.addEventListener("click", () => {
            const bulletOpen = document.getElementById("bulletOpenNavi");
            bulletOpen.classList.remove("open");
            bulletOpen.setAttribute('data-open', '');
            const bulletNavi = document.getElementById("bulletNavi");
            bulletNavi.classList.remove("open");
        });


    }
}

export default Navi;