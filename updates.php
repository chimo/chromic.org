<?php

// composer
require 'composer/autoload.php';

use \FeedWriter\ATOM;

// FIXME: De-dupe (/index.php, /updates/index.php)
require_once('../private/_config.php');

$dsn = 'mysql:dbname=' . $config['db']['name'] . ';host=' . $config['db']['host'] . ';charset=' . $config['db']['charset'];
$user = $config['db']['user'];
$password = $config['db']['password'];

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

$sql = 'SELECT event.id, title, content, published, foreign_url, object_type, object_verb, subscription.type FROM event ' .
        'INNER JOIN subscription ON event.subscription_id = subscription.id ' .
        'ORDER BY published DESC LIMIT 10';

$res = $dbh->query($sql);

$feed = new ATOM;

$feed->setTitle('chimo\'s updates');
$feed->setLink('https://chromic.org');
$feed->setDate(new DateTime());

$feed->setChannelElement('author', array('name' => 'chimo'));

$feed->setSelfLink('https://chromic.org/updates.xml');
$feed->setAtomLink('https://push.chromic.org', 'hub');

while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
    $newItem = $feed->createNewItem();

    $newItem->setTitle(strip_tags($row['title']));
    $newItem->setLink('http://chromic.org/update/' . $row['id']);
    $newItem->setDate($row['published']);
    $newItem->setAuthor('chimo', 'chimo@chromic.org');
    $newItem->setContent($row['content']);

    $feed->addItem($newItem);
}

$feed->printFeed();

