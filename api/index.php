<?php
header('Access-Control-Allow-Origin: *');
$servername = "localhost";
$user = "root";
$dbpassword = "cs160team2%";
$db = "BankingDB";

$conn = new mysqli($servername, $user, $dbpassword, $db);
if($conn->connect_error) die($conn->connect_error);

if(isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['street']) && isset($_POST['apartment_number']) && isset($_POST['city']) 
    && isset($_POST['stateInCountry']) && isset($_POST['zipCode']) && isset($_POST['phone']) && isset($_POST['userEmail']) && isset($_POST['userName']) && isset($_POST['userPassword']) && isset($_POST['ssn'])
   ){
    $first_name = mysql_entities_fix_string($conn, $_POST['first_name']);
    $last_name = mysql_entities_fix_string($conn, $_POST['last_name']);
    $phone = mysql_entities_fix_string($conn, $_POST['phone']);
   $email = mysql_entities_fix_string($conn, $_POST['userEmail']);
    $username = mysql_entities_fix_string($conn, $_POST['userName']);
    $password = mysql_entities_fix_string($conn, $_POST['userPassword']);
    $ssn = mysql_entities_fix_string($conn, $_POST['ssn']);
    $street = mysql_entities_fix_string($conn, $_POST['street']);
    $apartment_number = mysql_entities_fix_string($conn, $_POST['apartment_number']);
    $city = mysql_entities_fix_string($conn, $_POST['city']);
    $state = mysql_entities_fix_string($conn, $_POST['stateInCountry']);
    $zip_code = mysql_entities_fix_string($conn, $_POST['zipCode']);
    $salt1 = "qm&h*";
    $salt2 = "pg!@";

    //if($password == $confirmPassword){
//	    $query = "SELECT COUNT(*) FROM customer WHERE username = '$username'";
//	    $result = $conn->query($query);
//          $rows = $result->fetch_array(MYSQLI_NUM)[0];

//	    if($rows == 0){
		    //Input address
		    $query = "INSERT INTO address(street, city, state, zip_code) 
			    VALUES('$street', '$city', '$state', '$zip_code')";
		    $result = $conn->query($query);
		    
		    
		    //Query address_id
		    $query =  "Select address_id from address where street = '$street' and city = '$city' and state = '$state' and zip_code = '$zip_code'";
		    $result = $conn->query($query);
		    $row = $result->fetch_array();
		    $addressId = $row['address_id'];    
		    
		    // Input new Customer
		    $token = hash('ripemd128', "$salt1$password$salt2");
		    $query2 = "Insert into customer(username, password, first_name, last_name, email, phone, ssn, salt1, salt2, bank_manager_manager_id, address_address_id)
        values('$username', '$token', '$first_name', '$last_name', '$email', '$phone', '$ssn', '$salt1', '$salt2', '1', '$addressId')";
		$result = $conn->query($query2);

//	}
//	else{
//		echo "Username already in database";
//	}
 // }
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
