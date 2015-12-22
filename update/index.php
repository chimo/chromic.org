---
layout: update
title: Stuff and Things
excerpt:
---

<?php

// TODO: De-dupe this file and ../index.php

require_once('../../_config.php');

$dsn = 'mysql:dbname=' . $config['db']['name'] . ';host=' . $config['db']['host'] . ';charset=' . $config['db']['charset'];
$user = $config['db']['user'];
$password = $config['db']['password'];

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

// Invalid id
if ($id === 0) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request');

    // TODO: Better error message
    echo 'Invalid id';

    return;
}

// FIXME: This works, but filtering by WHERE before JOIN might be better
$sql = 'SELECT event.id, title, content, published, foreign_url, object_type, object_verb, subscription.type FROM event ' .
        'INNER JOIN subscription ON event.subscription_id = subscription.id ' .
        'WHERE event.id = ' . $id;

$res = $dbh->query($sql);
$row = $res->fetch(PDO::FETCH_ASSOC);

$datePublished = new DateTime();
$tz = new DateTimeZone("America/Toronto");
$utc = new DateTimeZone("UTC");

if ($row) {
    $datePublished->setTimeZone($utc);
    $datePublished->modify(str_replace(' ', 'T', $row['published']) . '+00:00');
    $datePublished->setTimeZone($tz);

    // FIXME: Don't triple-wrap the update... don't use ID selectors for styling (CSS)
    $html = '<div id="homepage"><div id="ls"><div class="' . implode(' ', array($row['type'], $row['object_type'], $row['object_verb'])) . '"><figure class="h-entry chr-card"><figcaption class="p-name">';
    $html .= $row['title'];
    $html .= '</figcaption>';
    $html .= '<blockquote class="e-content" cite="' . $row['foreign_url'] . '">' . $row['content'] . '</blockquote>';
    $html .= '<footer><a class="u-url" href="/update/' . $row['id'] . '">' .
                '<time class="dt-published timeago" datetime="' . $datePublished->format('c') . '">' . $datePublished->format('Y-m-d H:i:s (T)') . '</time>' .
             '</a> via <a href="' . $row['foreign_url'] . '"><img src="/images/homepage/' . $row['type'] . '.png" alt="' . $row['type'] . '"></a></footer>';
    $html .= '</figure></div></div></div>';
}

echo $html;

?>
