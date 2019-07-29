---
title: Weathered Radio
description: ""
publishdate: 2019-06-23
slug: weathered-radio
categories: blog
tags: [rtl, radio, weather]
---

<p>
  A while ago, I wrote about <a href="/blog/aqueous-radio/">listening-in to our
  wireless water meter with a USB SDR</a>. A while after that, we received a
  weather station that includes a wireless sensor to measure the weather
  outside:
</p>

<img src="/images/weathered-radio/acurite.jpg"
  alt="Acurite weather station and wireless sensor" />

<p>
  With the excellent <a href="https://github.com/merbanan/rtl_433">rtl_433</a>
  utility, it was quite easy to get a reading off of the wireless sensor. The
  following script will launch `rtl_433` for 30 seconds and output the readings
  in JSON format. We then use `jq` to select only the readings specific to our
  sensor by filtering by sensor id (there are a couple other wireless sensors
  around it seems), keep only the last reading, do some calibration with `jq`
  again and write the final JSON to a file. I then point nginx to that file,
  serve it with a 'application/json' Content-Type and boom: <a
  href="https://weather.chromic.org/">local weather accessible remotely</a>.
  Why? No idea, but it's kind of neat.
</p>

{{< highlight bash >}}
#!/bin/bash

# output dir
dir="/tmp"


# Run rtl_433 for 30 seconds (the sensor returns data every 16s, but whatever)
/usr/bin/rtl_433 -R 40 -F json -T 30 | \
# Filter out everything we received except data from our sensor (id=2168)
jq --unbuffered -c 'select(.id == 2168)' | \
# Only keep a single reading
tail -n 1 | \
# We subtract "3" from the temperature reading since the sensor seems to
# consistently be around 3 degrees too high
jq --unbuffered '.temperature_C = .temperature_C - 3' > "${dir}"/weather.new.json

# Overwrite the old file with the new data
mv "${dir}"/weather.new.json "${dir}"/weather.json
{{< / highlight >}}


<p>
  I use the following systemd timer/service to have the script above run every
  15 minutes:
</p>

<figure>
  <figcaption>weather.timer</figcaption>
{{< highlight SYSTEMD >}}
[Unit]
Description=Update weather info every 15mins

[Timer]
OnBootSec=15min
OnUnitActiveSec=15min

[Install]
WantedBy=timers.target
{{< / highlight >}}
</figure>

<figure>
  <figcaption>weather.service</figcaption>
{{< highlight SYSTEMD >}}
[Unit]
Description=Update weather info

[Service]
Type=oneshot
ExecStart=/home/chimo/scripts/weather.sh
{{< / highlight >}}
</figure>

