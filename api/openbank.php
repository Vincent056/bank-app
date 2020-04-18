<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');

    
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);


if (isset($_POST['id']) && isset($_POST['acctype'])){
    $id =  mysql_entities_fix_string($conn, $_POST['id']);
    $acctype =  mysql_entities_fix_string($conn, $_POST['acctype']);
    
    $query = 
            "INSERT INTO bank_account (account_type, balance, date_created,status, customer_customer_id)
            VALUES ('$acctype', 0, curdate(),'open', '$id')";
    $result = $conn->query($query);
   
    if(!$result) die("Database access failed:" .$conn->error);
    else echo "created";

    $conn->close();
   }

function mysql_entities_fix_string($conn, $string){
    return htmlentities(mysql_fix_string($conn, $string));
}	

function mysql_fix_string($conn, $string){
    if(get_magic_quotes_gpc()) $string = stripslashes($string);
	return $conn->real_escape_string($string);
}


?>


