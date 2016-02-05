<?php

require_once('../../private/_config.php');

$s = $config['xrd']['secret'];

$u = $_GET['uri'];

$u = substr($u, 5);

$f = $s . $u . ".xml";

if (file_exists($f)) {
  $fh = fopen($f, 'r');
  $c = fread($fh, filesize($f));
  fclose($fh);
  header('Content-type: text/xml');
  echo $c;
}
