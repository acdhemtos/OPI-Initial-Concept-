function loadHash(){
	if(!isActive()){
		alert("Cannot Reload Hashes due to connection issues.");
		return false;
	}
	k = N;
	
	hashes = []
	
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
			//send Server Hashes
			//if successful alert Updated
			//also save on local storage
			//else alert('Couldn't Reload Hashes due to connection issues.');
			clearInterval(interval);
		}
	},1000);
}

if(!hashExist()){
	loadHash();
}