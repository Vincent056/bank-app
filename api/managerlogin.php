<?php
    header('Access-Control-Allow-Origin: *');
    $servername = "localhost";
    $user = "root";
    $password = "cs160team2%";
    $db = "BankingDB";
    
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);
    
        if(isset($_POST['username']) && isset($_POST['password'])){
            $Username = mysql_entities_fix_string($conn, $_POST['username']);
            $Password = mysql_entities_fix_string($conn, $_POST['password']);

            $query = "SELECT COUNT(*) FROM bank_manager 
                        WHERE username = '$Username' and password = '$Password'";

            $result = $conn->query($query);
            $rows = $result->fetch_array(MYSQLI_NUM)[0];
            if($rows == 0){
                echo "Incorrect Password and/or Username";
            }
            else{  
                $query = "SELECT manager_id FROM bank_manager 
                WHERE username = '$Username'";
                $result = $conn->query($query); 
                $row = $result->fetch_array();
                $id = $row['manager_id'];       
                $json = array
                    (
                        "id" => $id
                    );
            
                echo json_encode($json);
                
            }
        }
    
?>
