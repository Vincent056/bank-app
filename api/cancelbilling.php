<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

    if (isset($_POST['id'])){
         $bill_id = mysql_entities_fix_string($conn, $_POST['id']);
        
         $query = 
         "DELETE FROM automated_billing WHERE auto_billing_id = '$bill_id'";
            $result = $conn->query($query);
            echo "deleted";     
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
