<?php
    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);
if(isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['street']) && isset($_POST['city']) && isset($_POST['stateInCountry']) && isset($_POST['zipCode']) && isset($_POST['phone']) && isset($_POST['userEmail']) && isset($_POST['userName']) && isset($_POST['userPassword']) && isset($_POST['userConfirmPassword']) && isset($_POST['ssn'])){

	$first_name = mysql_entities_fix_string($conn, $_POST['first_name']);
	$last_name = mysql_entities_fix_string($conn, $_POST[ 'last_name']);
	$street = mysql_entities_fix_string($conn, $_POST['street']);
	$apartment_number = mysql_entities_fix_string($conn, $_POST['apartment_number']);
	$city = mysql_entities_fix_string($conn, $_POST['city']);
	$state = mysql_entities_fix_string($conn, $_POST['stateInCountry']);
	$zip_code = mysql_entities_fix_string($conn, $_POST['zipCode']);
	$phone = mysql_entities_fix_string($conn, $_POST['phone']);
	$email = mysql_entities_fix_string($conn, $_POST['userEmail']);
	$username = mysql_entities_fix_string($conn, $_POST['userName']);
	$password = mysql_entities_fix_string($conn, $_POST['userPassword']);
	$confirmPassword = mysql_entities_fix_string($conn, $_POST['userConfirmPassword']);
	$ssn = mysql_entities_fix_string($conn, $_POST['ssn']);
	$salt1 = uniqid();
	$salt2 = uniqid();

	if($password == $confirmPassword){
		// Check if user is in database
		$query = "SELECT COUNT(*) FROM customer WHERE username = '$username'";
		$result = $conn->query($query);
                $rows = $result->fetch_array(MYSQLI_NUM)[0];

		if($rows == 0){
		        //Input address
			$query = "INSERT INTO address(street, city, state, zip_code, apartment_number) VALUES('$street', '$city', '$state', '$zip_code', '$apartment_number')";
                        //$result = $conn->query($query);
			if(mysqli_query($conn, $query)){
			//if($result){
				echo "Address for user added successfully";

				//Query address_id
				$query =  "SELECT address_id FROM address 
					where street = '$street' 
					and city = '$city'
					and state = '$state' 
					and zip_code = '$zip_code' 
					and apartment_number = '$apartment_number'";

				//$result = $conn->query($query);
				$result = mysqli_query($conn, $query);
				if($result){
                        		$row = $result->fetch_array();
                        		$addressId = $row['address_id'];

					echo "Retrieved address id";
					
					$token = hash('ripemd128', "$salt1$password$salt2");
				
					$query2 = "Insert into customer(username, password, first_name, last_name, email, phone, ssn, salt1, salt2, bank_manager_manager_id, address_address_id)
				values('$username', '$token', '$first_name', '$last_name', '$email', '$phone', '$ssn', '$salt1', '$salt2', '1', '$addressId')";
				
					//$result = $conn->query($query2);
					if(mysqli_query($conn, $query2)){
						echo "Customer added successfully";
					}
					else{
						echo "Customer not added";
					}
				}
				else{
					echo "Did not retrieve address id";
				}
			}
			else{
				echo "Address for user not added";
			}
		}
		else{
			echo "Username already in database";
		}
	}
}
mysqli_close($conn);

function mysql_entities_fix_string($conn, $string){
    return htmlentities(mysql_fix_string($conn, $string));
}	

function mysql_fix_string($conn, $string){
    if(get_magic_quotes_gpc()) $string = stripslashes($string);
	return $conn->real_escape_string($string);
}

?>
