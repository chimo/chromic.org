---
title: Containers? On MY machine?
description: "Some random notes about my main laptop"
publishdate: 2023-09-30
categories: blog
tags: [lxd, alpinelinux]
---

<cite>"It's more likely than you think."</cite>

<div class="p-summary">
  This is another post about different things I've been messing around with
  over the years, coming together and merging into what became my day-to-day
  machine.
</div>

<!--more-->

<h2>The Uninteresting Part</h2>

The back-story. I won't be offended if you skip this part. I get it; I always
scroll past that part on recipes websites. At least there are no ads here :D

I've been [messing with computers](/blog/the-web-and-i/) ever since I can
remember, and [hosting my own services](/blog/project-autonomous/) since
[around 2009](/blog/the-web-and-i/#hosting). Things changed a lot and often
along the way, of course, and one of the major changes was that I [started
looking into LXD](/blog/lxd) and eventually migrated all my services into
separate containers.

A side-effect of playing around with containers is: I started dealing more and
more with [Alpine Linux](https://alpinelinux.org) since it's a very popular
distribution to use in that context. It turned out that I quite enjoy Alpine,
so I [recently decided](/blog/dualbooting-alpinelinux-on-dell-xps/) to give it
a spin as my main, day-to-day operating system.

One of the things I try to do with my systems is to keep them as "minimal" as
possible (yes, "minimal" means different things to different people. I like
setting up everything from scratch, explicitly install every single package I
need and know exactly how everything works, as much as possible. No kitchen
sink, no blackbox magic). My first distribution was
[Slackware](http://www.slackware.com/), I hopped around for a bit until I
landed on [Archlinux](https://archlinux.org) and stuck with it for several
years (I still use it on all my machines except the XPS, which is running
Alpine now).

One of the things that happens when you run the same system over a certain
length of time is: you install things, configure them, try them out, uninstall
some, keep others, install new things, etc., etc. Which inevitably leads to a
bit of clutter (`~/.config` files, `/etc/` files, and so on), if you're not
diligent with removing all of those (which I am not).

So, in an effort to keep my brand-new, fresh-and-clean Alpine Linux install
clutter-free (but mostly as an experiment and just for fun) I decided to keep
the packages installed on the host at a minimum and install extra things in
containers. As you can probably guess, I chose LXD to run these extra things.
There are other, possibly better-suited, options out there. I do realize that,
but I like LXD and I'm having fun with the experiment, which is what matters to
me.

Side-note: as a bonus, those "extra things" run in a sandboxed environment.
(woo!)

<h2>The More Interesting Part</h2>

The "recipe" (finally!).

<h3>The Host</h3>

For the most part, on top of `alpine-base`, the kernel and drivers, I have:

* bluez
* foot
* git
* gpg
* lxd
* nftables
* openssh
* pipewire / wireplumbler
* sway / swaylock / swayidle
* tmux
* vim
* wayland
* wireguard
* wl-clipboard
* wpa_supplicant

At the time of writing, the total count of `/etc/apk/world` is 60 packages.
Granted, this number doesn't really mean much. Different distros package things
differently. Sometimes things get split-up or merged, but I'm writing this
here so I can look back and compare, because why not?

<h4>The dotfiles</h4>

Like many people do, I keep my dotfiles in a [git
repository](https://code.chromic.org/chimo/dotfiles), which I have cloned
locally in `~/devel/dotfiles/` and I symlink from `~/.config/` and others to
there:

{{< highlight bash >}}
aerc -> /home/chimo/devel/dotfiles/.config/aerc/
irssi -> /home/chimo/devel/dotfiles/.config/irssi/
lxc/
mbsync -> /home/chimo/devel/dotfiles/.config/mbsync/
mpv -> /home/chimo/devel/dotfiles/.config/mpv/
ncmpcpp -> /home/chimo/devel/dotfiles/.config/ncmpcpp/
newsboat -> /home/chimo/devel/dotfiles/.config/newsboat/
pulse/
qutebrowser -> /home/chimo/devel/dotfiles/.config/qutebrowser/
sway/
{{< /highlight >}}

<h3>The containers</h3>

I currently have the following containers running:

<dl>
  <dt><a href="https://aerc-mail.org/">aerc</a></dt>
  <dd>Mail client.</dd>

  <dt>devel</dt>
  <dd>
    Ephemeral container for development stuffs (right now there's nginx, php,
    etc. on there)
  </dd>

  <dt><a href="https://gohugo.io/">hugo</a></dt>
  <dd>
    Static site generator. To preview posts I'm writing for this blog.
  </dd>

  <dt><a href="https://irssi.org/">irssi</a></dt>
  <dd>IRC client.</dd>

  <dt><a href="https://isync.sourceforge.io/">mbsync</a></dt>
  <dd>Syncs my mailboxes locally.</dd>

  <dt><a href="https://mopidy.com/">mopidy</a></dt>
  <dd>Music server. Play music from various sources, MPD daemon.</dd>

  <dt><a href="https://mpv.io/">mpv</a></dt>
  <dd>Watch YouTube, Twitch.</dd>

  <dt><a href="https://rybczak.net/ncmpcpp/">ncmpcpp</a></dt>
  <dd>Music player client. MPD client for mopidy container (above).</dd>

  <dt><a href="https://newsboat.org/">newsboat</a></dt>
  <dd>
    RSS reader syncing with my <a href="https://www.freshrss.org/">FreshRSS</a>
    instance.
  </dd>

  <dt>
    <a
    href="https://docs.nextcloud.com/desktop/3.6/nextcloudcmd.html">nextcloud</a>
  </dt>
  <dd>
    `nextcloudcmd` running periodically to sync files between my
    <a href="https://nextcloud.com/">Nextcloud</a> instance and my local
    machine.
  </dd>

  <dt><a href="https://www.opensmtpd.org/">opensmtpd</a></dt>
  <dd>
    SMTP "relay" to send mail from aerc.
    <p>
      This allows me to "send" emails while offline and they'll get delivered
      whenever I get online again. This setup was inspired by <a
      href="https://drewdevault.com/2021/05/17/aerc-with-mbsync-postfix.html">Drew
      DeVault's blog post</a>.
    </p>
  </dd>

  <dt><a href="https://qutebrowser.org/">qutebrowser</a></dt>
  <dd>Browsing the intertubes.</dd>

  <dt><a href="https://git.tozt.net/rbw/tree/README.md">rbw</a></dt>
  <dd>
    Password manager integrating with my
    <a href="https://github.com/dani-garcia/vaultwarden">vaultwarden</a>
    instance.
  </dd>

  <dt><a href="https://signal.org/download/">signal</a></dt>
  <dd>Instant messaging.</dd>

  <dt><a href="https://tut.anv.nu/">tut</a></dt>
  <dd><a href="https://joinmastodon.org/">Mastodon</a> client.</dd>
</dt>

<h4>GUI and Audio in Containers</h4>

I've setup a ["gui" lxd
profile](https://code.chromic.org/chimo/lxd-scripts/src/branch/main/create-container/types/gui/assets/lxd.profile)
and a ["audio" lxd
profile](https://code.chromic.org/chimo/lxd-scripts/src/branch/main/create-container/types/audio/assets/lxd.profile)
based on the forum posts below. Whenever a container needs either one, or both,
I attach the appropriate profile(s) to it and things "just work"(TM).

* [[Howto] Use the Host's Wayland and XWayland Servers inside containers](https://discuss.linuxcontainers.org/t/howto-use-the-hosts-wayland-and-xwayland-servers-inside-containers/8765)
* [Audio (via Pulseaudio) inside
  Container](https://discuss.linuxcontainers.org/t/audio-via-pulseaudio-inside-container/8768) - Note:
  I don't use pulseaudio, but the concept applies to the Pipewire socket.

<h4>File Sharing</h4>

No, not the peer-to-peer kind. :)

Whenever containers need to share files, for example: I want "aerc" and
"mbsync" to [share the same mbox
directory](https://code.chromic.org/chimo/lxd-scripts/src/branch/main/create-container/aerc/assets/lxd.profile#L12-L15).
Or whenever the host and containers need to share files, for example: I want a
container to read config [files from
~/devel/dotfiles](https://code.chromic.org/chimo/lxd-scripts/src/branch/main/create-container/mpv/assets/lxd.profile#L8-L11),
I use LXD's shared folders (idmapped mounts) mechanism.

I've [automated the creation of my
containers](https://code.chromic.org/chimo/lxd-scripts/src/branch/main/create-container/create-container.sh)
and have pre-sets to apply either the "gui" and/or "audio" profiles and setup
the environment as-needed.

I can also provide one-off LXD profiles for containers that have specific
needs.

The script is pretty rudimentary. I have a bunch of TODOs planned and a bit of
a revamp after some "lessons learned", but it does the trick for my use-case.

Again, I know things that do this already exist. I'm also aware of cloud-init
and all that. But I prefer something that would work on a bare-metal host, on
cloud-init environments, as well as non-cloud-init environments, etc.

Most importantly, I'm just tinkering and having fun. /shrug

<h3>Container Backups and Updates</h3>

I have a [script that shows me pending
updates](https://code.chromic.org/chimo/swaybar-configs/src/branch/main/blocks/check-for-updates.sh)
in my swaybar, and another script I can run to [update one, several, or all
containers](https://code.chromic.org/chimo/lxd-scripts/src/branch/main/update-containers.sh). It takes a snapshot before applying any upgrade.

I've written about how I handle [updates](/blog/lxd-patching-strategy/) and
[backups](/blog/lxd-backup-strategy/) on my VPS before. Those processes run on
a schedule since the VPS is running 24/7.

<h2>Interacting with the Containers</h2>

I have a [set of
scripts](https://code.chromic.org/chimo/dotfiles/src/branch/main/.local/bin) in
`~/.local/bin/` (this folder is part of my `$PATH` environment variable) that
translate calls to container binaries into a `lxc exec` command.

This is a terrible explanation. Maybe some examples are better.

I have `~/.local/bin/aerc.sh` in which [the
content](https://code.chromic.org/chimo/dotfiles/src/branch/main/.local/bin/aerc.sh)
is essentially just `lxc exec aerc -- aerc`.

Some of the other scripts, such as
[newsboat.sh](https://code.chromic.org/chimo/dotfiles/src/branch/main/.local/bin/newsboat.sh)
set some options: `lxc exec newsboat -- sh -c 'newsboat -c
~/.config/newsboat/cache.db -C ~/.config/newsboat/config'`

Others (ex:
[irssi.sh](https://code.chromic.org/chimo/dotfiles/src/branch/main/.local/bin/irssi.sh))
have different behaviours depending on the arguments they are called with.

There might be better approaches, but this works for me and I find it quite
flexible.

