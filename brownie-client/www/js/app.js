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

// Hammer JS Events
// disable the dragging of images on desktop browsers
    $("#br-images img").bind("dragstart", function() { 
        return false;
    });


    /**
    * super simple slideshow
    * animation between slides happens with css transitions
    */
    function Slideshow(container, overview) {
        container = $(container);
        overview = $(overview);

        var slides = $(">li", container);
        var width = container.parent().width();

        var self = this;
        var current = 0;
        var total_slides = slides.length;

        // overview dots
        overview.click(function(ev) {    
            self.slideTo( $(this).index() );
            ev.preventDefault();
        });

        this.updateOverview = function() {
            overview.removeClass("active");
            $(overview.get( current )).addClass('active');
        };
        self.updateOverview();


        // slide to given index
        this.slideTo = function( index ) {
            if(index > total_slides-1) {
                index = total_slides-1;
            } 
            else if(index < 0) {
                index = 0;
            } 

            if(index == current) {
                return false;
            }

            container.css({ left: 0 - (width * index) });
            current = index;

            self.updateOverview();

            return true;
        };

        this.next = function() {
            return this.slideTo(current+1);	
        };

        this.prev = function() {
            return this.slideTo(current-1);	
        };

        this.getContainer = function() {
            return container;
        };

        this.getCurrent = function() {
            return $(slides.get(current));
        };
    }
var hammer = new Hammer(document.getElementById("br-images"));

var slideshow = new Slideshow("#br-images .slider", "#overview li");

// ondrag we preview the next/prev slide
    hammer.ondrag = function(ev) {
        var left = 0;
        // determine which direction we need to show the preview
        if(ev.direction == 'left') {
            left = 0 - ev.distance;
        } else if(ev.direction == 'right') {
            left = ev.distance;
        }

        // just move the marginLeft
        slideshow.getContainer().css({ marginLeft: left });
    };


    // ondragend we will move to the next/prev slide when we have 
    // opened it more then 100px on the screen
    hammer.ondragend = function(ev) {
        // restore the margin
        slideshow.getContainer().css({ marginLeft: 0 });

        // if we moved the slide 100px then navigate
        if(Math.abs(ev.distance) > 100) {
            if(ev.direction == 'right') {
                slideshow.prev();
            } else if(ev.direction == 'left') {
                slideshow.next();
            }
        }
    };