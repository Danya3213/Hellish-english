<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'scripts/libraries/PHPMailer/src/Exception.php';
require 'scripts/libraries/PHPMailer/src/PHPMailer.php';
require 'scripts/libraries/PHPMailer/src/SMTP.php';

header('Content-Type: application/json');

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'dn0992947530@gmail.com';
    $mail->Password = 'vvob phvf gxjx vgev';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('DanyaNesterenko@outlook.com', 'Your Name');
    $mail->addAddress('DanyaNesterenko@outlook.com');
    $mail->Subject = 'Test Email';
    $mail->Body = 'This is a test email.';

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Email sent successfully!']);
} catch (Exception $e) {
    error_log("SMTP Error: {$mail->ErrorInfo}"); // Логування помилки
    echo json_encode(['status' => 'error', 'message' => "SMTP Error: {$mail->ErrorInfo}"]);
}
?>