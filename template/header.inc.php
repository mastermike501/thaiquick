<!DOCTYPE html>
<html>
<head>
<link rel="shortcut icon" href="images/favicon.ico" />
<link rel="stylesheet" href="css/thai.css" type="text/css">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script type="text/javascript" src="javascript/jquery.js"></script>
<script type="text/javascript" src="javascript/window_calc.js"></script>
<script type="text/javascript" src="javascript/fbjs.js"></script>
<?php
	$browser = get_browser(null, true);
	if($browser['ismobiledevice'] == 1){
		echo '<script type="text/javascript" src="javascript/window_orientation.js"></script>';
	}
?>
<script type="text/javascript">
$(document).ready(function(){
	$(".field").focus(function(){
		$(this).removeClass("field");
		$(this).addClass("field_change");
	});
	$(".field").blur(function(){
		$(this).removeClass("field_change");
		$(this).addClass("field");
	});
	$('#the_logout_button').click(function(){
		window.location = 'logout.php';
	});
	$('#the_account_button').click(function(){
		window.location = 'account.php';
	});
	window_calc();
	if (document.createElement("input").webkitSpeech === undefined) {
		//do nothing
	} else{
		$('#login_username').attr('x-webkit-speech', '');
	}
});
$(document).mousemove(function(){
	window_calc();
});
</script>
<?php echo EXTRA_CODE; ?><!-- retrieves any extra javascript -->
<style type="text/css">
	<?php
		if($browser['ismobiledevice'] == 1){
			echo "
			#content{
				width: 63%;
			}
			#sidebar{
				width: 31%;
			}
			#breadcrumb_trail{
				margin: -8px 0px -15px 26%;
			}
			#game{
				margin-left: -45%;
				text-align: center;
			}
			#game_nav{
				margin-left: -22%;
			}
			";
		}
		else{
			echo "
			#content{
				width: 70%;
			}
			#sidebar{
				width: 23%;
			}
			#breadcrumb_trail{
				margin: -8px 0px -15px 230px;
			}
			#game{
				margin-left: -250px;
				text-align: center;
			}
			#game_nav{
				margin-left: -130px;
				text-align: center;
			}
			";
		}
	?>
	<?php echo EXTRA_CSS; ?> <!-- retrieves any extra CSS from pages -->
</style>
<title>Thai Quick! - <?php print TITLE; ?></title>
<meta name="google-translate-customization" content="a5967249ceff2048-5ce2a6dfbb5c7c3b-g9ae7bcbbe399755f-13"></meta>
</head>

<body id="body">
<div id="fb-root"></div>
<aside id="float_box">
	<a href="http://www.w3.org/html/logo/" target="_blank">
	<img src="http://www.w3.org/html/logo/badge/html5-badge-v-css3-graphics-multimedia-semantics.png" width="38" height="202" alt="HTML5 Powered with CSS3 / Styling, Graphics, 3D &amp; Effects, Multimedia, and Semantics" title="HTML5 Powered with CSS3 / Styling, Graphics, 3D &amp; Effects, Multimedia, and Semantics" style="border: none;">
	</a>
	<div class="fb-like" data-href="https://www.facebook.com/thaiquick" data-width="38" data-colorscheme="dark" data-layout="box_count" data-show-faces="true" data-send="false"></div>
</aside>
<div id="wrapper">
	<header id="header"><!-- BEGIN header -->
		<a id="title_head" href="index.php">Thai Quick!&nbsp;</a>
		<nav id="nav"><!-- BEGIN navigation toolbar -->
   			<ul>
				<li><a href="index.php">Home</a></li>
				<li><a href="about.php">About</a></li>
				<?php
				if(!empty($_SESSION['username']) && isset($_SESSION['login_is_successful'])){
					if($_SESSION['login_is_successful'] == "true"){
						echo ' <li><a href="learn.php">Learn</a></li>';
						echo ' <li><a href="tones.php">More About Thai Tones</a></li>';
						echo ' <li><a href="account.php">Account</a></li>';
					}
				} else{
					echo ' <li><a href="register.php">Register</a></li>';
				}
				?>
				<li><a href="contact.php">Contact the Author</a></li>
			</ul>
    	</nav><!-- END navigation toolbar -->
	</header><!-- END header -->
    <div id="breadcrumb_trail"><!-- BEGIN breadcrumb trail -->
		<ul>
			<?php
				$array_size = sizeOf($breadcrumb_list) - 1;
				for($i = 0; $i < $array_size; $i++){ //for-loop to print out breadcrumb trail
					print "<li class='breadcrumb'><a href='$breadcrumb_link[$i]' class='breadcrumb_link_class'>$breadcrumb_list[$i]</a></li>";
				}
				print "<li class='breadcrumb'>$breadcrumb_list[$array_size]</li>";
			?>
		</ul>
	</div><!-- END breadcrumb trail -->
	<div id="sidebar_wrap">
	<aside id="sidebar"><!-- BEGIN sidebar -->
    	<?php //changes as user logs in or logs out		
    	if(!empty($_SESSION['username']) && isset($_SESSION['login_is_successful'])){
    		if($_SESSION['login_is_successful'] == "true")
				include('includes/user_welcome.inc.php');
			else
				include('includes/login_form.inc.php');
		}
    	else{
    		include('includes/login_form.inc.php');
    	}
    	?>
    	<?php
    	if(TITLE != "Learn"){
    		echo('<div class="sidebar_elements"><!-- BEGIN other_links -->
					<fieldset>
					<header id="sidebar_header">External Links &raquo;</header>
					Want to learn more about the Thai language? Visit the sites below!
					<table class="other_links collapse">');
			$xml_external_links = simplexml_load_file('xmls/external_links.xml'); //echos out the external links using external XML file
			foreach($xml_external_links->external_link as $external_link){
				echo '<tr><td>'.$external_link->index_no.'</td><td><a class="external_link" href='.$external_link->link.'>'.$external_link->name.'</a></td></tr>';
			}
			echo '</table></fieldset></div><!-- END other_links -->';
		}
    	
    	?>
		
    </aside><!-- END sidebar -->
    </div><!-- sidebar wrapper -->

	<div id="content_wrap">
	<div id="content">
		<!-- BEGIN CHANGABLE CONTENT -->