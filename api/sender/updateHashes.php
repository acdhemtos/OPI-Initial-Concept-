<?php

header('Content-Type: text/plain');

if((@include "../connection.php") === false){
    die("0 failed to include connection");
}


$hashes = json_decode(file_get_contents('php://input'), true);

if(!(json_last_error() === JSON_ERROR_NONE)){
	die("0 Invalid JSON DATA");
}

if(count($hashes) != 100){
	die("0 Invalid Length");
}

foreach($hashes as $hash){
	if(! validHash($hash)){
		die("0 Invalid Hash".$hash);
	}
}

try{
	for ($i = 0; $i < 100; $i++) {
		$conn->query('UPDATE hashes SET hash = "'.$hashes[$i].'" WHERE i='.$i.';');
	}
	die("9");
}
catch(Exception $e){
	echo "1 ".$e->getMessage();
}




?>