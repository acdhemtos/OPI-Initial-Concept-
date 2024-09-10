<html>
    <body>
		<canvas id="canvas" height="240" width="320"></canvas>
		<div id="barcodes"></div>
		<span></span>
		<script>
		//https://jsfiddle.net/daniilkovalev/341u3qxz/
			navigator.mediaDevices.enumerateDevices().then((devices) => {
	device = devices.filter((device) => device.kind === "videoinput")
	let i=0;
	for(i=0;;++i){
		if(i==device.length){
			alert("NOT SUITABLE DEVICE.");
			break;
		}
		label = device[i].label;
		if(label.length>5 && label.substr(label.length-5)=="front"){
			break;
		}
	}
	
	let id = device[3].deviceId;
  let constrains = {video: {optional: [{sourceId: id }]}};

  navigator.mediaDevices.getUserMedia(constrains).then((stream) => {
    let capturer = new ImageCapture(stream.getVideoTracks()[0]);
  	step(capturer);
  });
});

function step(capturer) {
    capturer.grabFrame().then((bitmap) => {
      /*let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, canvas.width, canvas.height);*/
      var barcodeDetector = new BarcodeDetector();
      barcodeDetector.detect(bitmap)
        .then(barcodes => {
          document.getElementById("barcodes").innerHTML += barcodes.map(barcode => barcode.rawValue).join(', ') + "<br />";
          step(capturer);
        })
        .catch((e) => {
          console.error(e);
          document.getElementById("barcodes").innerHTML = 'None';
        });
    });
}

		</script>
	</body>
</html>