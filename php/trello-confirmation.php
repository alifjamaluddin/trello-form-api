<?php

$yourEmail = "myEmailAddress@myemail.com";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Allow-Methods: POST');
header('Content-type: application/json');

$json = urldecode(file_get_contents("php://input"));
$old= array('{"','"}','cardid":');
$new= array('','','cardid":"');
$replaced = str_replace($old, $new, $json);
$pvals = explode('","',$replaced);
$data = array();

foreach ($pvals as $keys) {
	$data[] = explode('":"', $keys);
}
$desc = array();
$desc = explode('\n',$data[1][1]);

$to      = $data[4][1];
$subject = "Request Received: ".str_replace("}","",$data[5][1]);
$message = "A request has been received from on ".date("m/d/Y h:i A").".\n\n";

$message .="If your submission was successful, your ID number is: ".str_replace("}","",$data[5][1])."\n\n";

foreach($desc as $val) {
	$message .= $val . "\n";
}

$headers = 'From: ' . $yourEmail . "\r\n" .
	'Reply-To: ' . $yourEmail . "\r\n" .
	'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

echo json_encode("success");
?>
