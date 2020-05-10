<?php
require_once 'login.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$conn = new mysqli($servername, $user, $password, $db);
if ($conn->connect_error) die($conn->connect_error);

if (isset($_POST['olduserPassword']) && isset($_POST['userPassword']) && isset($_POST['userConfirmPassword']) && isset($_POST['userName'])) {
    $username = mysql_entities_fix_string($conn, $_POST['userName']);
    $password = mysql_entities_fix_string($conn, $_POST['userPassword']);
    $confirmPassword = mysql_entities_fix_string($conn, $_POST['userConfirmPassword']);
    $opassword = mysql_entities_fix_string($conn, $_POST['olduserPassword']);

    // Get user's password and salts to check with inputted password
    $query = "SELECT password, salt1, salt2 FROM customer
			  WHERE username = '$username'";
    $result = $conn->query($query);
    $row = $result->fetch_array();
    $pass = $row['password'];
    $salt1 = $row['salt1'];
    $salt2 = $row['salt2'];

    // Hash inputted password
    $token = hash('ripemd128', "$salt1$opassword$salt2");
    echo json_decode($token);
    echo json_encode($pass);
    // Check if hashed passwords match
    if ($token == $pass) {

        if ($password == $confirmPassword) {

            $query = "SELECT salt1, salt2 FROM customer
                    WHERE username = '$username'";
            $result = $conn->query($query);
            $row = $result->fetch_array();
            $salt1 = $row['salt1'];
            $salt2 = $row['salt2'];

            $token = hash('ripemd128', "$salt1$password$salt2");

            $query2 = "UPDATE customer SET customer.password = '$token' WHERE customer_id = '$customerId'";
            $result = $conn->query($query2);

            echo json_encode('OK');
        } else { //password does not match with confirmed password
            echo json_encode('NOT MATCHING');
        }
    } else echo json_encode('WRONG PASS');
}
$conn->close();

function mysql_entities_fix_string($conn, $string)
{
    return htmlentities(mysql_fix_string($conn, $string));
}

function mysql_fix_string($conn, $string)
{
    if (get_magic_quotes_gpc()) $string = stripslashes($string);
    return $conn->real_escape_string($string);
}
