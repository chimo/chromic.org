---
title: Trying Wayland
description: "My adventures trying to get rid of X11"
publishdate: 2019-03-21
lastmod: 2019-11-11
categories: blog
tags: [wayland, sway]
---

<p>
  Let me preface this by saying that I don't particularly dislike X11. I've used
  it for years, it did a pretty good job of getting out of the way, and most of
  the time I'm not really thinking about it.
</p>

<p>
  I've been stumbling on more and more articles and mentions about <a
  href="https://wayland.freedesktop.org/">Wayland</a>, however, and so I've
  decided to try to use Wayland, and applications running on Wayland
  exclusively. For this experiment, I consider XWayland cheating, so I disabled
  it in my Sway configs.
</p>

<!--more-->

<p>
  It's been working pretty well so far. Now granted, I have pretty simple
  needs. I run most things in the terminal, and then I need a browser because
  you kind of <em>have to</em> nowadays.
</p>

<h2>Window Manager</h2>

<p>
  The biggest push for me to start this experiment was hearing about <a
  href="https://swaywm.org/">Sway</a>, a drop-in replacement for the <a
  href="http://i3wm.org/">i3 window manager</a>. Given that i3 was the window
  manager I was running on X11, this seemed like an obvious choice. Sway, along
  with sway-bar, have been working very well.
</p>

<p>
  On X11, I was also using <a
  href="http://ibiblio.org/pub/Linux/X11/screensavers/">xautolock</a> to lock
  my screen after a period of inactivity. This has been replaced with <a
  href="https://github.com/swaywm/swaylock">swaylock</a>. This only thing I'm
  missing from xautolock is the ability to prevent auto-locking by placing your
  mouse cursor in a corner of your screen (ex: top-right). This might be
  something that swaylock supports, but I haven't looked into it very hard.
</p>

<h2>Terminal</h2>

<p>
  On X11, I was using <a href="http://st.suckless.org/">st</a>. On Wayland, I
  use <del><a href="https://github.com/majestrate/wterm">wterm</a>, which is an
  xterm replacement based on an st fork using wld</del> <ins><a
  href="https://github.com/jwilm/alacritty">alacritty</a> since I eventually
  ran into a <a href="https://github.com/majestrate/wterm/issues/9">few</a> <a
  href="https://github.com/majestrate/wterm/issues/7">issues</a> with wterm.
</p>

<h2>Browser</h2>

<p>I arbitrarily alternate between the following two browsers:</p>

<p>
  <a href="https://www.qutebrowser.org">qutebrowser</a> works on Wayland if you
  start it with the QT_QPA_PLATFORM=wayland environment variable. You can get
  rid of the window decorations by using the
  QT_WAYLAND_DISABLE_WINDOWDECORATION=1 environment variable as well.
</p>

<p>
  <a href="https://www.mozilla.org/en-CA/firefox/nightly/all/">Firefox
  Nightly</a> will use Wayland if you start it with the GDK_BACKEND environment
  variable set to "wayland".
</p>

<h2>PDF Viewer</h2>

<p>
  Firefox can open PDF files just fine, but I prefer my application with
  minimal window decorations so on X11 I was using xpdf. On Wayland, I use <a
  href="https://en.wikipedia.org/wiki/Zathura_(document_viewer)">Zathura</a>.
  This is a faily recent addition to my Wayland tools, and I try to avoid PDFs
  as much as possible, so my experience with Zathura is limited. It worked well
  the few times I used it though.
</p>

<h2>Image Viewer</h2>

<p>
  In the same vein as the PDF Viewer, I was using <a
  href="https://feh.finalrewind.org/">feh</a> as an image viewer. On Wayland, I
  use <a href="https://github.com/eXeC64/imv">imv</a>.
</p>

<h2>Screenshot Tool</h2>

<p>
  I replaced <a
  href="https://github.com/resurrecting-open-source-projects/scrot">scrot</a>
  with <a href="https://wayland.emersion.fr/grim/">grim</a>. It doesn't seem to
  have a <code>`--delay`</code> option like <code>`scrot`</code> does, but
  doing <code>`sleep 5 && grim screenshot.png`</code> works just as well.
</p>

<h2>Password Manager</h2>

<p>
  <a
  href="https://aur.archlinux.org/packages/pass-wl-clipboard/">pass-wl-clipboard</a>.
  This is <a href="https://www.passwordstore.org/">pass</a>, but patched with
  Wayland clipboard support. I'm using this package until the patch lands in an
  official release.
</p>

<p>
  As a related side-note, I'm using wl-clipboard instead of xclip to manage
  clipboard content from the CLI.
</p>

<h2>Notifications</h2>

<p>
  <a href="http://mako-project.org">mako</a> is in charge of displaying notifications.
</p>

<h2>Issues</h2>

<p>
  I've been running this setup for a least a month now and I ran in to very few
  issues so far. The only thing I can think of at the moment is copy/pasting
  from wterm to firefox doesn't work or pastes symbols I don't understand
  (Google says it's Chinese, but won't translate it oddly enough). It's not a
  big deal for me so I haven't investigated the issue further yet.
</p>

