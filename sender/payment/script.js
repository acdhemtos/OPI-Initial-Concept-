function die(msg){
	alert(msg);
	window.location.href = "../";
}

if(!hashExist()){
	die("First Load Hashes.");
}

amt = parseFloat(prompt("Enter Amount : "));

if(isNaN(amt) || amt<0 || Math.floor(amt*100)/100 != amt){
	die("Invalid Amount.");
}

amt = parseInt(amt*100)

UID = "user"

function suicide(msg){
	failure();
	setInterval(function(){
		die(msg);
	},5000);
	speak("-1");
	sleep(6000);
}

let msg = listen("");
alert(msg);
let response = msg.split(" ");
MID = response[0]

if(response.length!=2 || !verifyID(MID) || parseInt(response[1])!=amt){
	suicide("Invalid QR");
}

if(!sessionStorage.merchants){
	sessionStorage.merchants = JSON.stringify({});
}

let merchants = JSON.parse(sessionStorage.merchants);
if(!merchants[MID]){
	merchants[MID] = -1;
	sessionStorage.merchants = JSON.stringify(merchants);
}

merchants = JSON.parse(sessionStorage.merchants);

code = merchants[MID]+1;

merchants[MID] = code;
sessionStorage.merchants = JSON.stringify(merchants);

speak(UID+" "+code);

//TRANSACTION FAILED?
//SERVER ACCEPTED?

//RECIEVING COUNTDOWN

//SEND -1
//SEND 0
