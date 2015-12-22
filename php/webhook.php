<?php

require_once('../../private/_config.php');

$gogs = $config['gogs'];
$data = file_get_contents('php://input');

// Invalid payload
try {
    $json = json_decode($data);
} catch (Exception $e) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
    exit;
}

// Invalid 'secret'
if ($gogs['secret'] !== $json->secret) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');
    exit;
}

$ch = curl_init($gogs['push']);
curl_setopt($ch, CURLOPT_USERAGENT, 'gogs webhook script');
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'hub.mode=publish&hub.url=' . $gogs['topic']);
$ok = curl_exec($ch);
curl_close($ch);

if (!$ok) {
    error_log('Could not ping hub (errno: ' . curl_errno($ch) . ')', 4);
    error_log('Curl error message: ' . curl_error($ch) ,4);
} else {
    error_log('Pinged hub successfully');
}

