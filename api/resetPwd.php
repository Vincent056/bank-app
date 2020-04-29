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

	if($password == $confirmPassword){
        // Check if user is in database
        $query = "SELECT address_id, customer_id FROM address, customer 
                  WHERE address_address_id = address_id 
                  AND zip_code = '$zip_code' 
                  AND ssn = '$ssn'
                  AND username = '$username'";
        $result = $conn->query($query);
        // $rows = $result->fetch_array(MYSQLI_NUM)[0];
        // echo $rows;
        if(mysqli_num_rows($result) != 0){
            $row = $result->fetch_array();
            $customerId = $row['customer_id'];

            $query = "SELECT salt1, salt2 FROM customer
                    WHERE username = '$username'";
            $result = $conn->query($query);
            $row = $result->fetch_array();
            $salt1 = $row['salt1'];
            $salt2 = $row['salt2'];

            $token = hash('ripemd128', "$salt1$password$salt2");

            $query2 = "UPDATE customer SET customer.password = '$token' WHERE customer_id = '$customerId'";
            $result = $conn->query($query2);
                
            $json = array(
                    "userFound" => TRUE,
                    "pwdCreated" => TRUE
            );
        }
        else{
            $json = array(
                "userFound" => FALSE,
                "pwdCreated" => FALSE
            );
        }

		echo json_encode($json);
	}
	else{
        $json = array(
            "userFound" => FALSE,
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