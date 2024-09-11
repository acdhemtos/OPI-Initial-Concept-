function die(msg){
	alert(msg);
	reload();
}

function suicide(msg){
	failure();
	setTimeout(function(){
		die(msg);
	},5000);
	speak("-1");
	sleep(6000);
}


window.onload = function(){
amt = 100//parseFloat(prompt("Enter Amount to Recieve: "));

if(isNaN(amt) || amt<0 || Math.floor(amt*100)/100 != amt){
	die("Invalid Amount.");
}

amt = parseInt(amt*100)

MID = "merchant"

document.querySelector("#listen").value = "";
	document.querySelector("#speak").value = "";

speak(MID+" "+amt);

function handshake(id,arr){
	speak(arr);
}

msg = listen()
interval = setInterval(function(){	
	if(msg!=listen()){
		msg = listen();
		clearInterval(interval);
		
		let response = msg.split(" ");
		UID = response[0]
		let code = response[1]

		if(response.length!=2 || !verifyID(UID) || parseInt(code).toString()!=code){
			suicide("Invalid QR");
		}
		data = {
			mid : MID,
			uid : UID,
			amt : amt,
			code : code
		};
		xhr = new XMLHttpRequest();
		
		xhr.open('POST', "../api/handshake.php", true);
		
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onload = function() {
			if (xhr.status >= 200 && xhr.status < 300) {
				txt = xhr.responseText;
				//console.log(xhr.responseText);
				if(txt==-1){
					suicide("Request Failed");
				}
				noOfHashes = Math.max((Math.floor(Math.log10(amt/100))+1,1));
				try {
					json = JSON.parse(xhr.responseText);
					id = json["id"];
					hash = json["hash"];
					handshake(id,hash);
				}
				catch(err) {
					suicide("Request Failed");
					console.log(err.message);
				}
				
			} else {
				suicide("Request Failed");
			}
		};

		// Define what happens in case of an error
		xhr.onerror = function() {
		  suicide("Request Failed");
		};

		// Send the request with data
		xhr.send(JSON.stringify(data));
	}
}, 1000);


};