<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");

    $key = "AIzaSyDd8m06Lceut97wZDlpKXejybNGXnjqbyM";

    $json = array(
        "key" => $key
    );

    echo json_encode($json);

?>