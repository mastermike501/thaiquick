<div class="text_require"><span>*Required fields</span></div>
<form name="register" method="POST" action="register.php" class="register_form" autocomplete="on">
	<fieldset>
		<table>
		<tr>
			<td>First Name*</td>
			<td>:</td>
			<td><input class="the_form" type="text" name="first_name" id="firstname_value" value="<?php if(isset($_POST['first_name'])){ print$_POST['first_name'];} ?>" required /></td>
		</tr>
		<tr>
			<td></td><td></td><!-- Blank columns -->
			<td><div id="one" class="hide_me"><span class="check_text" id="check_firstname" style="display: none;"></span></div></td>
		</tr>
		<tr>
			<td>Last Name</td>
			<td>:</td>
			<td><input class="the_form" type="text" name="surname" id="surname_value" value="<?php if(isset($_POST['surname'])){print $_POST['surname'];} ?>" /></td>
		</tr>
		<tr>
			<td></td><td></td><!-- Blank columns -->
			<td><div id="two" class="hide_me" style="width: 500px;"><span class="check_text" id="check_surname" style="display: none;"></span></div></td>
		</tr>
		<tr>
			<td>New Username*</td>
			<td>:</td>
			<td><input class="the_form" type="text" name="username" id="username_value" value="<?php if(isset($_POST['username'])){print $_POST['username'];} ?>" required /></td>
		</tr>
		<tr>
			<td></td><td></td><!-- Blank columns -->
			<td><div id="three" class="hide_me"><span class="check_text" id="check_username" style="display: none;"></span></div></td>
		</tr>
		<tr>
			<td>Email*</td>
			<td>:</td>
			<td><input class="the_form" type="email" name="email" value="<?php if(isset($_POST['email'])){print $_POST['email'];} ?>" required /></td>
		</tr>
		<tr>
			<td></td><td></td><!-- Blank columns -->
			<td><div id="four" class="hide_me"><span class="check_text" id="validate_email" style="display: none;"></span></div></td>
		</tr>
		<tr>
			<td>Reconfirm Email*</td>
			<td>:</td>
			<td><input class="the_form" type="email" name="email_confirm" autocomplete="off" required /></td>
		</tr>
		<tr>
			<td></td><td></td><!-- Blank columns -->
			<td><div id="five" class="hide_me"><span class="check_text" id="check_email" style="display: none;"></span></div></td>
		</tr>
		<tr>
			<td>Password*</td>
			<td>:</td>
			<td><input class="the_form" type="password" name="pwd" autocomplete="off" required /></td>
		</tr>
		<tr>
			<td></td><td></td><!-- Blank columns -->
			<td><div id="six" class="hide_me"><span class="check_text check_pw" style="display: none;"></span></div></td>
</tr>
		<tr>
			<td>Reconfirm New Password*</td>
			<td>:</td>
			<td><input class="the_form" type="password" name="pwd_confirm" autocomplete="off" required /></td>
		</tr>
		<tr>
			<td></td><td></td><!-- Blank columns -->
			<td><div id="seven" class="hide_me"><span class="check_text check_pw2" style="display: none;"></span></div></td>
		</tr>
		<tr>
			<td><input type="submit" class="button_style" value="Go!" /></td>
		</tr>
		<input type="hidden" name="submitted" value="true" />
	</table>
	</fieldset>
</form>