<?php
	$cookie_name="user";
	$output = array();
	$output['user'] = 'john1234';
	$output['password'] = '123456';
	if(isset($_COOKIE[$cookie_name])) {
		$output['cookie'] = $_COOKIE[$cookie_name];
	}
	echo json_encode($output);
?>
