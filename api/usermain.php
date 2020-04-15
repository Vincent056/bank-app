<?php

header('Access-Control-Allow-Origin: *');
$servername = "localhost";
$user = "root";
$password = "cs160team2%";
$db = "BankingDB";

$conn = new mysqli($servername, $user, $password, $db) or die("Connect failed: %s\n".$conn->error);
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

