<?php

    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);

    if (isset($_POST['id'])){
        
         $id = mysql_entities_fix_string($conn, $_POST['id']);
         $query = "SELECT account_type FROM bank_account 
                WHERE bank_account_account_id = '$id'";
        $result = $conn->query($query);
        $result->data_seek(0);
        $acc_type = $result->fetch_array(MYSQLI_NUM)[0];
       
        if ($acc_type == 'saving'){
            echo "You need a checking account to setup the automated billing!";
        }
        else{
            $query = "SELECT * FROM automated_billing 
                    WHERE bank_account_account_id = '$id'";
             $result = $conn->query($query);
             $json_array = array();
            while($row = mysqli_fetch_assoc($result)){
	            $json_array[] = $row;
            }   
         echo json_encode($json_array);
        }
    
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
