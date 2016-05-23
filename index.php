---
layout: homepage
title: Stuff and Things
excerpt:
---

<?php

require_once('../private/_config.php');

$dsn = 'mysql:dbname=' . $config['db']['name'] . ';host=' . $config['db']['host'] . ';charset=' . $config['db']['charset'];
$user = $config['db']['user'];
$password = $config['db']['password'];

// TODO: consider changing .foreign-url to mf2 'syndicate'
$html_template = <<<EOT
<li class="%s">
    <figure class="h-entry chr-card">
        <figcaption class="p-name chr-card__title">%s</figcaption>
        <blockquote class="e-content chr-card__content" cite="%s">
            %s
        </blockquote>
        <footer>
            <!-- TODO: link to specific types -->
            <!-- TODO: JS progressive enhancement brings data in stream instead of navigating to other page -->
            <a class="interactions-link" href="http://chromic.org/update/%s#interactions">
            <ul class="interaction-icons" data-webmention-count data-url="https://chromic.org/update/%s">
                <li class="interaction-icon comments">
                    <span class="num">0</span>
                    <span class="fa fa-comments"></span>
                    <span class="sr-only">mentions</span>
                </li>
                <li class="interaction-icon likes">
                    <span class="num">0</span>
                    <span class="fa fa-heart"></span>
                    <span class="sr-only">likes</span>
                </li>
                <li class="interaction-icon repeats">
                    <span class="num">0</span>
                    <span class="fa fa-recycle"></span>
                    <span class="sr-only">repeats</span>
                </li>
            </ul>
            </a>
            <a class="u-url" href="/update/%s">
                <time class="dt-published timeago" datetime="%s">%s</time>
            </a>
            via
            <a class="foreign-url" href="%s">
                <img class="foreign-service" src="/images/homepage/%s.png" title="%s" alt="%s">
            </a>
        </footer>
    </figure>
</li>
EOT;

try {
    $dbh = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;

// If GET[page] was set to an invalid int,
// $page will be 0. We don't want that.
if ($page === 0) {
    $page = 1;
}

$limit = ($page - 1) * 10 . ", 10"; // 10 items per page

$sql = 'SELECT event.id, title, content, published, foreign_url, object_type, object_verb, subscription.type FROM event ' .
        'INNER JOIN subscription ON event.subscription_id = subscription.id ' .
        'ORDER BY published DESC LIMIT ' . $limit;

$res = $dbh->query($sql);
$html = '<ol class="stream__activities">';
$nbRows = 0;

$datePublished = new DateTime();
$tz = new DateTimeZone("America/Toronto");
$utc = new DateTimeZone("UTC");

while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
    $nbRows++;

    $datePublished->setTimeZone($utc);
    $datePublished->modify(str_replace(' ', 'T', $row['published']) . '+00:00');
    $datePublished->setTimeZone($tz);

    $classAttrVal = implode(' ', array($row['type'], $row['object_type'], $row['object_verb']));

    $html .= sprintf(
        $html_template,
        $classAttrVal,
        $row['title'],
        $row['foreign_url'],
        $row['content'],
        $row['id'],
        $row['id'],
        $row['id'],
        $datePublished->format('c'),
        $datePublished->format('Y-m-d H:i:s (T)'),
        $row['foreign_url'],
        $row['type'],
        $row['type'],
        $row['type']
    );
}

$html .= '</ol>' . "\n";

$html .= '<nav class="pagination" role="navigation">' . "\n";

if ($page !== 1) {
    $html .= '<a rel="next" class="btn" href="?page=' . ($page - 1) . '">Newer</a>' . "\n";
}

// Print next link
// Note: this will link to an empty page when total number of events
//       is a multiple of 10.
if ($nbRows === 10) {
    $html .= '<a rel="prev" class="btn" href="?page=' . ($page + 1) . '">Older</a>' . "\n";
}

echo $html . '</nav>' . "\n";

?>

<script>
( function() {
    "use strict";

    window.ls = {
        "port": <?php echo $config['websockets']['port'] ?>,
        "secure_port": <?php echo $config['websockets']['secure_port'] ?>
    }
}() );
</script>

