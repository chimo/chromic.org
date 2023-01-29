---
title: DVD DRM and Regions
description: ""
publishdate: 2023-01-29
categories: blog
tags: [drm]
---

<div class="p-summary">
  A quick note-to-self regarding DVD drives and regions.
</div>

<!--more-->

<p>
  If you've been hitting your head against the wall like me due to <a
href="https://wiki.archlinux.org/title/Dvdbackup">dvdbackup</a> throwing "read
error returned - padding 512 blocks" even if you've triple-checked that you
have <a
href="https://archlinux.org/packages/community/x86_64/libdvdcss/">libdvdcss</a>
installed, then it might be due to your DVD drive not having its region set.
</p>

<ol>
  <li>Install <a
href="https://aur.archlinux.org/packages/regionset">regionset</a></li>
  <li>
    <pre>
$ regionset /dev/sr0 
Current drive parameters for /dev/sr0:
  RPC Type: Phase II (Hardware)
  RPC Status: no region code set (bitmask=0xFF)
  Vendor may reset the RPC 4 times
  User is allowed change the region setting 5 times
Would you like to change the region setting for this drive? [y/n]: y
Enter the new region number for your drive [1..8]: 1
New RPC bitmask is 0xFB, ok? [y/n]: y
Region code set successfully.</pre>
  </li>
</ol>

<p>
  You can find the list of regions here:
  <a
	href="http://linvdr.org/projects/regionset/">http://linvdr.org/projects/regionset/</a>
</p>

<ol>
  <li>North America (USA and Canada)</li>
  <li>Europe, Middle East, South Africa and Japan</li>
  <li>Southeast Asia, Taiwan, Korea</li>
  <li>Latin America, Australia, New Zealand</li>
  <li>Former Soviet Union (Russia, Ukraine, etc.), rest of Africa, India</li>
  <li>China</li>
</ol>

<p>
  Thanks to the <a
href="https://bbs.archlinux.org/viewtopic.php?pid=1574686#p1574686">Archlinux
forums</a> for the enlightenment.
</p>

