<?php

require_once 'login.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$conn = new mysqli($servername, $user, $password, $db);
if ($conn->connect_error) die($conn->connect_error);

if (isset($_POST['id']) && isset($_POST['acct_num']) && isset($_POST['amount']) && isset($_POST['receiver'])) {

    $id = mysql_entities_fix_string($conn, $_POST['id']);
    $acct_num = mysql_entities_fix_string($conn, $_POST['acct_num']);
    $amount = mysql_entities_fix_string($conn, $_POST['amount']);
    $receiver = mysql_entities_fix_string($conn, $_POST['receiver']);
    $query = "SELECT balance FROM bank_account WHERE account_id = '$id'";
    $result = $conn->query($query);
    $result->data_seek(0);
    $balance = $result->fetch_array(MYSQLI_NUM)[0];

    if ($amount > $balance) {
        echo json_encode('SHORT');
    } else {
        if (isset($_POST['routing'])) { //external
            $routing = mysql_entities_fix_string($conn, $_POST['routing']);


            $trans_type = "External";
            $query2 = "INSERT INTO transaction (routing_number, recipient, recipient_account_num, transaction_type, amount, date, bank_account_account_id) 
                     VALUES ('$routing','$receiver','$acct_num','$trans_type','$amount',current_timestamp(),'$id');";
            $query2 .= "UPDATE bank_account SET balance = balance - $amount WHERE bank_account.account_id = '$id';";
            $conn->multi_query($query2);
            echo json_encode('OK');
        } else { //internal
            $query = "SELECT COUNT(*) FROM bank_account WHERE account_id='$acct_num' AND status = 'open'";
            $result = $conn->query($query);
            if (!$result) die($conn->connect_error);
            $rows = $result->fetch_array(MYSQLI_NUM)[0];
            if ($rows == 0) {
                echo json_encode('NE');
            }
            else{
            $trans_type = "Internal";

            $query2 = "INSERT INTO transaction (routing_number, recipient, recipient_account_num, transaction_type, amount, date, bank_account_account_id) 
                                VALUES (NULL,'$receiver','$acct_num','$trans_type','$amount',current_timestamp(),'$id');";
            $query2 .= "INSERT INTO transaction (routing_number, recipient, recipient_account_num, transaction_type, amount, date, bank_account_account_id) 
                                VALUES (NULL,'','$id','Received','$amount',current_timestamp(),'$acct_num');";
            $query2 .= "UPDATE bank_account SET balance = balance - $amount WHERE bank_account.account_id = '$id';";
            $query2 .= "UPDATE bank_account SET balance = balance + $amount WHERE bank_account.account_id = '$acct_num';";
            $conn->multi_query($query2);
            echo json_encode('OK');
            }
        }
    }
} else echo "Missing Info";


$conn->close();
function mysql_entities_fix_string($conn, $string)
{
    return htmlentities(mysql_fix_string($conn, $string));
}

function mysql_fix_string($conn, $string)
{
    if (get_magic_quotes_gpc()) $string = stripslashes($string);
    return $conn->real_escape_string($string);
}
