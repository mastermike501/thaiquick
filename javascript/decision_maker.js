$(document).ready(function(){
	$('#the_no_button').click(function(){
		window.location = "index.php";
	});
	$('#the_yes_button').click(function(){
		$('#info').html('<table><tr><td colspan="2">Are you sure?</td></tr><tr><td><input type="button" class="button_style" id="second_yes_button" value="Yes"></td><td><input type="button" class="button_style" id="second_no_button" value="No"></td></tr></table>');
		
		$('#second_yes_button').click(function(){
			$('#info').html("<p>The account will be deleted and return to homepage.</p>");
			var time = 2;
			var interval = setInterval(function(){
				time = time - 1;
				if(time == 0){
					$.post('includes/delete_user.inc.php',
						{
							pzpeJlDhQUYiF8RrTl5EppQz22ODilxF7U1IDjFI: "3TqDrTUa9c1mbeT7Us8Qh3daMDIlszrUoREoSwQ0"
						},
						function(e){
							clearInterval(interval);
							window.location = "index.php";
						}
					);
				}
			}, 1000);
		});
		$('#second_no_button').click(function(){
			$('#info').html("<p>The account has not been deleted!</p>");
		});
	});
});