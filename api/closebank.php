<?php

require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

$conn = new mysqli($servername, $user, $password, $db) or die("Connect failed: %s\n".$conn->error);

if (isset($_POST['acc_id'])){
    $acc_id = mysql_entities_fix_string($_POST['acc_id']);
    $query = 
            "DELETE FROM bank_account WHERE account_id = '$acc_id'";
    $result = $conn->query($query);
   
    if(!$result) die("Database access failed:" .$conn->error);
    else echo "deleted";

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

