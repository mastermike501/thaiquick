function doFirst(){

	//chapter1 - basics
	
	var canvas = new fabric.Canvas('paint_area'); // create a wrapper around native canvas element (with id="paint_area")

	var rect = new fabric.Rect({ // create a rectangle object
		left: 100,
		top: 100,
		fill: 'red',
		width: 40,
		height: 40
	});
	var circle = new fabric.Circle({
		radius: 20, fill: 'purple', left: 200, top: 100
	});
	var triangle = new fabric.Triangle({
		width: 20, height: 30, fill: 'blue', left: 50, top: 50
	});
	
	var path = new fabric.Path('M0, 0 L200, 100 L170, 200 z'); //like java Polygon object
	path.set({ left: 120, top: 120 });
	
	// "add" shapes onto canvas
	canvas.add(path);
	canvas.add(rect);
	canvas.add(circle, triangle);
	
	//selectable attributes
	canvas.selection = false;          //Indicates whether group selection should be enabled
	rect.set({ selectable: false });   //sets selectable property for object // can set in constructor also
	
	//chapter2 - animation and events
	
	$('#click_me').click(function(){
		$(this).prop('disabled', true);
		rect.set({ angle: 0 });
		triangle.set({ left: 50 });
		canvas.renderAll();
	   
	   //animate red square
	   rect.animate('angle', 360, {
		    onChange: canvas.renderAll.bind(canvas),
    		duration: 2000,
    		easing: fabric.util.ease.easeInOutBack
       });
    	
       //animate purple circle
	   circle.animate('top', 300, {
		    onChange: canvas.renderAll.bind(canvas),
    		duration: 3000,
    		easing: fabric.util.ease.easeOutBounce,
    		onComplete: function(){
    			circle.animate('top', 100, {
		        	onChange: canvas.renderAll.bind(canvas),
                    duration: 3000,
            	    easing: fabric.util.ease.easeOutBack,
            		onComplete: function(){ $('#click_me').prop('disabled', false); }
            	});
    		}
    	});
    	
    	//animate blue triangle
    	triangle.animate('left', 250, {
    		 onChange: canvas.renderAll.bind(canvas),
    		 duration: 2000,
    		 easing: fabric.util.easeInOutCubic
    	});
	});
	
	//events
	rect.on('mouse:down', function(e) {
	 if (e.target) {
	  console.log('Oi!');
	 }
	});
	canvas.on('mouse:down', function(e) {
	 if (e.target) {
	  console.log('Ouch!');
	 }
	});
}

$(document).ready(doFirst);