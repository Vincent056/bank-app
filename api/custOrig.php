<?php
header('Access-Control-Allow-Origin: http://localhost:3000/');

include 'db_connection.php';

$conn = OpenCon();

if(isset($_POST['firstName']) && isset[$_POST

$firstName = $_POST['firstName'];
$lastName = $_POST[ 'lastName'];
$phone = $_POST['phone'];
$email = $_POST['userEmail'];
$username = $_POST['userName'];
$password = $_POST['userPassword'];
$ssn = $_POST['ssn'];
$salt1 = uniqid();
$salt2 = uniqid();
}

$userQuery = "INSERT INTO customer (first_name, last_name, phone, email, username, password, ssn, salt1, salt2) VALUES ('$firstName', '$lastName', '$phone', '$email', '$username', '$password', '$ssn', '$salt1', '$salt2')";

if(mysqli_query($conn, $userQuery)){
	echo "New record created successfully";
}
else{
	echo "Error: ".$userQuery."<br>".mysqli_error($conn);
}
CloseCon($conn);
?>
