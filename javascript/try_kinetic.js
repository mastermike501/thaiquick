function doSecond(){
	var stage = new Kinetic.Stage({
		container: 'paint_area2',
		width: 400,
		height: 400
	});
	
	var layer = new Kinetic.Layer();
	
	var rect_kinetic = new Kinetic.Rect({
		x: 100,
		y: 100,
		width: 40,
		height: 40,
		fill: 'red'
	});
	
	var circle_kinetic = new Kinetic.Circle({
		radius: 20, fill: 'purple', x: 200, y: 100
	});
	
	// add the shape to the layer
	layer.add(rect_kinetic);
	layer.add(circle_kinetic);
	//layer.add(black_triangle);
	
	// add the layer to the stage
	stage.add(layer);
}

$(document).ready(doSecond);