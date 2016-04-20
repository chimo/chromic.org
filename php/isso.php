<?php
$comment_server = 'https://comments.chromic.org/chromic/new?uri=';
$target_url = $_POST['target'];

$hostname = parse_url($target_url, PHP_URL_HOST);

if (!preg_match($hostname !== 'chromic.org')) {
    header("HTTP/1.0 400 Bad Request");

    echo '<h1>400 Bad Request</h1>';
    echo '<p>This form only accepts comments for chromic.org';

    die();
}

// TODO: Check if target url exists (returns HTTP 200)

$url = $comment_server . urlencode($_POST['target']);

$data = array();

$data['text'] = $_POST['text'];
$data['author'] = $_POST['author'];
$data['email'] = $_POST['email'];
$data['website'] = $_POST['website'];

$json = json_encode($data);

// Setup cURL
$ch = curl_init($url);
curl_setopt_array($ch, array(
    CURLOPT_POST => TRUE,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
    ),
    CURLOPT_POSTFIELDS => $json
));

// Send the request
$response = curl_exec($ch);

// Check for errors
if($response === FALSE) {
    header('HTTP/1.0 500 Internal Server Error');
    die(curl_error($ch));
}

header('Location: ' . $target_url);

