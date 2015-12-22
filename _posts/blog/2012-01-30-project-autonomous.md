---
title: Project Autonomous
description: "List of self-hosted software I'm using"
modified: 2015-12-12
categories: blog
tags: [sysadmin, foss, floss, autonomous]
image:
  feature: bird-sky.jpg
  credit: Hash Milhan
  creditlink: http://www.flickr.com/photos/hashir/1061284835/
---

<div class="p-summary">
In an effort to take control of my online presence/data and to become more autonomous, I started to migrate away from services hosted by 3rd-parties and setup my own instances where possible.
</div>
<!-- more -->

Here's a quick list of what's working at the moment:

<dl>
  <dt id="avatars"><a href="http://avatars.chromic.org">avatars.chromic.org</a></dt>
  <dd>
    <a href="http://sourceforge.net/p/surrogator/wiki/Home/">Surrogator</a>: a <a href="https://www.libravatar.org/">Libravatar</a> compatible avatar image server.<br />
    Gravatar replacement
  </dd>

  <dt id="chromic"><a href="http://chromic.org">chromic.org</a></dt>
  <dd>
    A <a href="http://jekyllrb.com">Jekyll</a>-powered static site/blog<br />
    Publishing platform similar to Blogger.
  </dd>

  <dt id="code"><a href="http://code.chromic.org">code.chromic.org</a></dt>
  <dd>
    <a href="http://gogs.io/">Gogs</a> instance: self-hosted Git.<br />
    I'm using it for git repository, bug tracking and so on.
  </dd>

  <dt id="comments"><a href="http://comments.chromic.org">comments.chromic.org</a></dt>
  <dd>
    <a href="http://posativ.org/isso/">Isso</a> instance: a commenting server similar to Disqus<br />
    I use it on <a href="http://media.chromic.org">media.chromic.org</a> (Mediagoblin) and <a href="http://chromic.org">chromic.org</a> (Jekyll)
  </dd>

  <dt id="fm"><a href="http://fm.chromic.org">fm.chromic.org</a></dt>
  <dd>
    A <a href="http://foocorp.org/projects/fm/">GNU fm</a> instance.<br />
    <a href="http://last.fm">Last.fm</a> alternative.
  </dd>

  <dt id="id"><a href="http://id.chromic.org">id.chromic.org</a></dt>
  <dd>
    A <a href="http://simpleid.koinic.net/">simpleID</a> instance.<br />
    An <a href="http://openid.net/">OpenID</a> provider. Supports two-factor authentication via <a href="http://www.dynalogin.org/">dynalogin</a>
  </dd>

  <dt id="im"><a href="http://im.chromic.org">im.chromic.org</a></dt>
  <dd>
    A <a href="http://jappix.org">Jappix</a> instance. I use <a href="http://prosody.im/">Prosody</a> as a Jabber server. (I use the <a href="https://f-droid.org/repository/browse/?fdfilter=conversations&fdid=eu.siacs.conversations">Conversations</a> client on Android)<br />
    Jabber/XMPP client/server chat platform similar to Google Talk.
  </dd>

  <dt id="later"><a href="http://later.chromic.org">later.chromic.org</a></dt>
  <dd>
    A <a href="https://www.wallabag.org/">wallabag</a> instance.<br />
    Save webpages so you can read them later.<br />
    A pocket / read-it-later / instapaper alternative.
  </dd>

  <dt id="mail"><a href="https://mail.chromic.org">mail.chromic.org</a></dt>
  <dd>
    Mail server powered by <a href="http://www.postfix.org/">postfix</a>, <a href="http://www.courier-mta.org/">courier</a>, <a href="http://www.opendkim.org/">OpenDKIM</a> and <a href="http://roundcube.net/">roundcube</a>. I use <a href="https://github.com/k9mail/k-9/">K-9 Mail</a> on Android.<br />
    Two-factor authentication via the <a href="https://github.com/alexandregz/twofactor_gauthenticator">twofactor roundcube plugin</a> and <a href="https://f-droid.org/repository/browse/?fdfilter=freeotp&fdid=org.fedorahosted.freeotp">FreeOTP</a> (Android)<br />
    A <a href="http://gmail.com">Gmail</a> replacement.
  </dd>

  <dt id="media"><a href="http://media.chromic.org">media.chromic.org</a></dt>
  <dd>
    A <a href="http://mediagoblin.org">Mediagoblin</a> instance.<br />
    Media sharing platform similar to Flickr, Picasa, etc.
  </dd>

  <dt id="oc"><a href="http://oc.chromic.org">oc.chromic.org</a></dt>
  <dd>
    An <a href="http://owncloud.org/">ownCloud</a> instance.<br />
    I use it as a Google Calendar alternative, Contact Manager and Notes synchronization (via <a href="http://cweiske.de/tagebuch/grauphel.htm">grauphel</a>) for now, but it does more than that.<br />
    On Android, I use <a href="http://davdroid.bitfire.at/what-is-davdroid">DAVdroid</a> to sync calendar & contacts, and <a href="https://f-droid.org/repository/browse/?fdfilter=tomdroid&fdid=org.tomdroid">Tomdroid</a> to sync notes.
  </dd>

  <dt id="push"><a href="http://push.chromic.org">push.chromic.org</a></dt>
  <dd>
    A <a href="https://switchboard.p3k.io/">Switchboard</a> instance (a <a href="https://en.wikipedia.org/wiki/PubSubHubbub">PuSH</a> hub)<br />
    I use it to update <a href="http://chromic.org">my homepage</a> in realtime (see the "<a href="http://chromic.org/blog/lifestream-architecture/">Lifestream Architecture</a>" post for more details on how it works).
  </dd>

  <dt id="rss"><a href="http://rss.chromic.org">rss.chromic.org</a></dt>
  <dd>
    A <a href="http://freshrss.org/">FreshRSS</a> instance.<br />
    RSS Reader similar to Google Reader.
  </dd>

  <dt id="search"><a href="http://search.chromic.org">search.chromic.org</a></dt>
  <dd>
    A <a href="https://searx.me/">searx</a> instance.<br />
    A privacy-respecting, hackable metasearch engine.
  </dd>

  <dt id="sn"><a href="http://sn.chromic.org">sn.chromic.org</a></dt>
  <dd>
    A <a href="http://gnu.io">GNU social</a> instance.<br />
    Social media platform similar to Twitter.
  </dd>

  <dt id="webmention"><a href="http://webmention.chromic.org">webmention.chromic.org</a></dt>
  <dd>
    A "<a href="https://webmention.io/">webmention.io</a>" instance.<br />
    I use it to handle <a href="http://indiewebcamp.com/webmention">webmentions</a> on this blog.
  </dd>
</dl>
