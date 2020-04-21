<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    
    $today = date('Y-m-d');
    echo date("Y-m-d h:i:sa") . ": script started";
    echo "\r\n";
    echo date("j") . " of the month";
    $query = "SELECT * FROM automated_billing WHERE start_date <= '$today' AND end_date >= '$today' AND day = 'date("j")'AND last_date < '$today' or last_date is NULL;";
    $result = $conn -> query($query);
    if (!$result) die (mysql_fatal_error());
    $rows = $result->num_rows;
    $query2 = "";
    for ($j = 0 ; $j < $rows ; ++$j)
    {
        
        $result->data_seek($j);
        $row = $result->fetch_array(MYSQLI_NUM);
        echo  date("Y-m-d h:i:sa") . ": Transfer From $row[6] to $row[1] at amount of $$row[2]";
        $query2 .= "INSERT INTO transaction (transaction_id, routing_number, recipient, recipient_account_num, transaction_type, amount, date, bank_account_account_id) VALUES (NULL, NULL, NULL, '$row[1]', 'automated_billing', '$row[2]', current_timestamp(), '$row[6]');";
        $query2 .= "UPDATE bank_account SET balance = balance - $row[2] WHERE bank_account.account_id = '$row[6]';";
        $query2 .= "UPDATE bank_account SET balance = balance + $row[2] WHERE bank_account.account_id = '$row[1]';";
        $query2 .= "UPDATE automated_billing SET last_date = '$today' WHERE auto_billing_id = '$row[0]';";
        
        echo "\r\n";
    }
        $conn->multi_query($query2);

    $result->close();
    $conn->close();
    function mysql_entities_fix_string($conn, $string){
        return htmlentities(mysql_fix_string($conn, $string));
    }

    function mysql_fix_string($conn, $string){
        if(get_magic_quotes_gpc()) $string = stripslashes($string);
        return $conn->real_escape_string($string);
}



?>
