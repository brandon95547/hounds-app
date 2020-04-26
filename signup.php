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

$data = json_decode(file_get_contents('php://input'), true);

$email = isset($data['email']) && !empty($data['email']) ? $conn->escape_string($data['email']) : '';
$password = isset($data['password']) && !empty($data['password']) ? $conn->escape_string($data['password']) : '';

$sql = "select * from user where user_name = '$email' and password = md5('$password') and active = 1";

$result = $conn->query("select * from user where user_name = '$email' and password = md5('$password') and active = 1");
if($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  unset($row['password']);
}
else {
  $row = array();
}
$return = array(
  'success' => isset($row['user_name']) ? true : false,
  'user' => json_encode($row),
  'message' => isset($row['user_name']) ? 'Login Successful' : 'Account not found',
  'sql' => $sql
);

echo json_encode($return);
?>