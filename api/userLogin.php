<?php
require_once 'login.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
$conn = new mysqli($servername, $user, $password, $db);
if ($conn->connect_error) die($conn->connect_error);


if (isset($_POST['username']) && isset($_POST['password'])) {
	$username = mysql_entities_fix_string($conn, $_POST['username']);
	$password = mysql_entities_fix_string($conn, $_POST['password']);

	// Check if user is in database
	$query = "SELECT COUNT(*) FROM customer WHERE username='$username'";
	$result = $conn->query($query);
	if (!$result) die($conn->connect_error);
	$rows = $result->fetch_array(MYSQLI_NUM)[0];
	if ($rows == 0) {
		$id = 0;
		echo json_encode(strval($id));
	} else {
		// Get user's password and salts to check with inputted password
		$query = "SELECT password, salt1, salt2 FROM customer
			  WHERE username = '$username'";
		$result = $conn->query($query);
		$row = $result->fetch_array();
		$pass = $row['password'];
		$salt1 = $row['salt1'];
		$salt2 = $row['salt2'];

		// Hash inputted password
		$token = hash('ripemd128', "$salt1$password$salt2");

		// Check if hashed passwords match
		if ($token == $pass) {
			// Authenticated
			// Get and return user's id
			$query = "SELECT customer_id FROM customer
				 WHERE username = '$username'";
			$result = $conn->query($query);
			$rowb = $result->fetch_array();
			$id = $rowb['customer_id'];
			$json = array(
				"id" => $id,
				"exists" => 1
			);
			echo json_encode(strval($id));
		} else {
			$id = 0;
			echo json_encode(strval($id));
		}
	}
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

function utf8ize($d)
{
	if (is_array($d) || is_object($d))
		foreach ($d as &$v) $v = utf8ize($v);
	else
		return utf8_encode($d);
	return $d;
}
