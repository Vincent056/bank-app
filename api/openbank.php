<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');

    
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);


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


