N = 1000

function reload(){
	window.location.reload();
}

function hashExist(){
	return (sessionStorage.hashes);
}

function isActive(){
	return true;
}

async function hashMessage(arr) {
	const message = arr[1]
	const encoder = new TextEncoder();
	const data = encoder.encode(message);

	const hashBuffer = await crypto.subtle.digest('SHA-256', data);

	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

	return [arr[0],hashHex];
}