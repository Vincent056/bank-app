<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

//$_POST = json_decode(file_get_contents("php://input"),true);
if (isset($_POST['id'])){
    $id = intval($_POST['id']);
    $query = "SELECT first_name, last_name, account_id, account_type, balance, status
    FROM bank_account LEFT OUTER JOIN customer
           ON customer.customer_id = bank_account.customer_customer_id
           WHERE customer.customer_id = $id"; 

    $result = $conn->query($query);
    if(!$result) die("Database access failed:" .$conn->error);
    
    $json_array = array();
    while($row = mysqli_fetch_assoc($result)){
	$json_array[] = $row;
    }
    echo json_encode($json_array); 
    
    $result->close();
    $conn->close();
    }
?>

