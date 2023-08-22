---
title: Dualbooting Alpine Linux on Dell XPS
description: ""
publishdate: 2023-08-22
lastmod: 2023-08-22
categories: blog
tags: [linux, ubuntu, archlinux, alpinelinux]
---

A while back, I got a Dell XPS machine that came with Ubuntu preinstalled. I've
been running Arch Linux on most of my machine for several years now, so decided
to install Arch Linux alongside Ubuntu.

Fastforward a few years: I've been interfacing more and more with Alpine Linux
lately and want to try it as a daily distro for a bit, so I've decided to
replace the Arch Linux install on the XPS with Alpine.

After [installing Alpine Linux on a separate
partition](https://wiki.alpinelinux.org/wiki/Dualbooting), I booted back in
Ubuntu and, `grub-mkconfig -o /boot/grub/grub.cfg` but it complained about an
unknown filesystem when looking at the Alpine partition. A bit of searching led
me to a [StackExchange post](https://askubuntu.com/a/1131970) that mentions:

> When an ext4 filesystem has the metadata_csum_seed feature enabled, then
> grub-install will not work and report this grub-install: error: unknown
> filesystem error.
>
> [...]
>
> you can disable the feature with `tune2fs -O
> ^metadata_csum_seed /dev/sda1`

When running the `tune2fs` command, I was greeted with:

> tune2fs: Filesystem has unsupported read-only feature(s) while trying to open
> /dev/sda1

It turns out that the version of `tune2fs` on Ubuntu [is
older](https://askubuntu.com/a/1042249) than the one that ships with Alpine
Linux, so I booted the Alpine Linux live USB I had around from the install, ran
the `tune2fs` command, booted back in Ubuntu and then `grub-mkconfig` ran
properly.

