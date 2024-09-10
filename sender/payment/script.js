function die(msg){
	alert(msg);
	window.location.href = "../";
}

/*if(!hashExist()){
	die("First Load Hashes.");
}*/

amt = parseFloat(prompt("Enter Amount : "))

if(isNaN(amt) || amt<0 || Math.floor(amt*100)/100 != amt)){
	die("Invalid Amount.");
}

