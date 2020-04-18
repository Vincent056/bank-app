<?php
    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

    $username = mysql_entities_fix_string($conn, $_POST['username']);
    $password = mysql_entities_fix_string($conn, $_POST['password']);
    if (isset($_POST['username']) && isset($_POST['password'])){
    $query = "SELECT COUNT(*) FROM customer 
                    WHERE username = '$username'
                    AND password = '$password'";
    $result = $conn->query($query);
	if(!$result) die("Database access failed:" .$conn->error);            
    
    $result->data_seek(0);	
    $count = $result->fetch_array(MYSQLI_NUM)[0];
  
    //wrong password
	if ($count ==0){
	$id = 0;
	echo json_encode(strval($id));
    }
    else{
        $query = "SELECT customer_id FROM customer
             	 WHERE username = '$username'";
	$result = $conn->query($query);
	if(!$result) die("Database access failed:" .$conn->error);
	$result->data_seek(0);
	$id = $result->fetch_array(MYSQLI_NUM)[0];
	
	echo json_encode(strval($id));
    }
    
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
