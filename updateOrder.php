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

$conn = new mysqli($servername, $sqlUser, $sqlPass, $sqlDb);

$request = isset($_GET['request']) ? $_GET['request'] : null;

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// because we are posting JSON data, we use the php://input data
$data = json_decode(file_get_contents('php://input'), true);
$success = true;
$message = "";

$id = isset($data['id']) && !empty($data['id']) ? $conn->escape_string($data['id']) : '';
$ready = isset($data['ready']) ? intval($data['ready']) : '';

if(!empty($id)) {
  $sql = "update food_order set ready='$ready' where food_order_id = $id";
  $result = $conn->query($sql);

  $emailResult = $conn->query("select * from food_order inner join user on user.user_id = food_order.user_id where food_order_id = $id");
  if($emailResult->num_rows > 0 && $ready == 1) {
    $emailRow = $emailResult->fetch_assoc();
    $email = $emailRow['user_name'];
    $name = $emailRow['name'];
    $subject = "Hounds Order Status";
    $message = "Your food order is ready. Please provide your name and order ID when arriving:\n\nName: $name\nOrder ID: $id";
    processEmail($name, $email, $subject, $message);
  }

  if($result->affected_rows == 0) {
    // when the form data is the same, there are no affected rows, but it is still a success
    // $success = false;
    // $message = "Item could not be updated";
  }
}
else {
  $success = false;
  $message = "All fields are required";
}

$return = array(
  'success' => $success,
  'message' => $message,
  'data' => array($id, $ready, $message)
);

function processEmail($name, $email, $subject, $message) {
  // Instantiation and passing `true` enables exceptions
  global $username, $password;
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
      $mail->Body = "$message";
      $mail->AddAddress($email);

      $mail->send();

  } catch (Exception $e) {
      $error =  "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  }
}

echo json_encode($return);
?>