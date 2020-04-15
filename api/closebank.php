<?php

header('Access-Control-Allow-Origin: *');
$servername = "localhost";
$user = "root";
$password = "cs160team2%";
$db = "BankingDB";

$conn = new mysqli($servername, $user, $password, $db) or die("Connect failed: %s\n".$conn->error);

if (isset($_POST['acc_id'])){
    $acc_id = $_POST['acc_id'];
    $query = 
            "DELETE FROM bank_account WHERE account_id = '$acc_id'";
    $result = $conn->query($query);
   
    if(!$result) die("Database access failed:" .$conn->error);
    else echo "deleted";

    $conn->close();
   }
?>

