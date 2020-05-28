<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require "vendor/autoload.php";
require "settings.php";

$servername = "127.0.0.1";
$username = $sqlUser;
$password = $sqlPass;

$conn = new mysqli($servername, $username, $password, $sqlDb);

$request = isset($_GET['request']) ? $_GET['request'] : null;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// because we are posting JSON data, we use the php://input data
$data = json_decode(file_get_contents('php://input'), true);
$success = true;
$message = "";
$row = array();

$email = isset($data['email']) && !empty($data['email']) ? $conn->escape_string($data['email']) : '';
$name = isset($data['name']) && !empty($data['name']) ? $conn->escape_string($data['name']) : '';
$password = isset($data['password']) && !empty($data['password']) ? $conn->escape_string($data['password']) : '';
$createAccount = isset($data['createAccount']) && !empty($data['createAccount']) ? intval($data['createAccount']) : '';

$sql = "select * from user where user_name = '$email' and password = md5('$password') and active = 1";

$result = $conn->query("select * from user where user_name = '$email' and password = md5('$password') and active = 1");

if($request == "forgotPassword") {
  $emailResult = $conn->query("select * from user where user_name = '$email' and active = 1");
  
  // The email account was found
  if($emailResult->num_rows > 0) {
    $code = generateString();
    $conn->query("update user set password = md5('$code') where user_name = '$email' and active = 1");
    $name = "Hounds User";
    $subject = "Hounds Password Reset";
    $message = "Your password has been reset. Please log in with the below password:\n\nPassword: $code";
    processEmail($name, $email, $subject, $message);
    $message = "Please check email for new password.";
  }
  else {
    $success = false;
    $message = "If an email was found, a password will be sent to you";
  }
}
// we are on the login page
elseif($createAccount == 0) {
  // match found, logging in
  if($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    unset($row['password']); // don't return the password to the app
    $message = "Login Successful";
  }
  else {
    $row = array();
    $success = false;
    $message = "Login Unsuccessful";
  }
}
// we are on the account creation page
else {
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
      $conn->query("insert into user (name, user_name, password, active, creation_date) values ('$name', '$email', md5('$password'), 1, NOw())");
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
);

echo json_encode($return);

function generateString() {
  $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  // Output: 54esmdr0qf
  return substr(str_shuffle($permitted_chars), 0, 6);
}

function processEmail($name, $email, $subject, $message) {
  // Instantiation and passing `true` enables exceptions
  $mail = new PHPMailer(true);
  $error = '';

  try {
      $mail->IsSMTP();
      $mail->SMTPDebug = 0;
      $mail->SMTPAuth = true;
      $mail->SMTPSecure = 'ssl';
      $mail->Host = "smtp.gmail.com";
      $mail->Port = 465; // or 587
      $mail->IsHTML(false);
      $mail->Username = $username;
      $mail->Password = $password;
      $mail->SetFrom("noreply@gmail.com");
      $mail->Subject = $subject;
      $mail->Body = "$name\n$email\n$message";
      $mail->AddAddress($username);

      $mail->send();

  } catch (Exception $e) {
      $error =  "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }
}
?>