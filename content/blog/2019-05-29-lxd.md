---
title: Tripping on LXD
description: ""
publishdate: 2019-05-29
lastmod: 2019-06-04
slug: lxd
categories: blog
tags: [lxc, lxd, containers]
---

<p>
  Don't mind me; I'm just jotting down a couple of issues I ran into while
  messing around with LXD.
</p>

<!--more-->

<h2>fallocate</h2>

<p>
  TL;DR: Alpine Linux container running in a storage pool setup on a ext3
  filesystem is not a good combo (in some situations). ext4 is a working
  alternative.
</p>

<p>
  At the moment, most of my containers are running the popular <a
  href="https://alpinelinux.org">Alpine Linux</a> distribution. When I tried
  running MariaDB (v10.3.15) for the first time, I ran into an error that said
  "InnoDB: Could not set the file size of './ibdata1'. Probably out of disk
  space" despite having plenty of free disk space. Searching for the issue
  returns this <a href="https://bugs.alpinelinux.org/issues/9046">bug
  report</a> on the Alpine Linux bug tracker. We'll get back to this in a
  moment.
</p>

<p>
  Along the way, I was also trying to setup a beanstalkd instance, and that one
  was spitting out the following error at startup before dying: "filewopen:
  falloc /var/lib/beanstalkd/binlog.1: Not supported". Okay, so either
  beanstalkd and MariaDB have the same underlying bug, or the problem lies
  elsewhere. The above bug report has some more interesting information we
  should look at.
</p>

<p>
  The first thing in the bug description mentions "Mariadb now is using native
  Linux fallocate for creating the ibdata file. It fails in alpine edge and
  alpine 3.8 running as containers.", some people in the thread mentioned a few
  settings that did not solve the issue in my case. Other people mentioned that
  their problem was due to the fact that they are using ZFS as a storage pool
  and ZFS doesn't support `fallocate`.
</p>

<p>
  Since I'm just playing around with LXD, I mostly kept to the default settings
  during the initial setup, so I'm just using a directory structure on the host
  as a storage pool. That led me to wonder what kind of filesystem I was using
  (this server was first setup a long time ago). The answer to that was "ext3".
  Well, surprise-surprise, ext3 doesn't support `fallocate`. So the solution
  for me was to convert the host's filesystem from ext3 to ext4.
</p>

<h2>Unpack failed, Failed to run: unsquashfs</h2>

<p>
  The other issue I ran into so far is the following error message when running
  `lxc launch` to create a new container: "Error: Failed container creation:
  Create container from image: Image create: Unpack failed, Failed to run:
  unsquashfs". A search for that led me to <a
  href="https://github.com/lxc/lxd/issues/5449">this bug report</a> in the LXD
  tracker. The <a
  href="https://github.com/lxc/lxd/issues/5449#issuecomment-469349723">workaround</a>
  in my case was to remove the "LimitNOFILE=infinity" instruction I had added
  as a systemd override to the lxd.service.
</p>

<h2>The host can't communicate with the containers</h2>

<p>
  So, I have a different LXD instance running at home. This one's networking is
  configured to use macvlan instead of the default lxcbr so that the containers
  look like any other machines on the network. That is, they receive an IP
  address via DHCP reservation from the home router (I prefer managing IP
  addresses, reserved or otherwise, in a central location instead of
  configuring static IP addresses on every container).
</p>

<p>
  At some point I realized that while my other machines could communicate with
  the containers, the host machine running LXD could not. It turns out that,
  since the host machine was also getting its IP address via DHCP reservation,
  I had overlapping routes on the eth0 interface and the macvlan interface:

  <code style="display: block;">
    default via 192.168.10.1 dev macvlan0 proto dhcp src 192.168.10.50<br />
    default via 192.168.10.1 dev eth0 proto dhcp src 192.168.10.42<br />
    192.168.10.0/24 dev macvlan0 proto dhcp scope link src 192.168.10.50<br />
    192.168.10.0/24 dev eth0 proto dhcp scope link src 192.168.10.42<br />
  </code>
</p>

<p>
  Removing the routes from eth0 fixes it issue. To make the change permanent, I
  created /etc/dhcpcd.exit-hook (I'm using dhcpcd) and added the following
  content:

  <code style="display: block;">
    ip route del default dev eth0<br/>
    ip route del 192.168.10.0/24 dev eth0
  </code>
</p>

