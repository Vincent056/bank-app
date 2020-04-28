<?php
require_once 'login.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$conn = new mysqli($servername, $user, $password, $db);
if ($conn->connect_error) die($conn->connect_error);

if (isset($_POST['acc_id']) && isset($_POST['amount'])) {
    $acc_id = mysql_entities_fix_string($conn, $_POST['acc_id']);
    $amount = mysql_entities_fix_string($conn, $_POST['amount']);
    $file = addslashes(file_get_contents($_FILES['check']['tmp_name']));
    echo json_decode($file);
    $amount = floatval($amount);

    $query = "INSERT into transaction(transaction_type, amount, file, date, bank_account_account_id) 
                        values('Deposit', $amount, '$file', sysdate(), '$acc_id')";
    $result = $conn->query($query);
    if (!$result) echo json_encode('ERR');
    else {
        //Update account
        $query = "UPDATE bank_account set balance = balance + $amount where account_id = '$acc_id'";
        $result = $conn->query($query);
        if (!$result) echo json_encode('ERR');
        else echo json_encode('OK');
    }
    //$result->close();


    $conn->close();
}

function mysql_entities_fix_string($conn, $string)
{
    return htmlentities(mysql_fix_string($conn, $string));
}
function mysql_fix_string($conn, $string)
{
    if (get_magic_quotes_gpc()) $string = stripslashes($string);
    return $conn->real_escape_string($string);
}
