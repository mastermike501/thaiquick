<div class="sidebar_elements"><!-- BEGIN login -->
	<fieldset>
	<header id="sidebar_header">Login &raquo;</header>
		<form name="login" method="post" action="login.php">
			<table class="collapse">
				<tr>
					<td colspan="3"><span style="color: #F02424; font-size: 18px;"><?php if(isset($_SESSION['login_error']) || !empty($_SESSION['login_error'])){if(TITLE != "Logout") echo $_SESSION['login_error']; unset($_SESSION['login_error']); } ?></span></td>
				</tr>
				<tr>
					<td>Username</td>
					<td>:</td>
					<td><input type="text" size="18" class="field" name="username" id="login_username" placeholder="Username" /></td>
				</tr>
				<tr>
					<td>Password</td>
					<td>:</td>
					<td><input type="password" size="18" class="field" name="password" placeholder="Password"/></td>
				</tr>
				<tr>
					<td><input type="submit" id="the_login_button" class="button_style" value="Go!" /></td>
					<td></td>
					<td><a href="register.php" class="new_user">New User?</a></td>
				</tr>
			</table>
			<?php
				function curPageName() {
					return substr($_SERVER["SCRIPT_NAME"], strrpos($_SERVER["SCRIPT_NAME"], "/") + 1);
				}
				echo '<input type="hidden" name="page" value="'.curPageName().'" />';
			?>
    	</form>
	</fieldset>
</div><!-- END login -->