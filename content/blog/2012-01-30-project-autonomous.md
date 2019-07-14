---
title: Project Autonomous
description: "List of self-hosted software I'm using"
publishdate: 2012-01-30
lastmod: 2019-07-14
categories: blog
tags: [sysadmin, foss, floss, autonomous]
slug: project-autonomous
image:
  feature: bird-sky.jpg
  credit: Hash Milhan
  creditlink: http://www.flickr.com/photos/hashir/1061284835/
---

<div class="p-summary">
In an effort to take control of my online presence/data and to become more autonomous, I started to migrate away from services hosted by 3rd-parties and setup my own instances where possible.
</div>
<!--more-->

Here's a quick list of what's working at the moment:

<dl>
  <dt id="auth"><a href="https://auth.chromic.org">auth.chromic.org</a></dt>
  <dd>
    An <a href="http://indiewebcamp.com/indieauth.com">IndieAuth.com</a> instance (an <a href="http://indiewebcamp.com/indieauth">IndieAuth</a> provider).<br />
    It's also an OpenID delegate.
  </dd>

  <dt id="avatars"><a href="https://avatars.chromic.org">avatars.chromic.org</a></dt>
  <dd>
    <a href="http://sourceforge.net/p/surrogator/wiki/Home/">Surrogator</a>: a <a href="https://www.libravatar.org/">Libravatar</a> compatible avatar image server.<br />
    Gravatar replacement<br />
    My <a href="https://gnu.io/social/">GNU social</a> instance and <a href="https://gitea.io/">Gitea</a> <a href="https://code.chromic.org">instance</a> use this.
  </dd>

  <dt id="chromic"><a href="https://chromic.org">chromic.org</a></dt>
  <dd>
    A <a href="http://jekyllrb.com">Jekyll</a>-powered static site/blog<br />
    Publishing platform similar to Blogger.
  </dd>

  <dt id="ci">ci.chromic.org (only accessible internally)</dt>
  <dd>
    A <a href="https://drone.io/">Drone</a> instance: continuous delivery platform.<br />
    It's hooked-up to my <a href="https://gitea.io">Gitea</a> <a href="https://code.chromic.org">instance</a>.
  </dd>

  <dt id="code"><a href="https://code.chromic.org">code.chromic.org</a></dt>
  <dd>
    <a href="http://gitea.io/">Gitea</a> instance: self-hosted Git.<br />
    I'm using it for git repository, bug tracking and so on.
  </dd>

  <dt id="files"><a href="https://files.chromic.org">files.chromic.org</a></dt>
  <dd>
    An <a href="https://nextcloud.com/">Nextcloud</a> instance.<br />
    I use it as a Dropbox alternative, Google Calendar alternative, Contact Manager
    and Tasks synchronization for now, but it does more than that.<br />
    On Android, I use <a href="http://davdroid.bitfire.at/what-is-davdroid">DAVdroid</a>
    to sync calendar &amp; contacts, and
    <a href="https://f-droid.org/repository/browse/?fdfilter=tasks&fdid=org.dmfs.tasks">OpenTasks</a> to sync tasks.
  </dd>

  <dt id="fm"><a href="https://fm.chromic.org">fm.chromic.org</a></dt>
  <dd>
    A <a href="https://gnu.io/fm/">GNU fm</a> instance.<br />
    <a href="http://last.fm">Last.fm</a> alternative.
  </dd>

  <dt id="irc"><a href="https://irc.chromic.org">irc.chromic.org</a></dt>
  <dd>
    A <a href="https://github.com/thelounge/lounge">Lounge</a> (web-based IRC client) instance.<br />
    I use it to connect to my ZNC bouncer.
  </dd>

  <dt id="later"><a href="https://later.chromic.org">later.chromic.org</a></dt>
  <dd>
    A <a href="https://www.wallabag.org/">wallabag</a> instance.<br />
    Save webpages so you can read them later.<br />
    A pocket / read-it-later / instapaper alternative.
  </dd>

  <dt id="mail"><a href="https://mail.chromic.org">mail.chromic.org</a></dt>
  <dd>
    Mail server powered by <a href="http://www.postfix.org/">postfix</a>,
    <a href="http://www.courier-mta.org/">courier</a>,
    <a href="http://www.courier-mta.org/maildrop/">maildrop</a>,
    <a href="https://spamassassin.apache.org/">SpamAssassin</a>,
    <a href="http://www.opendkim.org/">OpenDKIM</a>,
    <a href="http://www.trusteddomain.org/opendmarc/">OpenDMARC</a>,
    and <a href="http://roundcube.net/">roundcube</a> + its
    <a href="https://github.com/roundcube/roundcubemail/tree/master/plugins/enigma">enigma plugin</a> for PGP support.
    I use <a href="https://github.com/k9mail/k-9/">K-9 Mail</a> on Android.<br />
    A <a href="http://gmail.com">Gmail</a> replacement.
  </dd>

  <dt id="media"><a href="https://media.chromic.org">media.chromic.org</a></dt>
  <dd>
    A <a href="http://mediagoblin.org">Mediagoblin</a> instance.<br />
    Media sharing platform similar to Flickr, Picasa, etc.
  </dd>

  <dt id="podcasts"><a href="https://podcasts.chromic.org">podcasts.chromic.org</a></dt>
  <dd>
    A <a href="https://github.com/gpodder/mygpo">gpodder.net (mygpo)</a> instance.<br />
    Manage and synchronize podcast subscriptions and listening progress.
  </dd>

  <dt id="push"><a href="https://push.chromic.org">push.chromic.org</a></dt>
  <dd>
    A <a href="https://switchboard.p3k.io/">Switchboard</a> instance (a <a href="https://en.wikipedia.org/wiki/PubSubHubbub">PuSH</a> hub)<br />
    I use it to update <a href="http://chromic.org">my homepage</a> in realtime (see the "<a href="http://chromic.org/blog/lifestream-architecture/">Lifestream Architecture</a>" post for more details on how it works).
  </dd>

  <dt id="search"><a href="https://search.chromic.org">search.chromic.org</a></dt>
  <dd>
    A <a href="https://searx.me/">searx</a> instance.<br />
    A privacy-respecting, hackable metasearch engine.
  </dd>

  <dt id="sn"><a href="http://sn.chromic.org">sn.chromic.org</a></dt>
  <dd>
    A <a href="http://gnu.io">GNU social</a> instance.<br />
    Social media platform similar to Twitter.
  </dd>

  <dt id="watching"><a href="https://watching.chromic.org">watching.chromic.org</a></dt>
  <dd>
    A "<a href="https://github.com/devfake/flox">Flox</a>" instance.<br />
    A personal Trakt.tv replacement
  </dd>

  <dt id="webmention"><a href="https://webmention.chromic.org">webmention.chromic.org</a></dt>
  <dd>
    A "<a href="https://webmention.io/">webmention.io</a>" instance.<br />
    I use it to handle <a href="http://indiewebcamp.com/webmention">webmentions</a> on this blog.
  </dd>

  <dt id="xray"><a href="https://xray.chromic.org">xray.chromic.org</a></dt>
  <dd>
    A <a href="https://github.com/aaronpk/XRay">XRay</a> instance.<br />
    Parses and returns structured data from any URL. webmention.io (above) needs this.
  </dd>
</dl>

