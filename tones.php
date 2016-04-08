<?php
define('TITLE', 'More About Thai Tones');
define('EXTRA_CODE', ''); //extra javascript code needed for this page
define('EXTRA_CSS', ""); //extra CSS needed for this page
$breadcrumb_list = array("Home", "More About Thai Tones");
$breadcrumb_link = array("index.php", "#");
session_start();
require('template/header.inc.php');
?>
<header class="title">More About Thai Tones</header>

<p>Thai tones can be incredibly difficult to master.</p>
<p>One must follow the Thai tone rules, compiled below, to get the tones of words right.</p>
<p>Before you start this section, it is first recommended that you understand which consonants belong to which consonant class and the length of the vowels.</p>

<table class="tones">
<tr>
	<td align="center" colspan="3">Tone Rules</td>
</tr>
<tr>
	<td align="center">Middle Class Consonants</td>
	<td align="center">High Class Consonants</td>
	<td align="center">Low Class Consonants</td>
</tr>
<tr>
	<td align="center">
		<br>Word starts with a MID class consonant, has a&hellip;
		<ol class="lower_alpha">
			<li>LONG vowel and ends with a LIVE consonant or no final consonant: MID tone</li>
			<li>SHORT vowel and ends with a LIVE consonant: MID tone</li>
			<li>LONG or SHORT vowel and ends with a DEAD consonant: LOW tone</li>
			<li>SHORT vowel and has no final consonant: LOW tone</li>
		</ol>
	</td>
	<td align="center">
		Word starts with a HIGH class consonant, has a&hellip;
		<ol class="lower_alpha">
			<li>LONG or SHORT vowel and ends with a LIVE consonant or no final consonant: RISING tone</li>
			<li>SHORT vowel and ends with a LIVE consonant: RISING tone</li>
			<li>LONG or SHORT vowel and ends with a DEAD consonant: LOW tone</li>
			<li>SHORT vowel and has no final consonant: LOW tone</li>
		</ol>
	</td>
	<td align="center">
		<br>Word starts with a LOW class consonant, has a&hellip;
		<ol class="lower_alpha">
			<li>LONG vowel ends with a LIVE consonant or no final consonant: MID tone</li>
			<li>LONG vowel ends with a DEAD consonant: FALLING tone</li>
			<li>SHORT vowel and ends with a LIVE consonant: MID tone</li>
			<li>SHORT vowel and ends with a DEAD consonant or no final consonant: HIGH tone</li>
		</ol>
	</td>
</tr>
</table>

<?php require('template/footer.inc.php'); ?>