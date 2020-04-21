<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);

    if (isset($_POST['id'])){
        $id = mysql_entities_fix_string($conn, $_POST['id']);

            $query = "SELECT auto_billing_id,destination,amount,start_date,end_date,day FROM automated_billing 
                    WHERE bank_account_account_id = '$id'";
             $result = $conn->query($query);
             $json_array = array();
            while($row = mysqli_fetch_assoc($result)){
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
