function die(msg){
	alert(msg);
	reload();
}

amt = parseFloat(prompt("Enter Amount to Recieve: "));

if(isNaN(amt) || amt<0 || Math.floor(amt*100)/100 != amt){
	die("Invalid Amount.");
}

amt = parseInt(amt*100)

MID = "merchant"

speak(MID+" "+amt);

let msg = listen("");
let response = msg.split(" ");
UID = response[0]
let code = response[1]

if(response.length!=2 || !verifyID(UID) || parseInt(code).toString()!=code){
	suicide("Invalid QR");
}

//SEND REQUEST TO SERVER


// TRANSACTION FAILED

// SERVER SENT CODES

//SENDING COUNTDOWN

//SEND -1




