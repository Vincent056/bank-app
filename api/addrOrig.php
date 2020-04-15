<?php
header('Access-Control-Allow-Origin: *');

include 'db_connection.php';

$conn = OpenCon();

$street = $_POST['street'];
$aptNumber = $_POST['aptNumber'];
$city = $_POST['city'];
$state = $_POST['stateInCountry'];
$zipCode = $_POST['zipCode'];
		
$userQuery = "INSERT INTO address (street, apartment_number, city, state, zip_code) VALUES ('$street', '$aptNumber', '$city', '$state', '$zipCode')";
		
if(mysqli_query($conn, $userQuery)){
	echo "New record created successfully";
}else{
	echo "Error: ".$userQuery."<br>".mysqli_error($conn);
}
	
CloseCon($conn);
?>
