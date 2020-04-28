<?php
    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

    if(isset($_POST['acc_id']) && isset($_POST['amount']) && isset($_POST['filename']) ){
        $acc_id = mysql_entities_fix_string($conn, $_POST['acc_id']);
        $amount = mysql_entities_fix_string($conn, $_POST['amount']);
        $filename = mysql_entities_fix_string($conn, $_POST['filename']);

        $amount = floatval($amount);
                
        $query =  "SELECT COUNT(*) FROM bank_account WHERE account_id = '$acc_id'";
        $result = $conn->query($query);
        $rows = $result->fetch_array(MYSQLI_NUM)[0];
        if($rows == 0){
            //account does not exist
            $id = 0;
            echo json_encode(strval($id));
        }
        else{
            $query = "INSERT into transaction(transaction_type, amount, filename, date, bank_account_account_id) 
                        values('Deposit', $amount, '$filename', sysdate(), '$acc_id')";
            $result = $conn->query($query);

            //Update account
            $query = "UPDATE bank_account set balance = balance + $amount where account_id = '$acc_id'";
            $result = $conn->query($query);
            //$result->close();
            
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