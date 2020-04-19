<?php
    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

    if(isset($_POST['acc_id']) && isset($_POST['amount']) && isset($_POST['type']) ){
        $acc_id = mysql_entities_fix_string($conn, $_POST['acc_id']);
        $amount = mysql_entities_fix_string($conn, $_POST['amount']);
        $type = mysql_entities_fix_string($conn, $_POST['type']);

        $query =  "SELECT COUNT(*) FROM bank_account WHERE account_id = '$acc_id'";
        $result = $conn->query($query);
        $rows = $result->fetch_array(MYSQLI_NUM)[0];
        if($rows == 0){
            //account does not exist
            $id = 0;
            echo json_encode(strval($id));
        }
        else{

            if($type == 'deposit'){
                $query = "INSERT into transaction(transaction_type, amount, date, bank_account_account_id)  values('deposit', '$amount', sysdate(), '$acc_id')";
                $result = $conn->query($query);

                //Update account
                $query = "UPDATE bank_account set balance = balance + '$amount' where account_id = '$acc_id'";
                $result = $conn->query($query);
            }
            elseif($type == 'withdraw'){
                //Withdraw
                $query =  "SELECT balance FROM bank_account WHERE bank_account_id = '$acc_id'";
                $result = $conn->query($query);
                $row = $result->fetch_array();
                $balance = $row['balance'];

                if($balance - $amount < 0){
                    echo "Not enough funds to withdraw set amount";
                    //return
                    $id = 0;
                    echo json_encode(strval($id));
                }
                else{
                    $query = "INSERT into transaction(transaction_type, amount, date, bank_account_account_id)  
                    values('withdraw', '$amount', sysdate(), '$acc_id')";
                    $result = $conn->query($query);

                    //Update balance value by subtracting the amount value specified by user
                    $query = "UPDATE bank_account SET balance = balance - '$amount' WHERE bank_account_id = '$acc_id'";
                    $result = $conn->query($query);
                }
            }
        }
    }

    function mysql_entities_fix_string($conn, $string){
        return htmlentities(mysql_fix_string($conn, $string));
    }
    function mysql_fix_string($conn, $string){
        if(get_magic_quotes_gpc()) $string = stripslashes($string);
            return $conn->real_escape_string($string);
    }
?>