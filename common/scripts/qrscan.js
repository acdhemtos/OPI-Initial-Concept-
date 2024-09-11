

let list = []

let scanner = ""

let interval = null

//https://stackoverflow.com/a/1053865
function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}


//https://jsfiddle.net/daniilkovalev/341u3qxz/
navigator.mediaDevices.enumerateDevices().then((devices) => {
	device = devices.filter((device) => device.kind === "videoinput")
	let i=0;
	for(i=0;;++i){
		if(i==device.length){
			die("NO SUITABLE DEVICE.");
			break;
		}
		label = device[i].label;
		if(label.length>5 && label.substr(label.length-5)=="front"){
			break;
		}
	}
	
	let id = device[i].deviceId;
	let constrains = {video: {optional: [{sourceId: id }]}};

  navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
    let capturer = new ImageCapture(stream.getVideoTracks()[0]);
  	setInterval(function(){
		step(capturer);
	},1);
	
  });
});

function step(capturer) {
    capturer.grabFrame().then((bitmap) => {
      var barcodeDetector = new BarcodeDetector();
      barcodeDetector.detect(bitmap)
        .then(barcodes => {
			codes = barcodes.map(barcode => barcode.rawValue);
			if(codes.length==0){
				codes = "";
			}else{
				codes = codes[0];
			}
			list[list.length] = codes;
			
			if(list.length>500){
				list.splice(1);
			}
			scanner = mode(list);
			if(scanner==""){
				document.querySelector('body').classList.add('yellow');
			}else{
				document.querySelector('body').classList.remove('yellow');
			}
          
        })
        .catch((e) => {
			die("Unexpected Error Occured.");
        });
    });
}
