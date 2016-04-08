var box_layer = new Kinetic.Layer({
	y: 1000
});

var intro_layer = new Kinetic.Layer();

var consonant_layer = new Kinetic.Layer({
	opacity: 0,
	visible: false
});

var vowel_layer = new Kinetic.Layer({
	opacity: 0,
	visible: false
});

var tone_layer = new Kinetic.Layer({
	opacity: 0,
	visible: false
});

var number_layer = new Kinetic.Layer({
	opacity: 0,
	visible: false
});

var memory_layer = new Kinetic.Layer({
	opacity: 0,
	visible: false
});

var lower_group = new Kinetic.Group();

//moves box upwards
var box_tween = new Kinetic.Tween({
	node: box_layer,
	easing: Kinetic.Easings.StrongEaseInOut,
	duration: 1.7,
	y: 60
});

//move up for consonants
var move_up_consonant = new Kinetic.Tween({
	node: consonant_layer,
	easing: Kinetic.Easings.StrongEaseInOut,
	duration: 1.7,
	y: -1000
});

//move up for vowels
var move_up_vowel = new Kinetic.Tween({
	node: vowel_layer,
	easing: Kinetic.Easings.StrongEaseInOut,
	duration: 1.7,
	y: -1000
});
	//move up for tone
var move_up_tone = new Kinetic.Tween({
	node: tone_layer,
	easing: Kinetic.Easings.StrongEaseInOut,
	duration: 1.7,
	y: -1000
});

//move up for numbers
var move_up_number = new Kinetic.Tween({
	node: number_layer,
	easing: Kinetic.Easings.StrongEaseInOut,
	duration: 1.7,
	y: -1000
});

var has_visited = false;
var layer_number = 0;
var checked_layers = [];

var consonant_set1 = [];
var consonant_descp_set1 = [];
var vowel_set1 = [];
var vowel_descp_set1 = [];
var tone_set = [];
var tone_descp_set = [];
var number_set1 = [];
var number_descp_set1 = [];

var isMobileDevice;
var container_spacing;
var container_initial_spacing;
var container_initial_spacing_2;
var tone_initial_spacing;

var stage_height = 600;
var container_square_size = 125;
var container_font_size = 48;
var desc_font_size = 18;
var desc_y_value = 70;
var second_layer_y_value = 240;

container_spacing = (resizeContainer() * 5) / 32;
container_initial_spacing = (resizeContainer() - ( (container_square_size * 6) + ( (container_spacing - container_square_size) * 5) )) / 2;
container_initial_spacing_2 = (resizeContainer() - ( (container_square_size * 5) + ( (container_spacing - container_square_size) * 4) )) / 2;
tone_initial_spacing = (resizeContainer() - ( (container_square_size * 4) + ( (container_spacing - container_square_size) * 3) )) / 2;

var checkbox_group = new Kinetic.Group({x: returnX(0.70)});
var checkbox_text;
var checkbox_box;
var isSelected = false;
var tick_shape = new Kinetic.Line({
	y: 40,
	points: [-20, 35, -5, 50, 20, 15],
	strokeWidth: 10,
	stroke: 'green',
	lineJoin: 'round',
	opacity: 0
});

checkbox_group.setOffset(checkbox_group.getWidth() / 2);

checkbox_group.add(checkbox_box = new Kinetic.Rect({
	width: 50,
	height: 50,
	fill: '#5B90F6',
	stroke: 'black',
	strokeWidth: 2,
	shadowOffset: {x: 5, y: 5},
	shadowBlur: 15,
	y: 50
}));

checkbox_box.setX( (checkbox_group.getWidth() - checkbox_box.getWidth()) / 2 );

checkbox_group.add(checkbox_text = new Kinetic.Text({
	fontSize: desc_font_size + 3,
	fontFamily: 'chatFontThin',
	text: "Click here to add\nto the game!",
	fill: 'white',
	align: 'center'
}));

checkbox_text.setX( (checkbox_group.getWidth() - checkbox_text.getWidth()) / 2 );

checkbox_group.add(tick_shape);
tick_shape.setX( (checkbox_group.getWidth() - tick_shape.getWidth()) / 2 );

checkbox_group.on('mouseover', function(){
	document.body.style.cursor = 'pointer';
});
checkbox_group.on('mouseout', function(){
	document.body.style.cursor = 'default';
});
checkbox_group.on('click tap', function(){
	if(!isSelected){
		checkbox_text.setText("Click here to remove\nfrom the game!");
		tick_shape.setOpacity(1);
		isSelected = true;
	} else{
		tick_shape.setOpacity(0);
		checkbox_text.setText("Click here to add\nto the game!");
		isSelected = false;
	}
	checkbox_text.setX( (checkbox_group.getWidth() - checkbox_text.getWidth()) / 2 );
	tick_shape.getLayer().draw();
	checkbox_text.getLayer().draw();

	var $isSelected;
	if(isSelected){
		$isSelected = 1;
	} else{
		$isSelected = 0;
	}

	checked_layers[layer_number - 1] = $isSelected;

	$.post('includes/game_connect.inc.php',
		{
			layer_number: layer_number,
			selected: $isSelected
		}
	);

});

function paint_checkbox(){
	var the_opacity = checked_layers[layer_number - 1];

	tick_shape.setOpacity(the_opacity);
	tick_shape.getLayer().draw();
	if(the_opacity == 1){
		checkbox_text.setText("Click here to remove\nfrom the game!");
		isSelected = true;
	} else{
		checkbox_text.setText("Click here to add\nto the game!");
		isSelected = false;
	}

	checkbox_text.setX( (checkbox_group.getWidth() - checkbox_text.getWidth()) / 2 );
	checkbox_text.getLayer().draw();
}

function main(){
	if($.cookie('isMobileDevice') == 1)
		isMobileDevice = true;

	if(isMobileDevice){

		stage_height = 450;

		container_spacing = 120;
		container_initial_spacing = 48;
		container_initial_spacing_2 = 110;

		container_square_size = 90;
		container_font_size = 40;
		desc_font_size = 16;
		desc_y_value = 50;
		second_layer_y_value = 200;
	}

	checkbox_group.setY(stage_height * 0.75);

	if($(window).width() < 500){
		alert("Your browser's window is too small to display the content!\nPlease resize your browser window and refresh the page.");

	} else{
		//BEGIN STAGE
		var stage = new Kinetic.Stage({
			container: 'game',
			width: resizeContainer(),
			height: stage_height
		});

		var back_layer = new Kinetic.Layer();

		var background_rect = new Kinetic.Rect({
			x: 0,
			y: 0,
			fillLinearGradientStartPoint: [415, 0],
			fillLinearGradientEndPoint: [415, 600],
			fillLinearGradientColorStops: [0, '#5CB3FF', 0.5, '#6698FF', 1, '#5CB3FF'],
			width: resizeContainer(),
			height: stage_height,
			opacity: 0.7
		});

		//add the background to the layer
		back_layer.add(background_rect);
		//add the layer to the stage
		stage.add(back_layer);
		//END STAGE

		//BEGIN INTRODUCTION TITLE LAYER
		var intro_text = new Kinetic.Text({
			align: 'center',
			y: 50,
			lineHeight: 1.5,
			text: 'Welcome to the Thai Quick! Online Application!\nSelect an item from the Menu above to begin.\n\n'
				+ 'Instructions:\n'
				+ '1. Select a topic from the menu above to begin.\n'
				+ '2. Click an item to learn about it.\n'
				+ '3. If you want to test yourself on the topic,\nclick the checkbox in the topic window.\n',
			fontFamily: 'chatFontReg',
			fontSize: 30,
			fill: 'black'
		});

		intro_text.setX( (stage.getWidth() - intro_text.getWidth()) / 2 );

		intro_layer.add(intro_text);
		stage.add(intro_layer);
		//END INTRODUCTION TITLE LAYER

		//BEGIN THE BIG BOX

		var box_rect = new Kinetic.Rect({
			cornerRadius: 10,
			fill: '#41A317',
			width: $(window).width() * 0.6,
			height: stage_height * 0.8,
			shadowOffset: {x: 8, y: 8},
			shadowOpacity: 0.5
		});

		var up_arrow_group = new Kinetic.Group({
			x: returnX(0.75),
			y: stage_height * 0.62
		});

		up_arrow_group.setOffset(up_arrow_group.getWidth() / 2);

		var arrow_image = new Image();
		arrow_image.onload = function(){
			var imageObj = new Kinetic.Image({
				image: arrow_image,
				width: 34.5,
				height: 73.5,
				shadowOffset: {x: 5, y: 5},
				shadowOpacity: 0.3
			});

			up_arrow_group.add(imageObj);

			imageObj.setX( (up_arrow_group.getWidth() - imageObj.getWidth()) / 2 );
		};
		arrow_image.src = 'images/arrow.png';

		var return_text = new Kinetic.Text({
			align: 'center',
			text: 'Return',
			fontSize: desc_font_size + 3,
			fontFamily: 'chatFontThin',
			fill: 'white',
			y: 80,
			shadowOffset: {x: 6, y: 6},
			shadowOpacity: 0.5
		});

		return_text.setX( (up_arrow_group.getWidth() - return_text.getWidth()) / 2 );

		up_arrow_group.add(return_text);

		box_layer.add(up_arrow_group);

		box_rect.setX( (stage.getWidth() - box_rect.getWidth()) / 2 );

		lower_group.add(box_rect);

		box_layer.add(lower_group);

		stage.add(box_layer);

		up_arrow_group.on('mouseover', function(){
			document.body.style.cursor = 'pointer';
		});
		up_arrow_group.on('mouseout', function(){
			document.body.style.cursor = 'default';
		});
		up_arrow_group.on('click touchstart tap', function(){
			stopSound();
			box_tween.reverse();
			move_up_consonant.reverse();
			move_up_vowel.reverse();
			move_up_tone.reverse();
			move_up_number.reverse();
		});

		//END THE BIG BOX

		//BEGIN CONSONANTS LAYER

		var consonant_title = new Kinetic.Text({
			align: 'center',
			y: 20,
			lineHeight: 1.5,
			text: 'Thai Consonants',
			fontSize: 30,
			fontFamily: 'chatFontReg',
			fill: 'black'
		});

		consonant_title.setX((stage.getWidth() - consonant_title.getWidth()) / 2);

		consonant_layer.add(consonant_title);

		stage.add(consonant_layer);

		var consonant_container = [];
		consonant_set1 = ["\u0E01", "\u0E02", "\u0E03", "\u0E04", "\u0E05", "\u0E06", "\u0E07", "\u0E08", "\u0E09", "\u0E0A", "\u0E0B"];
		consonant_descp_set1 = ["Goh Gai", "Khoh Khai", "Khoh Khuat (Obsolete)", "Khoh Khuai", "Khoh Kon (Obsolete)", "Khoh Ra-Kang", "Ngoh Nguu", "Joh Jahn", "Choh Ching", "Choh Chang", "Soh So"];

		for(var i = 0; i < consonant_set1.length; i++){

			if(i < 6){
				consonant_container[i] = new Kinetic.Group({//contains the consonants squares
					x: container_initial_spacing + (i * container_spacing),
					y: 80,
					id: i
				});
			} else{
				consonant_container[i] = new Kinetic.Group({//contains the consonants squares
					x: container_initial_spacing_2 + ((i - 6) * container_spacing),
					y: second_layer_y_value,
					id: i
				});
			}

			consonant_container[i].setOffset(consonant_container[i].getWidth() / 2);

			consonant_container[i].on('mouseover', function(){
				document.body.style.cursor = 'pointer';
			});
			consonant_container[i].on('mouseout', function(){
				document.body.style.cursor = 'default';
			});

			consonant_container[i].on('click touchstart tap', function(){
				moveUpConsonant(this.getId(), consonant_descp_set1[this.getId()]);
			});

			var consonant_square = new Kinetic.Rect({//contains the consonant
				cornerRadius: 10,
				fill: '#41A317',
				width: container_square_size,
				height: container_square_size,
				shadowOffset: {x: 6, y: 6},
				shadowOpacity: 0.5
			});

			var a_consonant = new Kinetic.Text({
				width: container_square_size,
				align: 'center',
				text: consonant_set1[i],
				fontSize: container_font_size,
				fontFamily: 'thaiFont',
				fill: 'white',
				y: 5,
				shadowOffset: {x: 5, y: 5},
				shadowOpacity: 0.9
			});

			var descp_consonant = new Kinetic.Text({
				width: container_square_size,
				y: desc_y_value,
				align: 'center',
				text: consonant_descp_set1[i],
				fontSize: desc_font_size,
				fontFamily: 'chatFontThin',
				fill: 'white',
				lineHeight: 1.2,
				shadowOffset: {x: 5, y: 5},
				shadowOpacity: 0.9
			});

			consonant_container[i].add(consonant_square); //add the square

			consonant_container[i].add(a_consonant);	//add the consonant

			consonant_container[i].add(descp_consonant); //add the description

			consonant_layer.add(consonant_container[i]);

		} //end for loop

		//END CONSONANTS LAYER

		//BEGIN VOWEL LAYER
		var vowel_title = new Kinetic.Text({
			align: 'center',
			y: 20,
			lineHeight: 1.5,
			text: 'Thai Vowels',
			fontSize: 30,
			fontFamily: 'chatFontReg',
			fill: 'black'
		});

		vowel_title.setX((stage.getWidth() - vowel_title.getWidth()) / 2);

		vowel_layer.add(vowel_title);
		stage.add(vowel_layer);

		var vowel_container = [];
		vowel_set1 = ["อะ", "อา", "อิ", "อี", "อึ", "อื", "อุ", "อู", "เอะ", "เอ", "แอะ"];
		vowel_descp_set1 = ["Sara ah", "Sara ar", "Sara e", "Sara ee", "Sara euh", "Sara err", "Sara u", "Sara oo", "Sara eh", "Sara ehh", "Sara air"];

		for(var i = 0; i < vowel_set1.length; i++){

			if(i < 6){
				vowel_container[i] = new Kinetic.Group({//contains the consonants squares
					x: container_initial_spacing + (i * container_spacing),
					y: 80,
					id: i
				});
			} else{
				vowel_container[i] = new Kinetic.Group({//contains the consonants squares
					x: container_initial_spacing_2 + ((i - 6) * container_spacing),
					y: second_layer_y_value,
					id: i
				});
			}

			vowel_container[i].setOffset(vowel_container[i].getWidth() / 2);

			vowel_container[i].on('mouseover', function(){
				document.body.style.cursor = 'pointer';
			});
			vowel_container[i].on('mouseout', function(){
				document.body.style.cursor = 'default';
			});

			vowel_container[i].on('click touchstart tap', function(){
				moveUpVowel(this.getId(), vowel_set1[this.getId()], vowel_descp_set1[this.getId()]);
			});

			var vowel_square = new Kinetic.Rect({//contains the consonant
				cornerRadius: 10,
				fill: '#41A317',
				width: container_square_size,
				height: container_square_size,
				shadowOffset: {x: 6, y: 6},
				shadowOpacity: 0.5
			});

			var a_vowel = new Kinetic.Text({
				width: container_square_size,
				align: 'center',
				text: vowel_set1[i],
				fontSize: container_font_size,
				fontFamily: 'thaiFont',
				fill: 'white',
				y: 5,
				shadowOffset: {x: 5, y: 5},
				shadowOpacity: 0.9
			});

			var desc_vowel = new Kinetic.Text({
				width: container_square_size,
				y: desc_y_value,
				align: 'center',
				text: vowel_descp_set1[i],
				fontSize: desc_font_size,
				fontFamily: 'chatFontThin',
				fill: 'white',
				lineHeight: 1.2,
				shadowOffset: {x: 5, y: 5},
				shadowOpacity: 0.9
			});

			vowel_container[i].add(vowel_square); //add the square

			vowel_container[i].add(a_vowel);	//add the consonant

			vowel_container[i].add(desc_vowel); //add the description

			vowel_layer.add(vowel_container[i]);

		} //end for loop

		//END VOWEL LAYER

		//BEGIN TONE LAYER

		var tone_title = new Kinetic.Text({
			align: 'center',
			y: 20,
			lineHeight: 1.5,
			text: 'Tone Marks Using the \'Goh\' Sound',
			fontSize: 30,
			fontFamily: 'chatFontReg',
			fill: 'black'
		});

		tone_title.setX((stage.getWidth() - tone_title.getWidth()) / 2);

		tone_layer.add(tone_title);
		stage.add(tone_layer);

		var tone_container = [];
		tone_set = ["ก่อ", "ก้อ", "ก๊อ", "ก๋อ"];
		tone_descp_set = ["Mai Ehk", "Mai Toh", "Mai Tree", "Mai Jattawaa"];

		for(var i = 0; i < tone_set.length; i++){

			tone_container[i] = new Kinetic.Group({//contains the consonants squares
				x: tone_initial_spacing + (i * container_spacing),
				y: 80,
				id: i
			});

			tone_container[i].setOffset(tone_container[i].getWidth() / 2);

			tone_container[i].on('mouseover', function(){
				document.body.style.cursor = 'pointer';
			});
			tone_container[i].on('mouseout', function(){
				document.body.style.cursor = 'default';
			});

			tone_container[i].on('click touchstart tap', function(){
				moveUpTone(this.getId(), tone_set[this.getId()], tone_descp_set[this.getId()]);
			});

			var tone_square = new Kinetic.Rect({//contains the consonant
				cornerRadius: 10,
				fill: '#41A317',
				width: container_square_size,
				height: container_square_size,
				shadowOffset: {x: 6, y: 6},
				shadowOpacity: 0.5
			});

			var a_tone = new Kinetic.Text({
				width: container_square_size,
				align: 'center',
				text: tone_set[i],
				fontSize: container_font_size,
				fontFamily: 'thaiFont',
				fill: 'white',
				y: 5,
				shadowOffset: {x: 5, y: 5},
				shadowOpacity: 0.9
			});

			var descp_tone = new Kinetic.Text({
				width: container_square_size,
				y: desc_y_value,
				align: 'center',
				text: tone_descp_set[i],
				fontSize: desc_font_size,
				fontFamily: 'chatFontThin',
				fill: 'white',
				lineHeight: 1.2,
				shadowOffset: {x: 5, y: 5},
				shadowOpacity: 0.9
			});

			tone_container[i].add(tone_square); //add the square

			tone_container[i].add(a_tone);	//add the consonant

			tone_container[i].add(descp_tone); //add the description

			tone_layer.add(tone_container[i]);

		} //end for loop

		//END TONE LAYER

		//BEGIN NUMBER LAYER

		var number_title = new Kinetic.Text({
			align: 'center',
			y: 20,
			lineHeight: 1.5,
			text: 'Thai Numbers',
			fontSize: 30,
			fontFamily: 'chatFontReg',
			fill: 'black'
		});

		number_title.setX((stage.getWidth() - number_title.getWidth()) / 2);

		number_layer.add(number_title);
		stage.add(number_layer);

		var number_container = [];
		number_set1 = ["\u0E50", "\u0E51", "\u0E52", "\u0E53", "\u0E54", "\u0E55", "\u0E56", "\u0E57", "\u0E58", "\u0E59", "\u0E51\u0E50"];
		number_descp_set1 = ["Soon", "Neung", "Sohng", "Saam", "Si", "Haa", "Hohg", "Jehd", "Pehd", "Gao", "Sip"];

		for(var i = 0; i < number_set1.length; i++){

			if(i < 6){
				number_container[i] = new Kinetic.Group({//contains the consonants squares
					x: container_initial_spacing + (i * container_spacing),
					y: 80,
					id: i
				});
			} else{
				number_container[i] = new Kinetic.Group({//contains the consonants squares
					x: container_initial_spacing_2 + ((i - 6) * container_spacing),
					y: second_layer_y_value,
					id: i
				});
			}

			number_container[i].setOffset(number_container[i].getWidth() / 2);

			number_container[i].on('mouseover', function(){
				document.body.style.cursor = 'pointer';
			});
			number_container[i].on('mouseout', function(){
				document.body.style.cursor = 'default';
			});

			number_container[i].on('click touchstart tap', function(){
				moveUpNumber(this.getId(), number_descp_set1[this.getId()]);
			});

			var number_square = new Kinetic.Rect({//contains the consonant
				cornerRadius: 10,
				fill: '#41A317',
				width: container_square_size,
				height: container_square_size,
				shadowOffset: {x: 6, y: 6},
				shadowOpacity: 0.5
			});

			var a_number = new Kinetic.Text({
				width: container_square_size,
				align: 'center',
				text: number_set1[i],
				fontSize: container_font_size,
				fontFamily: 'thaiFont',
				fill: 'white',
				y: 5,
				shadowOffset: {x: 5, y: 5},
				shadowOpacity: 0.9
			});

			var desc_number = new Kinetic.Text({
				width: container_square_size,
				y: desc_y_value,
				align: 'center',
				text: number_descp_set1[i],
				fontSize: desc_font_size,
				fontFamily: 'chatFontThin',
				fill: 'white',
				lineHeight: 1.2,
				shadowOffset: {x: 5, y: 5},
				shadowOpacity: 0.9
			});

			number_container[i].add(number_square); //add the square

			number_container[i].add(a_number);	//add the consonant

			number_container[i].add(desc_number); //add the description

			number_layer.add(number_container[i]);

		} //end for loop

		//END NUMBER LAYER

		//BEGIN MEMORY GAME LAYER

		var memory_title = new Kinetic.Text({
			align: 'center',
			y: 20,
			lineHeight: 1.5,
			text: 'Memory Game',
			fontSize: 30,
			fontFamily: 'chatFontReg',
			fill: 'black'
		});

		memory_title.setX((stage.getWidth() - memory_title.getWidth()) / 2);

		memory_layer.add(memory_title);
		stage.add(memory_layer);

		//END MEMORY GAME LAYER

	}//end else

	//fade out for main
	var main_out = new Kinetic.Tween({
		node: intro_layer,
		easing: Kinetic.Easings.EaseInOut,
		duration: 1,
		opacity: 0,
		visible: false
	});

	//fade in for consonants
	var consonant_in = new Kinetic.Tween({
		node: consonant_layer,
		easing: Kinetic.Easings.EaseInOut,
		duration: 1,
		opacity: 1,
		visible: true
	});

	//fade in for vowel
	var vowel_in = new Kinetic.Tween({
		node: vowel_layer,
		easing: Kinetic.Easings.EaseInOut,
		duration: 1,
		opacity: 1,
		visible: true
	});

	//fade in for tone
	var tone_in = new Kinetic.Tween({
		node: tone_layer,
		easing: Kinetic.Easings.EaseInOut,
		duration: 1,
		opacity: 1,
		visible: true
	});

	//fade in for number
	var number_in = new Kinetic.Tween({
		node: number_layer,
		easing: Kinetic.Easings.EaseInOut,
		duration: 1,
		opacity: 1,
		visible: true
	});

	//fade in for memory game
	var memory_in = new Kinetic.Tween({
		node: memory_layer,
		easing: Kinetic.Easings.EaseInOut,
		duration: 1,
		opacity: 1,
		visible: true
	});

	$('#main').click(function(){
		layer_number = 0;
		stopSound();
		main_out.reverse();
		consonant_in.reverse();
		vowel_in.reverse();
		tone_in.reverse();
		number_in.reverse();
		memory_in.reverse();
		box_tween.reset();
		move_up_consonant.reverse();
		move_up_vowel.reverse();
		move_up_tone.reverse();
		move_up_number.reverse();
	});
	$('#consonant').click(function(){
		layer_number = 1;
		stopSound();
		main_out.play();
		consonant_in.play();
		vowel_in.reverse();
		tone_in.reverse();
		number_in.reverse();
		memory_in.reverse();
		box_tween.reset();
		move_up_consonant.reverse();
		move_up_vowel.reverse();
		move_up_tone.reverse();
		move_up_number.reverse();
		checkbox_group.remove();
		consonant_layer.add(checkbox_group);
		paint_checkbox();
	});
	$('#vowel').click(function(){
		layer_number = 2;
		stopSound();
		main_out.play();
		consonant_in.reverse();
		vowel_in.play();
		tone_in.reverse();
		number_in.reverse();
		memory_in.reverse();
		box_tween.reset();
		move_up_consonant.reverse();
		move_up_vowel.reverse();
		move_up_tone.reverse();
		move_up_number.reverse();
		checkbox_group.remove();
		vowel_layer.add(checkbox_group);
		paint_checkbox();
	});
	$('#tone').click(function(){
		layer_number = 3;
		stopSound();
		main_out.play();
		consonant_in.reverse();
		vowel_in.reverse();
		tone_in.play();
		number_in.reverse();
		memory_in.reverse();
		box_tween.reset();
		move_up_consonant.reverse();
		move_up_vowel.reverse();
		move_up_tone.reverse();
		move_up_number.reverse();
		checkbox_group.remove();
		tone_layer.add(checkbox_group);
		paint_checkbox();
	});
	$('#number').click(function(){
		layer_number = 4;
		stopSound();
		main_out.play();
		consonant_in.reverse();
		vowel_in.reverse();
		tone_in.reverse();
		number_in.play();
		memory_in.reverse();
		box_tween.reset();
		move_up_consonant.reverse();
		move_up_vowel.reverse();
		move_up_tone.reverse();
		move_up_number.reverse();
		checkbox_group.remove();
		number_layer.add(checkbox_group);
		paint_checkbox();
	});
	$('#memory').click(function(){
		box_tween.reset();
		layer_number = 5;
		stopSound();
		main_out.play();
		consonant_in.reverse();
		vowel_in.reverse();
		tone_in.reverse();
		number_in.reverse();
		memory_in.play();
		gameInit();
		move_up_consonant.reverse();
		move_up_vowel.reverse();
		move_up_tone.reverse();
		move_up_number.reverse();
		checkbox_group.remove();
		total_items = 0;
	});

	setTimeout(window_calc, 1000);
} //end main function

var label1, label2, label3;

var total_items = 0;
var wrong_guesses;

var guess_group = new Kinetic.Group();
memory_layer.add(guess_group);

var drag_square_group = new Kinetic.Group({
	x: returnX(0.05)
});

var drag_explain_text = new Kinetic.Text({
	align: 'center',
	text: "Drag Here!",
	fontSize: desc_font_size + 10,
	fontFamily: 'chatFontReg',
	fill: 'black'
});

var drag_here_square = new Kinetic.Rect({
	fill: "none",
	stroke: "black",
	strokeWidth: 4,
	dashArray: [25, 10]
});

var results_text = new Kinetic.Text({
	align: "center",
	fontSize: 40,
	fontFamily: 'chatFontReg',
	opacity: 0,
	stroke: "black"
});

var results_display = new Kinetic.Text({
	align: "center",
	fontSize: 25,
	fontFamily: 'chatFontReg',
	fill: "black",
	lineHeight: 1.2
});

drag_square_group.add(results_display);
drag_square_group.add(results_text);
drag_square_group.add(drag_here_square);
drag_square_group.add(drag_explain_text);

memory_layer.add(drag_square_group);

var guess_this_text = new Kinetic.Text({
	y: -40,
	align: "center",
	fontFamily: 'chatFontReg',
	fontSize: 30,
	fill: 'white'
});

drag_square_group.add(guess_this_text);

var refresh_group = new Kinetic.Group();

memory_layer.add(refresh_group);

var refresh_img;
var img_src = new Image();
img_src.onload = function(){
	refresh_img = new Kinetic.Image({
		image: img_src,
		width: 90,
		height: 90
	});

	refresh_group.add(refresh_img);
};
img_src.src = "images/refresh.png";

var refresh_text = new Kinetic.Text({
	y: -20,
	align: "center",
	fontFamily: "chatFontThin",
	fontSize: desc_font_size + 3,
	fill: "white",
	text: "Refresh"
});

refresh_group.add(refresh_text);

refresh_group.on('mouseover', function(){
	document.body.style.cursor = 'pointer';
});
refresh_group.on('mouseout', function(){
	document.body.style.cursor = 'default';
});
refresh_group.on('click tap', gameInit);

var random_items_draggable = []; //holds draggable Kinetic text
var original_x;
var original_y;

for(var i = 0; i < 6; i++){

	random_items_draggable[i] = new Kinetic.Text({
		align: "center",
		fontFamily: 'thaiFont',
		fill: 'white'
	});
	guess_group.add(random_items_draggable[i]);

	random_items_draggable[i].on('dragstart', function(){
		label1.setOpacity(0);
		label2.setOpacity(0);
		label3.setOpacity(0);
		this.moveToTop();
		this.getLayer().draw();
	});
	random_items_draggable[i].on('touchstart mousedown', function(){
		original_x = this.getX();
		original_y = this.getY();
	});
	random_items_draggable[i].on('touchend mouseup', function(){
		var x_loc = drag_square_group.getX() + (drag_here_square.getWidth() / 2);
		var y_loc =	drag_square_group.getY() + (drag_here_square.getHeight() / 4);

		if(this.getX() > x_loc - 100 && this.getX() < x_loc + 100 && this.getY() > y_loc - 100 && this.getY() < y_loc + 100){
			if(this.getId() == guess_this_text.getText()){

				this.setPosition(x_loc, y_loc);
				drag_explain_text.setOpacity(0);
				results_text.setFill("#17FF5B");
				results_text.setText("Correct!");
				document.body.style.cursor = 'default';
				for(var counter = 0; counter < 6; counter++){
					random_items_draggable[counter].setDraggable(false);
					random_items_draggable[counter].off('mouseover');
				}
				total_items++;
			} else{
				results_text.setFill("#CD0000");
				results_text.setText("Incorrect!");
				this.setX(original_x);
				this.setY(original_y);
				wrong_guesses++;
			}
			results_display.setText("Incorrect guesses: " + String(wrong_guesses) + "\nNumber of rounds: " + String(total_items));
			results_display.setX((drag_here_square.getWidth() - results_display.getWidth()) / 2);
			results_display.setY(drag_here_square.getHeight() + 60);

			results_text.setOpacity(1);
			results_text.setX( (drag_here_square.getWidth() - results_text.getWidth()) / 2 );
			results_text.setY(drag_here_square.getHeight() + 15);
		} else{
			this.setX(original_x);
			this.setY(original_y);
		}
		this.getLayer().draw();
	});
}

function gameInit(){
	wrong_guesses = 0;
	results_display.setText("Incorrect guesses: " + wrong_guesses + "\nNumber of rounds: " + total_items);
	results_display.setX((drag_here_square.getWidth() - results_display.getWidth()) / 2);
	results_display.setY(drag_here_square.getHeight() + 60);

	setTimeout(function(){
		//some function to give timeout
	}, 1000);
	var no_of_items = 6;
	var memory_game_initial_spacing = container_initial_spacing - 130;
	var memory_game_spacing = container_spacing + 30;

	guess_group.moveToTop();
	refresh_group.setX(returnX(0.71));
	refresh_group.setY(stage_height * 0.79);
	refresh_text.setX( (refresh_img.getWidth() - refresh_text.getWidth()) / 2);

	var game_array_descp = [];
	var game_array_items = [];
	var game_items = [];

	results_text.setOpacity(0);

	drag_here_square.setHeight(stage_height * 0.5);
	drag_here_square.setWidth(stage_height * 0.5);

	drag_explain_text.setX( (drag_here_square.getWidth() - drag_explain_text.getWidth()) / 2 );
	drag_explain_text.setY( (drag_here_square.getHeight() - drag_explain_text.getHeight()) / 2 );
	if(drag_explain_text.getOpacity() === 0)
		drag_explain_text.setOpacity(1);

	drag_square_group.setY(stage_height * 0.23);

	for(var i = 0; i < 4; i++){
		if(checked_layers[i] == 1){
			switch(i){
				case 0:
					game_array_descp = game_array_descp.concat(consonant_descp_set1);
					game_array_items = game_array_items.concat(consonant_set1);
					break;
				case 1:
					game_array_descp = game_array_descp.concat(vowel_descp_set1);
					game_array_items = game_array_items.concat(vowel_set1);
					break;
				case 2:
					game_array_descp = game_array_descp.concat(tone_descp_set);
					game_array_items = game_array_items.concat(tone_set);
					break;
				case 3:
					game_array_descp = game_array_descp.concat(number_descp_set1);
					game_array_items = game_array_items.concat(number_set1);
					break;
			} //end switch
		} //end if
	} //end for loop

	if(game_array_descp.length < 6)
		no_of_items = 4;

	var guess_this_index = Math.round(Math.random() * game_array_descp.length); //selects a random index number based on array

	if(game_array_descp.length === 0){
		guess_this_text.setText("Please select a topic!");
		guess_this_text.setFill("red");
	} else{
		guess_this_text.setText(String(game_array_descp[guess_this_index]));
		guess_this_text.setFill("white");
	}
	guess_this_text.setX( (drag_here_square.getWidth() - guess_this_text.getWidth()) / 2 );

	game_items.push(guess_this_index);

	var fs = 125;
	if(isMobileDevice)
		fs = 90;

	random_items_draggable[0].setFontSize(fs);
	random_items_draggable[0].setText(game_array_items[guess_this_index]);
	random_items_draggable[0].setId(game_array_descp[guess_this_index]);
	random_items_draggable[0].setDraggable(true);
	random_items_draggable[0].on('mouseover', function(){
		document.body.style.cursor = 'pointer';
	});
	random_items_draggable[0].on('mouseout', function(){
		document.body.style.cursor = 'default';
	});

	for(var i = 1; i < 6; i++){
		var does_exist = false;
		var random_no = Math.round(Math.random() * game_array_items.length);
		for(var j = 0; j < game_items.length; j++){ //checks if the random number has been used before
			if(random_no == game_items[j]){ //if statement is true if number has been used before
				if(game_items[j] !== null)
					i--;
				does_exist = true;
				break;
			}
		}

		if(!does_exist){
			if(no_of_items == 4 && i >= 4){
				random_items_draggable[i].setText("");
				random_items_draggable[i].setId("");
				game_items.push(null);
			} else{
				random_items_draggable[i].setFontSize(fs);
				random_items_draggable[i].setText(game_array_items[random_no]);
				random_items_draggable[i].setId(game_array_descp[random_no]);
				random_items_draggable[i].setDraggable(true);
				random_items_draggable[i].on('mouseover', function(){
					document.body.style.cursor = 'pointer';
				});
				random_items_draggable[i].on('mouseout', function(){
					document.body.style.cursor = 'default';
				});
				game_items.push(random_no);
			}
		}
	}

	random_items_draggable = shuffle(random_items_draggable, no_of_items);

	if(isMobileDevice){
		memory_game_initial_spacing -= 60;
		memory_game_spacing += 15;
	}

	for(var i = 0; i < 6; i++){
		if(i < 3){
			random_items_draggable[i].setX(memory_game_initial_spacing + ((i + 3) * memory_game_spacing));
			random_items_draggable[i].setY(80);
		}else{
			random_items_draggable[i].setX(memory_game_initial_spacing + (i * memory_game_spacing));
			random_items_draggable[i].setY(second_layer_y_value);
		}
		random_items_draggable[i].setOffset({
			x: random_items_draggable[i].getWidth() / 2
		});
	}

	if(!has_visited){
		has_visited = true;

		label1 = new Kinetic.Label({
			x: drag_square_group.getX() + (drag_here_square.getWidth() / 2),
			y: drag_square_group.getY() + (drag_here_square.getHeight() * (7 / 12)),
			opacity: 0.75
		});

		label1.add(new Kinetic.Tag({
			fill: 'black',
			pointerDirection: 'up',
			pointerWidth: 10,
			pointerHeight: 15,
			lineJoin: 'round',
			shadowBlur: 10,
			shadowOffset: 5,
			shadowOpacity: 0.5
		}));

		label1.add(new Kinetic.Text({
			text: '1. Drag an item here that\nmatches the word above.\nIf something goes wrong,\nrefresh until normal.',
			fontFamily: 'chatFontThin',
			fontSize: 18,
			padding: 5,
			fill: 'white'
		}));

		label2 = new Kinetic.Label({
			x: drag_square_group.getX() * 5,
			y: (drag_square_group.getY() * 3) + 50,
			opacity: 0.75
		});

		label2.add(new Kinetic.Tag({
			fill: 'black',
			pointerDirection: 'left',
			pointerWidth: 10,
			pointerHeight: 15,
			lineJoin: 'round',
			shadowBlur: 10,
			shadowOffset: 5,
			shadowOpacity: 0.5
		}));

		label2.add(new Kinetic.Text({
			text: '2. The results of your guess\nwill appear here.',
			fontFamily: 'chatFontThin',
			fontSize: 18,
			padding: 5,
			fill: 'white'
		}));

		label3 = new Kinetic.Label({
			x: refresh_group.getX() - 5,
			y: refresh_group.getY() + 40,
			opacity: 0.75
		});

		label3.add(new Kinetic.Tag({
			fill: 'black',
			pointerDirection: 'right',
			pointerWidth: 10,
			pointerHeight: 15,
			lineJoin: 'round',
			shadowBlur: 10,
			shadowOffset: 5,
			shadowOpacity: 0.5
		}));

		var label3_text = new Kinetic.Text({
			fontFamily: 'chatFontThin',
			fontSize: 18,
			padding: 5,
			fill: 'white'
		});

		label3.add(label3_text);

		if(isMobileDevice){
			label3_text.setText("3. Tap here to\nrefresh the game.");
		} else {
			label3_text.setText("3. Click here or press 'R'\nto refresh the game.\nPress 'H' to see these\nhints.");
		}

		memory_layer.add(label1).add(label2).add(label3);
	}
	memory_layer.draw();
} //end function gameInit()

function shuffle(array, x) {
	var length = array.length;

	if(x === 4)
		length = x;

    for (var i = length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function resizeContainer(){
	return $(window).width() * 0.8;
}

function returnX(x){
	return ($(window).width() * x);
}

var item_description = new Kinetic.Text({
	align: 'center',
	y: -40,
	lineHeight: 1.5,
	fontSize: 30,
	fontFamily: 'chatFontReg',
	fill: 'black'
});

box_layer.add(item_description);

var item_title = new Kinetic.Text({
	x: returnX(0.12),
	y: 28,
	lineHeight: 1.5,
	fontSize: desc_font_size + 10,
	fontFamily: 'chatFontThin',
	fill: 'white',
	shadowOffset: {x: 5, y: 5},
	shadowOpacity: 0.7
});

lower_group.add(item_title);

var item_full_name = new Kinetic.Text({
	y: 20,
	lineHeight: 1.5,
	fontSize: desc_font_size + 16,
	fontFamily: 'thaiFont',
	fill: 'white',
	shadowOffset: {x: 5, y: 5},
	shadowOpacity: 0.7
});

lower_group.add(item_full_name);

var playback_buttons = new Kinetic.Group({
	x: returnX(0.27),
	y: 63
});

playback_buttons.on('mouseover', function(){
	document.body.style.cursor = 'pointer';
});
playback_buttons.on('mouseout', function(){
	document.body.style.cursor = 'default';
});

lower_group.add(playback_buttons);

var playback_png = ['images/play.png', 'images/stop.png'];

var playback_image_source = []; //holds js Image objects
var playback_image_kinetic; //is a kinetic image object

for(var i = 0; i < 2; i++){
	playback_image_source[i] = new Image();
	playback_image_source[i].onload = function(){
		playback_image_kinetic = new Kinetic.Image({
			image: playback_image_source[i],
			width: 40,
			height: 40,
			shadowOffset: {x: 5, y: 5},
			shadowOpacity: 0.3
		});

		playback_buttons.add(playback_image_kinetic);
	};
	playback_image_source[i].src = playback_png[i];
}

var isPlaying = false;
var snd = document.createElement('audio');
var can_play_source = snd.canPlayType("audio/mpeg");

snd.addEventListener("load", function(){
	snd.play();
}, true);

playback_buttons.on('mouseover touchstart', function(){
	playback_image_kinetic.setPosition(3, 3);
	playback_image_kinetic.setShadowOffset(2, 2);
	if(isPlaying){
		playback_image_kinetic.setImage(playback_image_source[1]);
	} else{
		playback_image_kinetic.setImage(playback_image_source[0]);
	}
	playback_image_kinetic.getLayer().draw();
});
playback_buttons.on('mouseout touchend', function(){
	playback_image_kinetic.setPosition(0, 0);
	playback_image_kinetic.setShadowOffset(5, 5);
	if(isPlaying){
		playback_image_kinetic.setImage(playback_image_source[1]);
	} else{
		playback_image_kinetic.setImage(playback_image_source[0]);
	}
	playback_image_kinetic.getLayer().draw();
});

playback_buttons.on('click tap', function(){
	if(isPlaying){//sound is playing
		snd.pause();
		snd.currentTime = 0;
		isPlaying = false;
		playback_image_kinetic.setImage(playback_image_source[0]);
		this.draw();
	}
	else{//sound is stopped
		snd.play();
		isPlaying = true;
		playback_image_kinetic.setImage(playback_image_source[1]);
		this.draw();
	}
	snd.addEventListener('ended', function(){//listen for sound end
		isPlaying = false;
		playback_image_kinetic.setImage(playback_image_source[0]);
		playback_buttons.draw();
	}, false);
});

var trace_consonant_source = []; //holds js Image objects
var trace_image_kinetic; //is a kinetic image object

for(var i = 0; i < 11; i++){
	trace_consonant_source[i] = new Image();
	trace_consonant_source[i].onload = function(){
		trace_image_kinetic = new Kinetic.Image({ //consonant
			shadowOffset: {x: 12, y: 8},
			shadowOpacity: 0.3,
			x: returnX(0.12),
			y: 140
		});

		lower_group.add(trace_image_kinetic);
	};
	trace_consonant_source[i].src = 'images/consonant_trace/' + i + '.png';
}

var trace_vowel_source = [];

for(var i = 0; i < 11; i++){
	trace_vowel_source[i] = new Image();
	trace_vowel_source[i].onload = function(){
		trace_image_kinetic = new Kinetic.Image({ //vowel
			shadowOffset: {x: 12, y: 8},
			shadowOpacity: 0.3,
			x: returnX(0.12),
			y: 140
		});

		lower_group.add(trace_image_kinetic);
	};
	trace_vowel_source[i].src = 'images/vowel_trace/' + i + '.png';
}

var trace_tone_source = [];

for(var i = 0; i < 4; i++){
	trace_tone_source[i] = new Image();
	trace_tone_source[i].onload = function(){
		trace_image_kinetic = new Kinetic.Image({ //tone
			shadowOffset: {x: 12, y: 8},
			shadowOpacity: 0.3,
			x: returnX(0.12),
			y: 140
		});

		lower_group.add(trace_image_kinetic);
	};
	trace_tone_source[i].src = 'images/tone_trace/' + i + '.png';
}

var trace_number_source = [];

for(var i = 0; i < 11; i++){
	trace_number_source[i] = new Image();
	trace_number_source[i].onload = function(){
		trace_image_kinetic = new Kinetic.Image({ //number
			shadowOffset: {x: 12, y: 8},
			shadowOpacity: 0.3,
			x: returnX(0.12),
			y: 140
		});

		lower_group.add(trace_image_kinetic);
	};
	trace_number_source[i].src = 'images/number_trace/' + i + '.png';
}

//

var img_consonant_source = [];
var img_image_kinetic;

for(var i = 0; i < 11; i++){
	img_consonant_source[i] = new Image();
	img_consonant_source[i].onload = function(){
		img_image_kinetic = new Kinetic.Image({
			image: img_consonant_source[i],
			width: 200,
			height: 200,
			shadowOffset: {x: 12, y: 8},
			shadowOpacity: 0.3,
			x: returnX(0.35),
			y: 130
		});
		lower_group.add(img_image_kinetic);
	};
	img_consonant_source[i].src = 'images/consonant_img/' + i + '.png';
}

var img_number_source = [];

for(var i = 0; i < 11; i++){
	img_number_source[i] = new Image();
	img_number_source[i].onload = function(){
		img_image_kinetic = new Kinetic.Image({
			image: img_number_source[i],
			width: 200,
			height: 200,
			shadowOffset: {x: 12, y: 8},
			shadowOpacity: 0.3,
			x: returnX(0.45),
			y: 130
		});
		lower_group.add(img_image_kinetic);
	};
	img_number_source[i].src = 'images/number_img/' + i + '.png';
}

var explaination_text = new Kinetic.Text({
	fontFamily: 'chatFontThin',
	fontSize: 20,
	padding: 5,
	fill: 'white',
	x: returnX(0.35),
	y: 110,
	lineHeight: 2
});
lower_group.add(explaination_text);

//functions for above variables
function moveUpConsonant(index, desc){

	var full_consonant = ["กอ ไก่", "ขอ ไข่", "ฃอ ขวด", "คอ ควาย", "ฅอ คน", "ฆอ ระฆัง", "งอ งู", "จอ จาน", "ฉอ ฉิ่ง", "ชอ ช้าง", "ซอ โซ่"];

	move_up_consonant.play();
	box_tween.play();

	item_description.setText(desc);
	item_description.setX( (resizeContainer() - item_description.getWidth()) / 2 );

	item_title.setText("Consonant Transcription :\n" + "How to Say It :\n");
	item_title.moveToTop();

	if(isMobileDevice){
		item_full_name.setX(returnX(0.46));
		playback_buttons.setX(returnX(0.31));
	} else{
		item_full_name.setX(returnX(0.39));
	}

	item_full_name.setText(full_consonant[index]);
	item_full_name.moveToTop();

	if(can_play_source === "maybe" || can_play_source === "probably")
		snd.setAttribute('src', 'audio_files/consonants/' + index + '.mp3');
	else
		snd.setAttribute('src', 'audio_files/consonants/' + index + '.ogg');

	playback_image_kinetic.setImage(playback_image_source[0]);
	playback_buttons.moveToTop();

	trace_image_kinetic.setImage(trace_consonant_source[index]);
	trace_image_kinetic.setWidth(150);
	trace_image_kinetic.setHeight(200);
	img_image_kinetic.setImage(img_consonant_source[index]);

	img_image_kinetic.setOpacity(1);
	explaination_text.setOpacity(0);

	trace_image_kinetic.moveToTop();
	img_image_kinetic.moveToTop();

	item_description.getLayer().draw();
	item_title.getLayer().draw();
	item_full_name.getLayer().draw();
	playback_buttons.getLayer().draw();
	trace_image_kinetic.getLayer().draw();
	img_image_kinetic.getLayer().draw();
}

function moveUpVowel(index, item, desc){

	move_up_vowel.play();
	box_tween.play();

	item_description.setText(desc);
	item_description.setX( (resizeContainer() - item_description.getWidth()) / 2 );

	item_title.setText("Vowel Transcription :\n" + "How to Say It :\n");
	item_title.moveToTop();

	if(isMobileDevice){
		item_full_name.setX(returnX(0.39));
		playback_buttons.setX(returnX(0.31));
	} else{
		item_full_name.setX(returnX(0.34));
	}

	item_full_name.setText(item);
	item_full_name.moveToTop();

	if(can_play_source === "maybe" || can_play_source === "probably")
		snd.setAttribute('src', 'audio_files/vowels/' + index + '.mp3');
	else
		snd.setAttribute('src', 'audio_files/vowels/' + index + '.ogg');

	playback_image_kinetic.setImage(playback_image_source[0]);
	playback_buttons.moveToTop();

	trace_image_kinetic.setImage(trace_vowel_source[index]);
	trace_image_kinetic.setWidth(150);
	trace_image_kinetic.setHeight(150);

	switch(index){
		case 0:
			explaination_text.setText("Description:\n" + "- Short Vowel\n" + "- Placed on the right side of\nconsonants\n");
			break;
		case 1:
			explaination_text.setText("Description:\n" + "- Long Vowel\n" + "- Placed on the right side of\nconsonants\n");
			break;
		case 2:
		case 4:
			explaination_text.setText("Description:\n" + "- Short Vowel\n" + "- Placed on top of consonants\n" + "- The circle of dots represents the\nlocation of the consonant");
			break;
		case 3:
		case 5:
			explaination_text.setText("Description:\n" + "- Long Vowel\n" + "- Placed on top of consonants\n" + "- The circle of dots represents the\nlocation of the consonant");
			break;
		case 6:
			explaination_text.setText("Description:\n" + "- Short Vowel\n" + "- Placed at the bottom of\nconsonants\n" + "- The circle of dots represents the\nlocation of the consonant");
			break;
		case 7:
			explaination_text.setText("Description:\n" + "- Long Vowel\n" + "- Placed at the bottom of\nconsonants\n" + "- The circle of dots represents the\nlocation of the consonant");
			break;
		case 8:
		case 10:
			explaination_text.setText("Description:\n" + "- Short Vowel\n" + "- Placed at the left and right\nsides of consonants\n");
			break;
		case 9:
			explaination_text.setText("Description:\n" + "- Long Vowel\n" + "- Placed on the left side of\nconsonants\n");
			break;
	}

	img_image_kinetic.setOpacity(0);
	explaination_text.setOpacity(1);

	trace_image_kinetic.moveToTop();
	explaination_text.moveToTop();

	item_description.getLayer().draw();
	item_title.getLayer().draw();
	item_full_name.getLayer().draw();
	playback_buttons.getLayer().draw();
	trace_image_kinetic.getLayer().draw();
	explaination_text.getLayer().draw();
}

function moveUpTone(index, item, desc){

	move_up_tone.play();
	box_tween.play();

	item_description.setText(desc);
	item_description.setX( (resizeContainer() - item_description.getWidth()) / 2 );

	item_title.setText("Tone Transcription :\n" + "How to Say It :\n");
	item_title.moveToTop();

	if(isMobileDevice){
		item_full_name.setX(returnX(0.39));
		playback_buttons.setX(returnX(0.31));
	} else{
		item_full_name.setX(returnX(0.34));
	}

	item_full_name.setText(item);
	item_full_name.moveToTop();

	if(can_play_source === "maybe" || can_play_source === "probably")
		snd.setAttribute('src', 'audio_files/tones/' + index + '.mp3');
	else
		snd.setAttribute('src', 'audio_files/tones/' + index + '.ogg');

	playback_image_kinetic.setImage(playback_image_source[0]);
	playback_buttons.moveToTop();

	trace_image_kinetic.setImage(trace_tone_source[index]);
	trace_image_kinetic.setWidth(150);
	trace_image_kinetic.setHeight(150);

	switch(index){
		case 0:
			explaination_text.setText("Description:\n" + "- Creates a LOW tone on MID and\nHIGH class consonants\n" + "- Creates a FALLING tone on LOW\nclass consonants\n" + "- The circle of dots represents the\nlocation of the consonant");
			break;
		case 1:
			explaination_text.setText("Description:\n" + "- Creates a FALLING tone on MID\nand HIGH class consonants\n" + "- Creates a HIGH tone on LOW class\nconsonants\n" + "- The circle of dots represents the\nlocation of the consonant");
			break;
		case 2:
			explaination_text.setText("Description:\n" + "- Creates a HIGH tone on MID class\nconsonants\n" + "- Not applicable on HIGH and LOW\nclass consonants\n" + "- The circle of dots represents the\nlocation of the consonant");
			break;
		case 3:
			explaination_text.setText("Description:\n" + "- Creates a RISING tone on MID\nclass consonants\n" + "- Not applicable on HIGH and LOW\nclass consonants\n" + "- The circle of dots represents the\nlocation of the consonant");
			break;
	}

	img_image_kinetic.setOpacity(0);
	explaination_text.setOpacity(1);

	trace_image_kinetic.moveToTop();
	explaination_text.moveToTop();

	item_description.getLayer().draw();
	item_title.getLayer().draw();
	item_full_name.getLayer().draw();
	playback_buttons.getLayer().draw();
	trace_image_kinetic.getLayer().draw();
	explaination_text.getLayer().draw();
}

function moveUpNumber(index, desc){

	var full_number = ["ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า","สิบ"];

	move_up_number.play();
	box_tween.play();

	item_description.setText(desc);
	item_description.setX( (resizeContainer() - item_description.getWidth()) / 2 );

	item_title.setText("Number Transcription :\n" + "How to Say It :\n");
	item_title.moveToTop();

	if(isMobileDevice){
		item_full_name.setX(returnX(0.42));
		playback_buttons.setX(returnX(0.31));
		item_full_name.draw();
		playback_buttons.draw();
	} else{
		item_full_name.setX(returnX(0.36));
		item_full_name.draw();
	}

	item_full_name.setText(full_number[index]);
	item_full_name.moveToTop();

	if(can_play_source === "maybe" || can_play_source === "probably")
		snd.setAttribute('src', 'audio_files/numbers/' + index + '.mp3');
	else
		snd.setAttribute('src', 'audio_files/numbers/' + index + '.ogg');

	playback_image_kinetic.setImage(playback_image_source[0]);
	playback_buttons.moveToTop();

	trace_image_kinetic.setImage(trace_number_source[index]);
	if(index === 10)
		trace_image_kinetic.setWidth(300);
	else
		trace_image_kinetic.setWidth(150);
	trace_image_kinetic.setHeight(150);
	img_image_kinetic.setImage(img_number_source[index]);

	img_image_kinetic.setOpacity(1);
	explaination_text.setOpacity(0);

	trace_image_kinetic.moveToTop();
	img_image_kinetic.moveToTop();

	item_description.getLayer().draw();
	item_title.getLayer().draw();
	item_full_name.getLayer().draw();
	playback_buttons.getLayer().draw();
	trace_image_kinetic.getLayer().draw();
	img_image_kinetic.getLayer().draw();
}

function stopSound(){
	if(isPlaying){
		snd.pause();
		snd.currentTime = 0;
		isPlaying = false;
		playback_image_kinetic.setImage(playback_image_source[0]);
		playback_buttons.draw();
	}
}

$(document).on('keypress', function(e){
	switch(e.keyCode){
		case 72:
		case 104: //letter h for tooltips
			if(memory_layer.getOpacity() === 1){
				label1.setOpacity(0.75);
				label2.setOpacity(0.75);
				label3.setOpacity(0.75);
				memory_layer.draw();
			}
			break;
		case 82:
		case 114: //letter r for refreshing
			if(memory_layer.getOpacity() === 1){
				gameInit();
				setTimeout(function(){
					memory_layer.draw();
				}, 200);
			}
			break;
	} //end switch
});

function once(){

	//preloads prechecked values from database
	$.post('includes/game_connect.inc.php',
		function(data){
			checked_layers[0] = data.consonant;
			checked_layers[1] = data.vowel;
			checked_layers[2] = data.tone;
			checked_layers[3] = data.number;
			alert(data);
		},
		'json' //type of data to parse to on return
	);
	setTimeout(function(){
		main();
		gameInit();
	}, 200);
}

$(document).ready(once);
