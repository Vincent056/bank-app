<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

if(isset($_POST['id']) && isset($_POST['street']) && isset($_POST['city']) && isset($_POST['stateInCountry']) && isset($_POST['zipCode']) && isset($_POST['phone']) && isset($_POST['userEmail'])){

    $street = mysql_entities_fix_string($conn, $_POST['street']);
	$city = mysql_entities_fix_string($conn, $_POST['city']);
	$state = mysql_entities_fix_string($conn, $_POST['stateInCountry']);
	$zip_code = mysql_entities_fix_string($conn, $_POST['zipCode']);
	$phone = mysql_entities_fix_string($conn, $_POST['phone']);
	$email = mysql_entities_fix_string($conn, $_POST['userEmail']);
	$id = mysql_entities_fix_string($conn, $_POST['id']);
	
    if(isset($_POST['apartment_number']))
    {
	    $apartment_number = mysql_entities_fix_string($conn, $_POST['apartment_number']);
    }else
    {
        $apartment_number = "none";
    }
    //Query address_id
    $query =  "Select * from customer where customer_id = '$id';";
    $result = $conn->query($query);
    $result->data_seek(0);
    $row = $result->fetch_array(MYSQLI_NUM);
    $addressId = $row[11];
	
    $query2 = "UPDATE address SET street = '$street', city = '$city', apartment_number = '$apartment_number', zip_code = '$zip_code' WHERE address.address_id = '$addressId';"; 
    $query2 .= "UPDATE customer SET email = '$email', phone = '$phone' WHERE customer.customer_id = $id;";
    
    $conn->multi_query($query2);
    echo "OK";
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
