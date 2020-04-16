<?php
    header('Access-Control-Allow-Origin: *');
    $servername = "localhost";
    $user = "root";
    $password = "cs160team2%";
    $db = "BankingDB";

    $conn = new mysqli($servername, $user, $password, $db) or die("Connect failed: %s\n".$conn->error);

    $username = $_POST['username'];
    $password = $_POST['password'];
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
?>
