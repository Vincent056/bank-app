<?php
    require_once 'login.php';
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");
    $conn = new mysqli($servername, $user, $password, $db);
    if($conn->connect_error) die($conn->connect_error);

    if(isset($_POST['attribute']) && isset($_POST['input'])){
            
        $input = mysql_entities_fix_string($conn, $_POST['input']);
        $attribute = mysql_entities_fix_string($conn, $_POST['attribute']);

        $query = "SELECT customer_id, address_id, username, first_name, last_name, street, apartment_number, city, state, zip_code, email, phone 
        FROM customer INNER JOIN address ON customer.address_address_id = address.address_id AND $attribute = '$input'";
    
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