<?php
	$servername = "127.0.0.1";
	$username = "root";
	$password = "";
	$dbname = "secure_pay";

	$conn = new mysqli($servername, $username, $password, $dbname);

	
	if ($conn->connect_error) {
		die("0 Connection failed: " . $conn->connect_error);
	}
	
	function validHash($hash) {
		if (strlen($hash) !== 64) {
			return false;
		}
		
		if (ctype_xdigit($hash)) {
			return true;
		}
		
		return false;
	}
?>