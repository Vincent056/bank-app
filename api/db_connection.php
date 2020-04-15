<?php
function OpenCon(){
	$servername = "localhost";
	$user = "root";
	$password = "cs160team2%";
	$db = "BankingDB";

	$conn = new mysqli($servername, $user, $password, $db) or die("Connect failed: %s\n".$conn->error);

	return $conn;
}

function CloseCon($conn){
	$conn->close();
}

?>
