<?php


define('EMAIL', 'because.ahaha@gmail.com'); // КОМУ БУДЕТ ПРИХОДИТЬ ПИСЬМО



$from_email	= EMAIL; //from mail, sender email address
$subject	= $_POST["subject"]; //subject for the email

$message = "";
if (!empty($_POST['name'])) $message .= "<p>Имя: <b>{$_POST['name']}</b></p>";
if (!empty($_POST['phone'])) $message .= "<p>Телефон: <b>{$_POST['phone']}</b></p>";
if (!empty($_POST['message'])) $message .= "<p>Сообщение: <b>{$_POST['message']}</b></p>";
if (!empty($_POST['type'])) $message .= "<p>Тип груза: <b>{$_POST['type']}</b></p>";
if (!empty($_POST['amount'])) $message .= "<p>Объём: <b>{$_POST['amount']}</b></p>";
if (!empty($_POST['weight'])) $message .= "<p>Вес: <b>{$_POST['weight']}</b></p>";
if (!empty($_POST['country'])) $message .= "<p>Регион: <b>{$_POST['country']}</b></p>";

$boundary = md5("random"); // define boundary with a md5 hashed value

//header
$headers = "MIME-Version: 1.0\r\n"; // Defining the MIME version
$headers .= "From:".$from_email."\r\n"; // Sender Email
$headers .= "Content-Type: multipart/mixed;"; // Defining Content-Type
$headers .= "boundary = $boundary\r\n"; //Defining the Boundary
    
//plain text
$body = "--$boundary\r\n";
$body .= "MIME-Version: 1.0\r\n";
$body .= "Content-type:text/html;charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n\r\n";
$body .= chunk_split(base64_encode($message));

//Get uploaded file data using $_FILES array
if (isset($_FILES['attachment'])) {
    $tmp_name = $_FILES['attachment']['tmp_name']; // get the temporary file name of the file on the server
    $name	 = $_FILES['attachment']['name']; // get the name of the file
    $size	 = $_FILES['attachment']['size']; // get size of the file for size validation
    $type	 = $_FILES['attachment']['type']; // get type of the file
    $error	 = $_FILES['attachment']['error']; // get the error (if any)
    
    //validate form field for attaching the file
    if($error > 0)
    {
        die('Upload error or No files uploaded');
    }
    
    //read from the uploaded file & base64_encode content
    $handle = fopen($tmp_name, "r"); // set the file handle only for reading the file
    $content = fread($handle, $size); // reading the file
    fclose($handle);				 // close upon completion
    
    $encoded_content = chunk_split(base64_encode($content));

    //attachment
    $body .= "--$boundary\r\n";
    $body .="Content-Type: $type; name=".$name."\r\n";
    $body .="Content-Disposition: attachment; filename=".$name."\r\n";
    $body .="Content-Transfer-Encoding: base64\r\n";
    $body .="X-Attachment-Id: ".rand(1000, 99999)."\r\n\r\n";
    $body .= $encoded_content; // Attaching the encoded file with email
}
    

$sentMailResult = mail(EMAIL, $subject, $body, $headers);

if($sentMailResult )
{
// echo "<h3>File Sent Successfully.<h3>";
    unlink($name); // delete the file after attachment sent.
}
else
{
die("Sorry but the email could not be sent.
                Please go back and try again!");
}


echo json_encode([]);