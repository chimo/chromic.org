<?php
$path = $_GET['target'];

// Get, print webmentions
$webmentions = get_webmentions($path);
echo $webmentions;

// Get, print Isso comments
$comments = get_isso_comments($path);
echo $comments;

function get_webmentions($path) {
    $webmention_server = 'https://webmention.chromic.org/api/mentions?target=';
    $url = $webmention_server . urlencode('https://chromic.org' . $path);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);

    // Check for errors
    if ($response === false) {
        return curl_error($ch);
    }

    $json = json_decode($response);

    if ($json === null || count($json->links) === 0) {
        return '';
    }

    $html = '<ul class="interactions">';
    foreach($json->links as $mention) {
        // TMP: ignore manually entered pingbacks; empty content
        if ($mention->data->content === null) {
            continue;
        }

        $html .= '<li class="interaction">' .
                    '<div class="indent">' .
                        '<div class="u-comment h-cite">';

        $author = ($mention->data->author->name) ? $mention->data->author->name : 'Somebody';
        $author = '<span class="p-name">' . $author . '</span>';

        if ($mention->data->author->url) {
            $html .= '<a rel="nofollow" class="u-author h-card" href="' . $mention->data->author->url . '">' . $author . "</a>";
        } else {
            $html .= $author;
        }

        $html .= '<div class="p-content p-name">' . $mention->data->content . '</div>';

        $date = ($mention->data->published) ? $mention->data->published : $mention->verified_date;

        $time = '<time class="dt-published timeago" datetime="' . $date . '">' . $date . '</time>';

        if ($mention->data->url) {
            $time = '<a rel="nofollow" href="' . $mention->data->url . '" class="meta">' . $time . '</a>';
        } else {
            $time = '<span class="meta">' . $time . '</span>';
        }

        $html .= $time;

        $html .= '</div></div></li>';
    }
    $html .= '</ul>';

    return $html;
}

function get_isso_comments($path) {
    $comment_server = 'https://comments.chromic.org/chromic/?uri=';

    $url = $comment_server . urlencode($path);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);

    // Check for errors
    if ($response === false) {
        return curl_error($ch);
    }

    $json = json_decode($response);

    if ($json === null || $json->total_replies === 0) {
        return '';
    }

    $html = '<ul class="interactions">';
    foreach($json->replies as $reply) {
        $html .= '<li class="interaction">' .
                    '<div class="indent">' .
                        '<div class="u-comment h-cite">';

        $author = ($reply->author) ? $reply->author : 'Somebody';
        $author = '<span class="p-name">' . $author . '</span>';

        if ($reply->website) {
            $html .= '<a rel="nofollow" class="u-author h-card" href="' . $reply->website . '">' . $author . "</a>";
        } else {
            $html .= $author;
        }

        $html .= '<div class="p-content p-name">' . $reply->text . '</div>';

        $datetime = date('Y-m-d\TH:i:sP', $reply->created);
        $humandate = date('Y-m-d H:i:s (T)', $reply->created);

        $html .= '<span class="meta">' .
                    '<time class="dt-published timeago" datetime="' . $datetime . '">' . $humandate . '</time>' .
                 '</span>';

        $html .= '</div></div></li>';
    }
    $html .= '</ul>';

    return $html;
}

