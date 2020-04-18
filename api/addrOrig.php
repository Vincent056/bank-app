<?php
header('Access-Control-Allow-Origin: *');

include 'db_connection.php';

$conn = OpenCon();

$street =  mysql_entities_fix_string($conn, $_POST['street']);
$aptNumber = mysql_entities_fix_string($conn, $_POST['aptNumber']);
$city = mysql_entities_fix_string($conn, $_POST['city']);
$state = mysql_entities_fix_string($conn, $_POST['stateInCountry']);
$zipCode = mysql_entities_fix_string($conn, $_POST['zipCode']);
		
$userQuery = "INSERT INTO address (street, apartment_number, city, state, zip_code) VALUES ('$street', '$aptNumber', '$city', '$state', '$zipCode')";
		
if(mysqli_query($conn, $userQuery)){
	echo "New record created successfully";
}else{
	echo "Error: ".$userQuery."<br>".mysqli_error($conn);
}
	
CloseCon($conn);

function mysql_entities_fix_string($conn, $string){
    return htmlentities(mysql_fix_string($conn, $string));
}	

function mysql_fix_string($conn, $string){
    if(get_magic_quotes_gpc()) $string = stripslashes($string);
	return $conn->real_escape_string($string);
}


?>
