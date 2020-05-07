<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require "vendor/autoload.php";

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
$error = '';
$errors = array();

$name = isset($_POST['name']) ? 'Name: ' . $_POST['name'] : '';
$email = isset($_POST['email']) ? 'Email: ' . $_POST['email'] : '';
$message = isset($_POST['subject']) ? 'Subject:' . $_POST['subject'] : '';
$message = isset($_POST['message']) ? 'Message:' . $_POST['message'] : '';
$fromForm = isset($_POST['fromForm']) ? 'Message:' . $_POST['fromForm'] : ''; // this proves that the form was submitted from my website

$canContinue = !empty($name) && !empty($email) && !empty($message) && !empty($fromForm) && $fromForm == 'Message:0g8gh87g9s987fsd867';

try {
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "brandon95547@gmail.com";
    $mail->Password = "3305im305";
    $mail->SetFrom("noreply@gmail.com");
    $mail->Subject = "Portfolio Contact";
    $mail->Body = "$name<br>$email<br>$message";
    $mail->AddAddress("brandon95547@gmail.com");

    $mail->send();

} catch (Exception $e) {
    $error =  "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    $errors[] = $error;
}
echo json_encode($errors);
