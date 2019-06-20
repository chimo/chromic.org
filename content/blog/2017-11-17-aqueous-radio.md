---
title: Aqueous Radio
description: "Using SDR and Grafana to graph water consumption"
publishdate: 2017-11-17
lastmod: 2017-11-17
slug: aqueous-radio
categories: blog
tags: [sdr, radio, grafana, graph, water]
---

<figure>
  <img src="/images/aqueous-radio/amr-water.png" alt="" />

  <figcaption>Automated Meter Reading (AMR) module</figcaption>
</figure>

<p>
  <i>"I wonder what that thing is…"</i><br />
  Is what I thought when I saw the "thing" in the picture above stuck to our
  house when we moved in almost four years ago. I then promptly
  forgot about it as I got busy with other things.
</p>

<p>
  Last summer however, I was walking around the expanding neighborhood near
  construction sites. I must've been in a particularly inquisitive mood and
  my eyes happened to focus on one of those "things" on another house. I
  decided that the mystery needed to be solved so I walked back home and did
  a bit of research (fancy way of saying I ran two or three web searches).
</p>

<p>
  As most people already know, that thing is an Automated Meter Reading
  (AMR) transceiver device for utility meters. This specific one is from the
  <a href="http://itron.com/na/technology/product-services-catalog/products/3/c/a/water-endpoints">100 Series by Itron</a>.
</p>

<h2>Cool Story, Bro</h2>

<p>
  Mystery solved, right? Nope! Now I need to know how it works. And since it's
  wireless technology, now I need to know if there's a way for me to tap into
  it and see what kind of information I can get from it.
</p>

<p>
  So I put on my robe and researcher hat, and hit up the good old search engine
  again. Not long after, I find that somebody wrote a <a href="https://github.com/bemasher/rtlamr">software defined radio
  (SDR) receiver for Itron compatible smart meters</a>. <em>Nice!</em>
</p>

<p>
  I do a bit more research and end up getting this
  <a href="https://www.nooelec.com/store/sdr/sdr-receivers/nesdr-mini-rtl2832-r820t.html">USB receiver thingy</a>
  (RTL2832 + R820T) by NooElec.

  <img src="/images/aqueous-radio/nooelec.jpg" alt="RTL2832 + R820T by NooElec" />
</p>

<h2>Things are Happening</h2>

<p>
  With the above software/hardware combo I was able to receive data on the
  console, which is great, but wanted a way to get an overview over time.
</p>

<p>
  Around that same time, I had recently setup a "influxdb + telegraf + grafana"
  stack to gather SNMP data from by Ubiquiti devices (the instructions on how
  to do this are
  <a href="https://community.ubnt.com/t5/UniFi-Wireless/Grafana-dashboard-for-UniFi-APs-now-available/td-p/1833532">here</a>
  in case anyone's interested). So I thought using that same stack for the
  water meter data, somehow, would make the most sense.
</p>

<p>
  At some point I stumbled upon <a href="https://gist.github.com/andyleap/01601cc9cdf7d3708bb63d5867afc484">this gist</a>
  that does exactly that. A few tweaks here &amp; there and I have water
  consumption data in graph form!

  <a href="/images/aqueous-radio/grafana-overview.png">
    <img src="/images/aqueous-radio/grafana-overview.png" alt="Water consumption data, per day, in graph form" />
  </a>
</p>
