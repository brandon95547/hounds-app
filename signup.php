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
$success = true;
$message = "";
$row = array();

$email = isset($data['email']) && !empty($data['email']) ? $conn->escape_string($data['email']) : '';
$password = isset($data['password']) && !empty($data['password']) ? $conn->escape_string($data['password']) : '';
$createAccount = isset($data['createAccount']) && !empty($data['createAccount']) ? intval($data['createAccount']) : '';

$sql = "select * from user where user_name = '$email' and password = md5('$password') and active = 1";

$result = $conn->query("select * from user where user_name = '$email' and password = md5('$password') and active = 1");

// we are on the login page
if($createAccount == 0) {
  // match found, logging in
  if($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    unset($row['password']);
    $message = "Login Successful";
  }
  else {
    $row = array();
    $success = false;
    $message = "Login Unsuccessful";
  }
}
else {
  // we are on the account creation page
  if($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    unset($row['password']);
    $message = "Account Retrieved";
  }
  else {
    $emailResult = $conn->query("select * from user where user_name = '$email' and active = 1");
    if($emailResult->num_rows > 0) {
      $success = false;
      $message = "Email address is already taken";
    }
    else {
      $conn->query("insert into user (user_name, password, active, creation_date) values ('$email', md5('$password'), 1, NOw())");
      $insertId = $conn->insert_id;
      $userResult = $conn->query("select * from user where user_id = $insertId and active = 1");
      if($userResult->num_rows > 0) {
        $row = $userResult->fetch_assoc();
        unset($row['password']);
        $message = "Account Created";
      }
      else {
        $message = "Account Creation failure";
        $success = false;
      }
    }
  }
}

$return = array(
  'success' => $success,
  'user' => json_encode($row),
  'message' => $message,
  'sql' => $sql
);

echo json_encode($return);
?>