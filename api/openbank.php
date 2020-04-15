<?php

header('Access-Control-Allow-Origin: *');
$servername = "localhost";
$user = "root";
$password = "cs160team2%";
$db = "BankingDB";

$conn = new mysqli($servername, $user, $password, $db) or die("Connect failed: %s\n".$conn->error);

if (isset($_POST['id']) && isset($_POST['acctype'])){
    $id = $_POST['id'];
    $acctype = $_POST['acctype'];
    
    $query = 
            "INSERT INTO bank_account (account_type, balance, date_created,status, customer_customer_id)
            VALUES ('$acctype', 0, curdate(),'open', '$id')";
    $result = $conn->query($query);
   
    if(!$result) die("Database access failed:" .$conn->error);
    else echo "created";

    $conn->close();
   }
?>


