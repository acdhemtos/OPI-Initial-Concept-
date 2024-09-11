function payment(){
	if(!hashExist()){
		alert("First Load Hashes.");
		return false;
	}
	window.location.href = "./payment/";
}

function loadHash(){
	if(!isActive()){
		alert("Cannot Reload Hashes due to connection issues.");
		return false;
	}
	k = N;
	
	let hashes = []
	
	function update(arr){
		hashes[arr[0]] = arr[1];
		k--;
	}
	
	for(let i=0;i<k;++i){
		hashes[i] = i;
		hashMessage([i,Math.random().toString()]).then(update);
	}
	
	const interval = setInterval(function(){
		if(k==0){
			const xhr = new XMLHttpRequest();
			xhr.open('POST', "../api/updateHashes.php?"+gibrish(), true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onreadystatechange = function () {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						let res = xhr.responseText;
						//alert(res);
						let code = parseInt(res[0]);
						if(code==9){
							alert("Hashes Updated Successfully.");
							localStorage.hashes = JSON.stringify(hashes);
							localStorage.removeItem('merchants');
						}else if(code==0){
							alert("Couldn't Update Hashes.");
						}else{
							alert("Something went Fatally Wrong.");
							if(hashExist()){
								localStorage.removeItem('hashes');
								localStorage.removeItem('merchants');
							}
						}
					} else {
						alert("Couldn't Reload Hashes due to connection issues.");
					}
				}
			};
			xhr.send(JSON.stringify(hashes));
			clearInterval(interval);
		}
	},1000);
}
