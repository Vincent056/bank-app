<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

    if (isset($_POST['id'])&&isset($_POST['end'])&&isset($_POST['dayinmonth'])&&isset($_POST['reciver_acc'])&&isset($_POST['amount'])){
        
         $id = mysql_entities_fix_string($conn, $_POST['id']);
         $end = mysql_entities_fix_string($conn, $_POST['end']);
         $reciver_acc = mysql_entities_fix_string($conn, $_POST['reciver_acc']);
         $amount = mysql_entities_fix_string($conn, $_POST['amount']);
         $dayinmonth = mysql_entities_fix_string($conn, $_POST['dayinmonth']);
        
            $query1 = "INSERT INTO automated_billing (destination, amount, start_date, end_date, day, bank_account_account_id) 
            VALUES ('$reciver_acc', '$amount', sysdate(),'$end','$dayinmonth','$id');";
             $conn->query($query1);
            echo "Added!";
                  
    }
    else echo "Missing Info!";
    
    $conn->close();


function mysql_entities_fix_string($conn, $string){
    return htmlentities(mysql_fix_string($conn, $string));
}

function mysql_fix_string($conn, $string){
    if(get_magic_quotes_gpc()) $string = stripslashes($string);
        return $conn->real_escape_string($string);
}



?>
