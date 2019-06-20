---
title: Running youtube-dl on Android via Termux
description: "Instructions on how to run youtube-dl on Android via Termux"
publishdate: 2017-05-16
lastmod: 2017-05-16
slug: youtube-dl-android-termux
categories: blog
tags: [youtube, youtube-dl, android, termux]
---

I recently got [youtube-dl](http://youtube-dl.org/) working on LineageOS nightly
via [Termux](http://termux.com/). Here are the steps I took:

<!--more-->

1. In Termux, install some of the tools we'll need:  
`packages install python wget vim`
2. Create a "bin" folder in the home directory: `mkdir bin`
3. Add the directory to your path at login: `vim .bashrc`  
export PATH=$PATH:~/bin
4. Exit and re-launch Termux to update your path: `exit`
5. Download youtube-dl: `wget https://yt-dl.org/downloads/latest/youtube-dl -O bin/youtube-dl`
6. Make it executable: `chmod u+x bin/youtube-dl`
7. Change the interpreter path in the youtube-dl file: `vim -b bin/youtube-dl`  
#!/data/data/com.termux/files/usr/bin/env python
8. Try it! `youtube-dl [URL]`

