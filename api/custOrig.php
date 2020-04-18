<?php
header('Access-Control-Allow-Origin: http://localhost:3000/');

include 'db_connection.php';

$conn = OpenCon();

if(isset($_POST['firstName']) && isset[$_POST

$firstName = mysql_entities_fix_string($conn, $_POST['firstName']);
$lastName = mysql_entities_fix_string($conn, $_POST[ 'lastName']);
$phone = mysql_entities_fix_string($conn, $_POST['phone']);
$email = mysql_entities_fix_string($conn, $_POST['userEmail']);
$username = mysql_entities_fix_string($conn, $_POST['userName']);
$password = mysql_entities_fix_string($conn, $_POST['userPassword']);
$ssn = mysql_entities_fix_string($conn, $_POST['ssn']);
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
				       
function mysql_entities_fix_string($conn, $string){
    return htmlentities(mysql_fix_string($conn, $string));
}	

function mysql_fix_string($conn, $string){
    if(get_magic_quotes_gpc()) $string = stripslashes($string);
	return $conn->real_escape_string($string);
}				       
				       
?>
