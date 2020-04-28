<?php
     require_once 'login.php';
     header('Access-Control-Allow-Origin: *');
     header('Access-Control-Allow-Methods: GET, POST');
     header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

    if (isset($_POST['acc_id'])){
        $acc_id = mysql_entities_fix_string($conn, $_POST['acc_id']);
        //Query for bank_account info
        $query = "SELECT account_type, balance, date_created, balance
        FROM bank_account WHERE account_id = '$acc_id'";   
        $result = $conn->query($query);
        if(!$result) die("Database access failed:" .$conn->error);
        
        $json_array = array();
        $row = mysqli_fetch_assoc($result);
        $json_array[] = $row;

        //Query for account's transactions
        $query = "SELECT transaction_id,date,recipient,recipient_account_num,transaction_type,amount
                 FROM transaction WHERE bank_account_account_id = '$acc_id'";
        $result = $conn->query($query);
        if(!$result) die("Database access failed:" .$conn->error);
        while($row = mysqli_fetch_assoc($result)){
            echo json_encode($row);
            $json_array[] = $row;
        }

        echo json_encode($json_array); 
        
        $result->close();
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