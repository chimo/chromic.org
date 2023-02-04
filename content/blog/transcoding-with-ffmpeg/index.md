---
title: Transcoding and Streaming with ffmpeg
description: ""
publishdate: 2023-02-03
categories: blog
tags: [ffmpeg]
---

<div class="p-summary">
  Another note-to-self to document the commands I'm using to transcode video
  files from the desktop and stream it to the raspberrypi.
</div>

<!--more-->

On the desktop:
<pre>[chimo@desktop ~]$ ffmpeg -i S05E01.mkv -map 0 -c:v libx264 -crf 18 -vf \
    format=yuv420p -c:a copy -f matroska "tcp://0.0.0.0:1234?listen"</pre>

On the raspberrypi:
<pre>[chimo@raspberrypi ~]$ /usr/bin/xinit /usr/bin/ffplay tcp://desktop:1234 \
    -vf scale=1920:1080 -- :0 -nolisten tcp vt1</code>

