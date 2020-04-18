<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');

    
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

if (isset($_POST['id']) && isset($_POST['transtype']) && isset($_POST['acctype']) && isset($_POST['acct_num']) && isset($_POST['receiver']) && isset($_POST['amount'])){

     $id = mysql_entities_fix_string($conn, $_POST['id']);
     $acctype = mysql_entities_fix_string($conn, $_POST['acctype']);
     $acct_num = mysql_entities_fix_string($conn, $_POST['acct_num']);
     $receiver = mysql_entities_fix_string($conn, $_POST['receiver']);
     $amount = mysql_entities_fix_string($conn, $_POST['amount']);
     $transtype = mysql_entities_fix_string($conn, $_POST['transtype']);
    
    $routing_vail = 0;
    
    if($transtype == 'external')
    {
        if(isset($_POST['routing']))
        {
            $routing_vail = 1;
            $routing = mysql_entities_fix_string($conn, $_POST['routing']);
        }else
        {
            echo "No routing number entered";
        }
    }else
    {
        $routing_vail = 1;
        
    }
    
    
    if($routing_vail == 1)
    {
        $query = "SELECT * FROM bank_account WHERE customer_customer_id = '$id' AND account_type = '$acctype'";
        $result = $conn->query($query);
        $result->data_seek(0);
        $row = $result->fetch_array(MYSQLI_NUM);
        if($result->num_rows == 0){
            
            echo "The account type you seleted does not exsist!";
        }else
        {
            if($amount>$row[2])
            {
                echo "The transfer amount excceds available balance, Please trasnfer a smaller amount!";
            }else
            {
                if($transtype == 'external'){
                    $query2 = "INSERT INTO transaction (transaction_id, routing_number, recipient, recipient_account_num, transaction_type, amount, date, bank_account_account_id) VALUES (NULL,'$routing','$receiver','$acct_num',$transtype','$amount',current_timestamp(),'$row[0]')";
                    echo "external transfer";
                    
                }
                if($transtype == 'internal'){
                    
                    $query2 = "INSERT INTO transaction (transaction_id, routing_number, recipient, recipient_account_num, transaction_type, amount, date, bank_account_account_id) VALUES (NULL, NULL,'$receiver','$acct_num','$transtype','$amount',current_timestamp(),'$row[0]');";
                    $query2 .= "UPDATE bank_account SET balance = balance - $amount WHERE bank_account.account_id = '$row[0]';";
                    $query2 .= "UPDATE bank_account SET balance = balance + $amount WHERE bank_account.account_id = '$acct_num';";
                }
                
                $conn->multi_query($query2);
                
            }
        }
    }
    
}

$conn->close();
function mysql_entities_fix_string($conn, $string){
    return htmlentities(mysql_fix_string($conn, $string));
}

function mysql_fix_string($conn, $string){
    if(get_magic_quotes_gpc()) $string = stripslashes($string);
        return $conn->real_escape_string($string);
}



?>
