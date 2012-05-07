// Query the device pixel ratio.
//-------------------------------
function getDevicePixelRatio() {
	if(window.devicePixelRatio === undefined) return 1; // No pixel ratio available. Assume 1:1.
	return window.devicePixelRatio;

}

// Process all document images
//-----------------------------
function processImages() {
	if(getDevicePixelRatio() > 1) {
		var images = $('img');

		// Scale each image's width to 50%. Height will follow.
		for(var i = 0; i < images.length; i++) {
			images.eq(i).width(images.eq(i).width() / 2);

		}

	}

}