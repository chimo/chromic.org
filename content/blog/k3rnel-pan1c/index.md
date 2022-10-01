---
title: k3rnel-pan1c
description: ""
publishdate: 2022-09-30
categories: blog
tags: []
---

Hello, friend.

Long time no see.

I'm not good with introductions so let's just dive into it.

<h2>shutdown -r</h2>

<p>Things I've done since Apr. 27 2020:</p>

<ul>
  <li>
    Shut everything down except critical services.<br />
    The resources I kept running are:
    <ul>
      <li>
        mail (postfix et al.) and webmail (mail.chromic.org)<br />
        Last line of communication with the world. Mostly to get reminders
        about domain expiry, etc.
      </li>
      <li>
        code.chromic.org<br />
        On the off-chance my crappy code is of interest to anyone.
      </li>
      <li>
        files.chromic.org<br />
        For file storage.
      </li>
    </ul>
  </li>
  <li>
    Except for work, stopped doing much of anything computer-related. No
    development and no sysadmin stuff except `pacman -Syu`.
  </li>
  <li>
    Stopped initiating contact with people.
  </li>
  <li>
    Turned off all phone notifications except from a single contact.
  </li>
</ul>

It took a while, but eventually things got really quiet. Things got simpler,
and I felt like I could focus.

So why am I here writing this? Well it turns out people suck, even in small
amount, so I'm back to dealing with computers instead.

But this time I'm planning on tackling things slower, not get invested in
anything too much and stepping away if I feel like I need to.

The only thing I'm bringing back from the things I've left behind is
sysadmin-stuff for now. Notifications are staying off. Development to a minimum.

So if you're browsing around, you'll probably run into a bunch of broken things
and broken links. They'll probably stay that way a while, and I'm not getting
anxious about it. They'll work again whenever I get to it.

Most of the things listed on <a href="/blog/project-autonomous/">Project
Autonomous</a> are probably dead. Some will come back, some will get removed.
At some point. Probably.

<h2>init_1</h2>

Things I've done lately (the last couple of weeks, I think)

<ul>
  <li>
	Mail revamp<br /> I had <a href="/blog/lxd/">started using LXD</a> a while
	ago. One of the things I still needed to migrate was the mail
    infrastructure.<br />
    <b>I went from:</b> postfix + courier-imap + cyrus-sasl + authdaemond +
    spamassassin + opendkim + opendmarc, all running on the host<br />
    <b>To:</b>  postfix + dovecot + dovecot-sasl + spamassassin + opendkim +
    opendmarc, each in their own container.
  </li>
  <li>
    CICD revamp<br />
    <b>From</b>: drone.io running on docker on the host<br />
    <b>To</b>:   woodpecker CI running on docker in a LXC container<br />
	This one was pretty simple, except for the fact that I needed to have my
    VPS containers talk to woodpecker on my home LXD cluster over IPSec...
  </li>
  <li>
    Logging revamp<br />
    Setup `syslog` in each container to mirror logs to a central rsyslog
    container. Configure the central rsyslog container to send logs to
    <a href="https://zincsearch.com/">ZincSearch</a>.
  </li>
  <li>
    Uptime monitor<br />
    Setup a <a href="https://github.com/louislam/uptime-kuma">Uptime Kuma</a>
    container for uptime monitoring. I still need to setup additonal instances
    for off-site monitoring,
  </li>
  <li>
    End-to-end encryption<br />
    <b>From</b>: TLS termination at the reverse-proxy level<br />
    <b>To</b>:   TLS termination at the application-level/app-container level
  </li>
</ul>

I'll probably end up writing separate blog posts about each of those topics,
for my own note-taking if for nothing else.

