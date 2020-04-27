<?php
    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

    if(isset($_POST['attribute']) && isset($_POST['input']) && isset($_POST['man_id'])){
            
        $input = mysql_entities_fix_string($conn, $_POST['input']);
        $attribute = mysql_entities_fix_string($conn, $_POST['attribute']);
        $man_id = mysql_entities_fix_string($conn, $_POST['man_id']);
        if($attribute == "1")
        {
            $input == "1";
        }
        $query = "SELECT customer.customer_id as customer_id, address_id, username, first_name, last_name, street, apartment_number, city, state, zip_code, email, phone, balance
        FROM customer LEFT OUTER JOIN address ON customer.address_address_id = address.address_id LEFT OUTER JOIN balance_total ON customer.customer_id = balance_total.customer_id
        WHERE $attribute = '$input' AND bank_manager_manager_id = '$man_id';";
    
        $result = $conn->query($query);
        if(!$result) die("Database access failed:" .$conn->error);

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
