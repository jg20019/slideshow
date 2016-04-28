/* 
   Image Slideshow with lazy loading. 
   Images are transitioned by changing the src.
*/

var controller = {
    init: function (){
	model.init();
	view.init();
    },
    start: function (){
	var controller = this;
	var id = setInterval(function () {
	    controller.switchImage();
	}, 2000);
    },
    switchImage: function (){
	if (!model.pause){
	    model.next();
	    view.render();
	}
    },
    doneLoading: function (){
	console.log('Done loading');
	view.showImage();
	this.start();
    },
    getImageSrc: function (){
	return model.getImageSrc();
    },
    onmouseover: function (){
	console.log('Stop');
	model.pause = true;
    },
    onmouseout: function (){
	console.log('Continue');
	model.pause = false;
    },
};

var model = {
    init: function (){
	// Define the images here
	this.image_srcs = [
	    'img/galaxy.jpg',
	    'img/leaf.jpg'
	];
	this.pause = false;
	this.current = 0;
	this.num_images = this.image_srcs.length; 
	this.loadImages();
    },

    loadImages: function (){
	var model = this;
	this.images = [];
	this.image_srcs.forEach(function (src, index) {
	    var img = new Image();
	    img.src = src;
	    img.onload = function () {
		model.images.push(img);
		if (model.images.length === mode.num_images){
		    controller.doneLoading();
		}
	    };
	});
    },
    next: function (){
	this.current = (this.current + 1) % this.num_images;
    },
    prev: function (){
	this.current = (this.current + 1) % this.num_images;
    },
    getImageSrc: function (){
	return this.image_srcs[this.current];
    },
};


var view = {
    init: function (){
	this.container = document.querySelector('#slideshow');
	this.img = document.createElement('img');
	this.img.onmouseover = function (){
	    controller.onmouseover();
	};
	this.img.onmouseout = function (){
	    controller.onmouseout();
	};
    },
    showImage: function (){
	this.container.innerHTML = "";
	this.img.src = controller.getImageSrc();
	this.container.appendChild(this.img);
    },

    render: function (){
	this.img.src = controller.getImageSrc();
    }
};

controller.init();
