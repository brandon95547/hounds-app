<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "127.0.0.1";
$username = "courtreviewadm";
$password = "cX4j9uWy6oH1";
$db = "hounds";

$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = parse_str(file_get_contents('php://input'), $dataArray);

$email = isset($dataArray['email']) && !empty($dataArray['email']) ? $conn->escape_string($dataArray['email']) : '';
$password = isset($dataArray['password']) && !empty($dataArray['password']) ? $conn->escape_string($dataArray['password']) : '';

$result = $conn->query("select * from user where user_name = '$email' and password = md5('$password') and active = 1");
if($result->num_rows > 0) {
  $row = $result->fetch_assoc();
}
else {
  $row = array();
}
$return = array(
  'success' => isset($row['user_name']) ? true : false,
  'user' => $row,
  'message' => isset($row['user_name']) ? 'Login Successful' : 'Login Unsuccessful'
);

echo json_encode($return);
?>