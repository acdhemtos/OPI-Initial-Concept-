function verifyID(str) {
  return /^[a-z]+$/.test(str);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function stall(prev){
	while(document.querySelector("#listen").value==prev){
		sleep(1000);
	}
}

function listen(prev){
	return stall(prev);
	//return scanner;
	//return document.querySelector("#listen").value;
}

function speak(msg){
	/*const canvas = qrcanvas.qrcanvas({
		data: msg
	});
	document.querySelector("#holder").removeChild(document.querySelector('canvas'));
	document.querySelector('#holder').appendChild(canvas);*/
	document.querySelector("#speak").value = msg;
}

function failure(){
	document.querySelector("body").classList.add('red');
	speak("-1");
}
	
function success(){
	document.querySelector("body").classList.add('green');
}