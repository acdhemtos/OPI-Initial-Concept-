<?php

if((@include "../connection.php") === false){
    die("Failed to include connection.");
}

if (!isset($_POST['number'])) {
    die("No number received.");	
}
$number = $_POST['number'];

if (!is_numeric($number)) {
	die("Recieved Number is not Numeric.");
}

//echo "INS INTO `deposit` (`time`, `paise`) VALUES (current_timestamp(), ".$number.");";

try{
	$conn->query("INSERT INTO `deposit` (`time`, `paise`) VALUES (current_timestamp(), ".$number.");");
	die("Deposit Successfull");
}
catch(Exception $e){
	echo("Unable to Deposit.");
}
?>