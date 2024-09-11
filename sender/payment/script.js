function die(msg){
	alert(msg);
	window.location.href = "../";
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
if(!hashExist()){
	die("First Load Hashes.");
}

amt = 100//parseFloat(prompt("Enter Amount : "));

if(isNaN(amt) || amt<0 || Math.floor(amt*100)/100 != amt){
	die("Invalid Amount.");
}

amt = parseInt(amt*100)

UID = "user"
document.querySelector("#listen").value = "";
document.querySelector("#speak").value = "";

msg = ""

function finale(){
	interval = setInterval(function(){
		if(msg!=listen()){
			msg = listen();
			if(msg=="0"){
				success();
			}else if(msg=="-1"){
				suicide("Server Error");
			}else{
				suicide("Unknown Error");
			}
		}
	},1000);
}

interval = setInterval(function(){
	if(listen()!=msg){
		clearInterval(interval);
		msg = listen("");
		let response = msg.split(" ");
		MID = response[0]

		if(response.length!=2 || !verifyID(MID) || parseInt(response[1])!=amt){
			suicide("Invalid QR");
		}

		if(!localStorage.merchants){
			localStorage.merchants = JSON.stringify({});
		}

		let merchants = JSON.parse(localStorage.merchants);
		if(!(MID in merchants)){
			merchants[MID] = -1;
			localStorage.merchants = JSON.stringify(merchants);
		}

		merchants = JSON.parse(localStorage.merchants);

		code = merchants[MID]+1;

		merchants[MID] = code;
		localStorage.merchants = JSON.stringify(merchants);
		speak(UID+" "+code);
		interval = setInterval(function(){
			if(listen()!=msg){
				msg = listen();
				if(msg=="-1"){
					suicide("Merchant Error.");
				}
				clearInterval(interval);
				hashes = JSON.parse(localStorage.hashes);
				cashes = []
	   k = 100;
				function update(arr){
					cashes[arr[0]] = arr[1];
					k--;
				}
				i=0;
				for(i=0;i<k;++i){
					cashes[i] = i;
					hashMessage([i,code+MID+hashes[i]+amt]).then(update);
				}
	   interval = setInterval(function(){
					if(k==0){
						clearInterval(interval);
						i = cashes.indexOf(msg);
						if(i==-1){
							suicide("Untrustworthy Node.");
						}else{
							function ola(arr){
								speak(arr[1]);
								finale();
							}
							hashMessage([0,MID+hashes[i]+amt+code]).then(ola);
		
							
						}
					}
				},1000);
				
					
				}
				//found reply wait
			},1000);
	}
},1000);

//TRANSACTION FAILED?
//SERVER ACCEPTED?

//RECIEVING COUNTDOWN

//SEND -1
//SEND 0

};