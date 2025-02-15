<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;


    require 'scripts\libraries\PHPMailer\src\PHPMailer';
    require 'scripts\libraries\PHPMailer\src\Exception';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->IsHTML(true);

    $mail->setForm('Кандидат');
    $mail->addAdress('dn0992947530@gmail.com');
    $mail->Subject = 'Hello!';

    $body = '<h1> HERE WE GO</h1>'; 

    $mail ->Body = $body;

    if(!mail->send()) {

        $message = 'error';
    } else {

        $message = 'Sended';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>