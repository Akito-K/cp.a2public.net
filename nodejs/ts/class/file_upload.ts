'use strict';
import Func from './_func';

export class FileUpload {
    constructor(
        public allowExtensions = {
            image: ['jpg', 'png', 'gif', 'jpeg'],
            file : ['jpg', 'png', 'gif', 'jpeg', 'pdf'],
        },
        public allowFileSizes  = {
            jpg: 5 * 1000 * 1000,
            png: 5 * 1000 * 1000,
            gif: 5 * 1000 * 1000,
            pdf: 5 * 1000 * 1000,
        },
    ) {
        if( !document.querySelector('.trigFileButton') ){
            return;
        }

        const self = this;

        const trigFileUploads = document.querySelectorAll('.trigFileButton');
        trigFileUploads.forEach( (trigFileUpload, k) => {
            const name = trigFileUpload.getAttribute('data-name');
            const max  = Number(trigFileUpload.getAttribute('data-max'));
            const type = trigFileUpload.getAttribute('data-type');
            trigFileUpload.addEventListener('change', (e) => {
                let error = self.validate(e, type, max);
                if(error){
                    alert(error);
                    return false;
                }
                self.uploadFile(e, name, max);
            });
        });

        const trigDeleteFiles = document.querySelectorAll('.trigDeleteFile');
        trigDeleteFiles.forEach( (trigDeleteFile, k) => {
            trigDeleteFile.addEventListener('click', () => {
                const name = trigDeleteFile.getAttribute('data-name');
                const number = Number(trigDeleteFile.getAttribute('data-number'));
                FileUpload.removeImage(name, number);
                FileUpload.lineUpImages(name);
            });
        });
    }

    // バリデーション
    public validate(evt, type, max: number) {
        let error = '';
        const files = evt.target.files;
        if (files.length == 0) {
            error = 'ファイルがありません';
            return error;
        }
        // 拡張子
        const myAllowExtensions = this.allowExtensions[type];

        // 枠数を超えるファイル数の場合、超えたファイルは無視
        for(let i = 0; i < files.length; i++){
            if(i >= max){
                continue;
            }

            const ext = Func.getExtention(files[i].name);
            if( !myAllowExtensions.includes(ext) ){
                error = 'ここでは' + ext + 'は使えません';
                return error;
            }

            const size = files[i].size;
            // ファイルサイズ
            if(size >= this.allowFileSizes[ext]){
                error = 'ファイルサイズが大きすぎます[' + (Math.ceil(size / 1000 / 100) / 10) + 'MB]';
                return error;
            }
        }

        return error;
    }

    // ファイルをアップ
    public uploadFile(evt, name, max: number){
        const files = evt.target.files;
        // 送信データの準備
        const fd: FormData = new FormData();
        fd.append('name', name);
        fd.append('max',  max.toString());

        // 枠数を超えるファイル数の場合、超えたファイルは無視
        for(let i = 0; i < files.length; i++){
            if(i >= max){
                continue;
            }
            fd.append('files[]', files[i]);
            fd.append('file_names[]', files[i].name);
        }

        // サーバへ送信
        const url = '/async/upload/file';
        const param = {
            method: 'POST',
            body: fd,
        }
        this.sendServer(url, param);
    }

    // サーバへ送信
    private sendServer(url, param){
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
                    //json.pathsにはファイルパスの配列が入っている
                    FileUpload.viewUploadedImage(json);
                }
                else{
                    alert("送信に『失敗』しました1");
                    console.log(`[error1] ${json.result}`);
                    console.log(param.body.length);
                }
                Func.hideAjaxing('Uploading');
            })
            .catch((error) => {
                alert("送信に『失敗』しました2");
                console.log(`[error2] ${error}`);
            });
    }

    // アップされたファイルを表示
    private static viewUploadedImage(jsonResults) {
        const length = jsonResults.file_paths.length;
        const name   = jsonResults.name;
        const max    = Number(jsonResults.max);
        // 空き枠数
        const nullLength = FileUpload.getNoImageLength(name);
        if(length === max){
            // その数だけ入れるだけ
            for(let i = 0; i < length; i++){
                FileUpload.setView(name, i, jsonResults.file_paths[i], jsonResults.file_names[i]);
            }
        }else{
            // 後ろの空き枠範囲で画像数を入れる
            const start = max - nullLength;
            let waku;
            for(let i = 0; i < length; i++){
                waku = start + i;
                if(waku >= max){
                    waku = 0 + length - 1;
                }
                FileUpload.setView(name, waku, jsonResults.file_paths[i], jsonResults.file_names[i]);
            }
        }
    }

    // 未登録の枠数を取得
    private static getNoImageLength(name){
        const elms = document.querySelectorAll('.paramImgFilePath[data-name=' + name + ']');
        let nulls = 0;
        elms.forEach(function(v, i){
            const val = v.getAttribute('value');
            if(!val){
                nulls ++;
            }
        });

        return nulls;
    }

    private static setView(name, number, realFilePath, fileName){
        // PDFの場合、固定画像に変更
        const imgFilePath = FileUpload.getStaticImagePath(realFilePath);

        const viewElement: HTMLElement = document.querySelector('.bulletFileView[data-name="' + name + '"][data-number="' + number + '"]');
        // 既存の画像や背景を除去
        if(viewElement.children[1]){
            viewElement.children[1].remove();
        }
        viewElement.children[0].remove();
        // 背景画像
        let span = document.createElement('span');
        span.setAttribute('style', 'background-image: url(' + imgFilePath + ');')
        viewElement.appendChild( span );
        // ファイル名表示欄
        let em = document.createElement('em');
        em.appendChild( document.createTextNode(fileName) );
        viewElement.appendChild( em );

        // インプットに値を挿入
        const imgPathElement: HTMLInputElement = document.querySelector('.paramImgFilePath[data-name="' + name + '"][data-number="' + number + '"]');
        imgPathElement.setAttribute('value', imgFilePath);
        const realPathElement: HTMLInputElement = document.querySelector('.paramRealFilePath[data-name="' + name + '"][data-number="' + number + '"]');
        realPathElement.setAttribute('value', realFilePath);
        const nameElement: HTMLInputElement = document.querySelector('.paramOriginalFileName[data-name="' + name + '"][data-number="' + number + '"]');
        nameElement.setAttribute('value', fileName);
    }

    // 既存の画像を除去
    private static removeImage(name, number){
        const viewElement: HTMLElement = document.querySelector('.bulletFileView[data-name="' + name + '"][data-number="' + number + '"]');
        // 既存の画像や背景を除去
        if(viewElement.children[1]){
            viewElement.children[1].remove();
        }
        viewElement.children[0].remove();
        // 「未登録」画像
        const i = document.createElement('i');
        viewElement.appendChild( i );
        // インプットの値を除去
        const imgPathElement: HTMLInputElement = document.querySelector('.paramImgFilePath[data-name="' + name + '"][data-number="' + number + '"]');
        imgPathElement.setAttribute('value', '');
        const realPathElement: HTMLInputElement = document.querySelector('.paramRealFilePath[data-name="' + name + '"][data-number="' + number + '"]');
        realPathElement.setAttribute('value', '');
        const nameElement: HTMLInputElement = document.querySelector('.paramOriginalFileName[data-name="' + name + '"][data-number="' + number + '"]');
        nameElement.setAttribute('value', '');
    }

    // 並べ直し
    private static lineUpImages(name){
        const imgPathElements = document.querySelectorAll('.paramImgFilePath[data-name=' + name + ']');
        const realPathElements = document.querySelectorAll('.paramRealFilePath[data-name=' + name + ']');
        const nameElements = document.querySelectorAll('.paramOriginalFileName[data-name=' + name + ']');
        let realFilePaths = [], imgFilePaths = [], fileNames = [];
        imgPathElements.forEach(function(v, i){
            const imgFilePath = v.getAttribute('value');
            const realFilePath = realPathElements[i].getAttribute('value');
            const fileName = nameElements[i].getAttribute('value');
            if(imgFilePath){
                imgFilePaths.push(imgFilePath);
                realFilePaths.push(realFilePath);
                fileNames.push(fileName);
            }
        });

        const bulletFileViews = document.querySelectorAll('.bulletFileView[data-name="' + name + '"]');
        bulletFileViews.forEach( (bulletFileView, k) => {
            if(imgFilePaths[k]){
                FileUpload.setView(name, k, imgFilePaths[k], fileNames[k]);
            }else{
                FileUpload.removeImage(name, k);
            }
        });
    }

    // PDF, Excel, Word ファイルアイコン画像
    private static getStaticImagePath(filePath){
        const ext = Func.getExtention(filePath);
        switch(ext){
            case 'pdf':
                filePath = '/shared/images/_raw/common/icon_pdf.png';
                break;
            // case 'xls':
            // case 'xlsx':
            // case 'xlsm':
            //     filePath = '/shared/images/_raw/common/icon_excel.png';
            //     break;
            // case 'doc':
            // case 'docx':
            //     filePath = '/shared/images/_raw/common/icon_excel.png';
            //     break;
        }

        return filePath;
    }
}

export default FileUpload;