<?php
    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

if(isset($_POST['zipCode']) && isset($_POST['ssn']) && isset($_POST['userName']) && isset($_POST['userPassword']) && isset($_POST['userConfirmPassword'])){

    $zip_code = mysql_entities_fix_string($conn, $_POST['zipCode']);
    $ssn = mysql_entities_fix_string($conn, $_POST['ssn']);
    $username = mysql_entities_fix_string($conn, $_POST['userName']);
	$password = mysql_entities_fix_string($conn, $_POST['userPassword']);
	$confirmPassword = mysql_entities_fix_string($conn, $_POST['userConfirmPassword']);
	$salt1 = uniqid();
	$salt2 = uniqid();

	if($password == $confirmPassword){
        // Check if user is in database
        $query = "SELECT address_id, customer_id FROM address, customer 
                  WHERE address_address_id = address_id 
                  AND zip_code = '$zip_code' 
                  AND ssn = '$ssn'
                  AND username = '$username'";
        $result = $conn->query($query);
        $row = $result->fetch_array();
        $customerId = $row['customer_id'];

        $token = hash('ripemd128', "$salt1$password$salt2");

        $query2 = "UPDATE customer SET customer.password = '$token' WHERE customer_id = '$customerId'";
        $result = $conn->query($query2);
			
		$json = array(
				"pwdCreated" => TRUE
		);

		echo json_encode($json);
	}
	else{
        $json = array(
            "pwdCreated" => FALSE
        );
        echo json_encode($json);
	}
}

$conn->close();

function mysql_entities_fix_string($conn, $string){
    return htmlentities(mysql_fix_string($conn, $string));
}	

function mysql_fix_string($conn, $string){
    if(get_magic_quotes_gpc()) $string = stripslashes($string);
	return $conn->real_escape_string($string);
}

?>