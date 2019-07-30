---
title: Mail
description: ""
publishdate: 2019-06-05
modified: 2019-06-05
categories: blog
tags: [mail, neomutt, mutt, offlineimap, khard, vsyncdir, nextcloud, notmuch]
---

<p>
  Once again, I'm just documenting part of my setup. It's nothing that hasn't
  been done before (it's just a collection of different utilities, barely
  deviating from the out-of-the-box configuration, really). This time, we're
  talking about mail.
</p>

<!--more-->

<h2>MUA</h2>

<p>
  I do like me some command line, so my mail client is `<a
  href="https://neomutt.org/">neomutt</a>`. I'll be honest, I don't know
  exactly what the differences are compared to mutt, but it's been working well
  so I'm not complaining.
</p>

<p>
  I'm pretty excited about `<a href="https://aerc-mail.org/">aerc</a>` though.
  It has some interesting features and ideas, such as an embedded terminal and
  highlighting patches with diffs. Of course, the first thing I did when I
  installed it (after testing the standard read/send mail features) is <a
  href="http://sn.chromic.org/notice/1701150">post a notice</a> to my <a
  href="http://sn.chromic.org/chimo">GNU social instance</a> by calling
  `identicurse` from within `aerc`.
</p>

<h2>Receiving mail</h2>

<p>
  I'm using `<a href="http://offlineimap.org/">offlineimap</a>` to receive
  mails and save them locally. neomutt then reads the mail from there. Having
  the content locally allows me to run other utilities on the data without them
  having to be network/IMAP/etc aware. Some examples are searching (more on
  that later) and mail notifications via mako/swaybar/swayblocks.
</p>

<h2>Address book sync</h2>

<p>
  I'm using `<a href="https://vdirsyncer.pimutils.org">vdirsyncer</a>` to sync
  my address book (and calendar, but I'm not using anything to display calendar
  data yet) from my <a href="https://nextcloud.org/">nextcloud</a> instance.
</p>

<h2>Address book integration with (neo)mutt</h2>

<p>
  I'm using `<a href="https://github.com/scheibler/khard">khard</a>` as a
  console carddav client and used <a
  href="https://github.com/scheibler/khard#mutt">the following settings</a> to
  integrated it with (neo)mutt.
</p>

<h2>Searching mail</h2>

<p>
  I'm using `<a href="https://notmuchmail.org/">notmuch</a>` to search mail
  within (neo)mutt by using <a
  href="https://wiki.archlinux.org/index.php/Notmuch#Integrating_with_mutt">the
  following key-bindings</a>.
</p>

