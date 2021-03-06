---
title: Lifestream Architecture
description: "An overview of how the 'lifestream' on my homepage works"
publishdate: 2015-06-15
lastmod: 2015-06-15
categories: blog
tags: [push, pubsubhubbub, realtime, lifestream]
---

<div class="p-summary">
  <p>
    Recently, the <a href="https://chromic.org">homepage of this blog</a> changed from
    a static list of recent blog posts to a realtime stream of updates (the list
    of blog posts is still there, moved to the sidebar). This post tries to
    document (mostly as a "note-to-self", again) how this "lifestream" works.
  </p>

  <p>
    Note: This is a work-in-progress; I've already got plans to tweak how some
    of the pieces fit together.
  </p>
</div>
<!--more-->

<figure>
  <a href="/images/lifestream/lifestream.jpg"><img src="/images/lifestream/lifestream_s.jpg" alt=""></a>
  <figcaption>
    An overview of the pieces used to build the update stream.
    Description follows.
  </figcaption>
</figure>

<h2>TL;DR</h2>

<p>
  My sources are PuSH publishers, I have a PuSH hub running on the server,
  the lifestream is a PuSH subscriber.
</p>

<h2>Details</h2>

<p>
  For this project, I have three requirements:
</p>

<ol>
  <li>
    Realtime: I want the updates to appear in realtime. No polling.
    To acheive this, we rely on the
    <a href="https://en.wikipedia.org/wiki/PubSubHubbub">Pubsubhubbub
    (PuSH) protocol</a>.
  </li>
  <li>
    Self-hosted: Everything needs to run on a machine/VM I own/rent (most
    of this stuff is on a Linode)
  </li>
  <li>Open Source / Free Software: Everything I run needs to be F(L)OSS</li>
</ol>

<p>
  If we refer to the image above, the information flows from left to right, with
  the exception of the dashed line which we'll talk about a bit later.
</p>

<h3>Pushing Updates (PuSH publishers)</h3>

<h4>The Blog</h4>

<p>
  The Blog is the most "manual" source at the moment. It runs on
  <a href="http://jekyllrb.com/">Jekyll</a> and to publish a post, I push to my
  git repository on my Gogs instance
  (<a href="/blog/git-gogs-jekyll/">more information about this setup here</a>).
</p>

<p>
  After the new post has been published, I run a bash one-liner script that
  pings the PuSH hub:
</p>

{{< highlight bash >}}
#!/usr/bin/bash

curl -d hub.mode=publish -d "hub.url=http://chromic.org/feed.xml" http://push.chromic.org
{{< / highlight >}}

<p>
  Yes, I do plan on automating this at some point.
</p>

<h4>Media</h4>

<p>
  I run <a href="http://mediagoblin.org/">GNU mediagoblin</a> as a media
  publishing platform. It's PuSH-enabled out-of-the-box so I don't have to do
  much here. I did, however, modify the Atom Feed generated by gmg so that it
  includes a direct link to the media file (so that I can include it in the
  lifestream).
</p>

<h4>Code</h4>

<p>
  I run <a href="http://gogs.io/">Gogs</a> on code.chromic.org. This one is the
  most hacky-cobbled-together source in the lifestream (so far!). Ultimately,
  I'd like to have the
  <a href="https://code.chromic.org/chimo?tab=activity">public activity</a> events
  pushed to the stream, but right now only "git-push" events are sent over.
  There are a couple of reasons for this:
</p>

<ol>
  <li>Gogs isn't PuSH-enabled so I need to ping the hub myself</li>
  <li>
    Gogs is written in Go, which is a compiled language, which means I can't just
    open files and tweak them. And, I've been too lazy to setup a Go/Gogs
    development environment so far.
  </li>
</ol>

<p>
  Given this situation, I have to use the features Gogs support out-of-the-book.
  Luckily, Gogs supports webhooks on git-push events. You can probably see where
  this is going: I've setup all my repository to execute a PHP script whenever
  I push code:
</p>

{{< highlight php >}}

<?php
require_once('../../_config.php');

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
{{< / highlight >}}

<p>
  This is also on the "to improve" list.
</p>

<h4>Microblog</h4>

<p>
  This one is also easy. I use <a href="https://gnu.io/social/">GNU social</a> as a
  microblogging platform. It's PuSH-enabled out-of-the-box. I don't need to do
  anything here.
</p>

<p>
  Note: There are a couple of event types that aren't PuSH'ed (e.g.: favorites)
  by the GNU social platform.
</p>

<h4>Fm</h4>

<p>
  I added a small curl snippet to <code>/nixtape/1.x/submissions/1.2/index.php</code>
  and <code>/gnukebox/submissions/1.2/index.php</code> to ping the hub anytime I scrobble
  anything.
</p>

<h3>The Hubs</h3>

<p>
  I run an unmodified instance of
  <a href="https://github.com/aaronpk/Switchboard">Switchboard</a> as a PuSH
  hub. This is where the PuSH publishers send the "ping" whenever they publish
  something, with the exception of GNU social.
</p>

<p>
  GNU social, in addition to being a PuSH-publisher out-of-the-box, has its own
  built-in PuSH hub.
</p>

<h3>The Subscriber</h3>

<p>
  I wrote a <a href="http://github.com/chimo/lifestream">quick NodeJS "app"</a>
  that subscribes to the publishers above through the Switchboard Hub or the GNU
  social hub. When it recieves notification from the hub that content has been
  published, it fetches the feed/page it's subscribed to (this is the dashed
  line in the image above), gets the latest update, parses it and saves the data
  to a database.
</p>

<p>
  It also notifies the lifestream of new events through websockets.
</p>

<h3>The Lifestream</h3>

<p>
  Finally, we have the
  <a href="https://github.com/chimo/chromic.org/blob/master/index.php">lifestream</a>
  which is a simple PHP script that gets previously saved events from the MySQL
  database, and new events through websockets.
</p>

<h2>Conclusion</h2>

<p>
  I'm planning on adding more sources to the stream as time goes by. Polishing how
  everything works is also an ongoing activity.
</p>
