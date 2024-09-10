function getQR(){
    const canvas = qrcanvas.qrcanvas({
        data: document.querySelectorAll('input')[0].value
    });
    console.log(canvas);
    document.querySelector('body').appendChild(canvas);
}