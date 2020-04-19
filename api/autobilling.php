<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

    if (isset($_POST['id'])&&isset($_POST['start'])&&isset($_POST['end'])&&isset($_POST['reciver_acc'])&&isset($_POST['amount'])){
        
         $id = mysql_entities_fix_string($conn, $_POST['id']);
         $start = mysql_entities_fix_string($conn, $_POST['start']);
         $end = mysql_entities_fix_string($conn, $_POST['end']);
         $reciver_acc = mysql_entities_fix_string($conn, $_POST['reciver_acc']);
         $amount = mysql_entities_fix_string($conn, $_POST['amount']);
         
         $query = "SELECT * FROM bank_account WHERE account_id = '$id' AND account_type = 'checking'";
         $result = $conn->query($query);
         $result->data_seek(0);
         $row = $result->fetch_array(MYSQLI_NUM);
         if($result->num_rows == 0){
            
            echo "You need a checking account to setup the automated billing!";
            
        }else
        {
            $query1 = "INSERT INTO automated_billing (destination, amount, start_date, end_date, bank_account_account_id) VALUES ('$reciver_acc', '$amount', '$start','$end', '$row[0]');";
            echo "Added!";
        }          
    }
    else echo "Missing Info!";
    
    
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
