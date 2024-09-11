<?php

header('Content-Type: text/plain');

if((@include "./connection.php") === false){
    die("-1");
}



$data = json_decode(file_get_contents('php://input'), true);

mt_srand(time());

$hash = $conn->query('SELECT `hash` FROM `hashes` WHERE i='.mt_rand(0, 99).';')->fetch_assoc()['hash'];

$txt = $data["code"].$data["mid"].$hash.$data["amt"];
$txtHash = hash('sha256', $txt);

$new = $data["mid"].$hash.$data["amt"].$data["code"];
$resHash = hash('sha256', $new);

$conn->query('INSERT INTO `handshakes` (`id`, `paise`, `response`) VALUES (NULL, "'.$data["amt"].'", "'.$resHash.'");');

$id = $conn->insert_id;

$data = array('id' => $id,'hash' => $txtHash);

echo json_encode($data);


?>