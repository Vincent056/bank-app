<?php
       require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

      
        if(isset($_POST['username']) && isset($_POST['password'])){
           
           $Username = mysql_entities_fix_string($conn, $_POST['username']); 
           $Password = mysql_entities_fix_string($conn, $_POST['password']);
            
            $query = "SELECT COUNT(*) FROM bank_manager WHERE username = '$Username' and password = '$Password'";
             
            $result = $conn->query($query);
            $rows = $result->fetch_array(MYSQLI_NUM)[0];
            if($rows == 0){
                $id = 0;
                echo json_encode(strval($id));
            }
            else{  
                $query = "SELECT manager_id FROM bank_manager WHERE username = '$Username'";
                $result = $conn->query($query); 
                $row = $result->fetch_array();
                $id = $row['manager_id'];       
                echo json_encode(strval($id));
                
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

