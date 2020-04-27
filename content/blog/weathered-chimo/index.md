---
title: Weathered Chimo
description: ""
publishdate: 2020-04-27
categories: blog
tags: [weather]
---

<p>
  So I haven't been on here for a while, huh? What's been happening? Not much.
  A lot. I don't know. Let's take it month-by-month. I suppose it's as good
  an approach as any. October was fairly standard and mostly uneventful.
  November and December were probably my favourite months in a very long time.
  January and February were a roller-coaster of very highs and very lows. March
  and April were pretty terrible, and no, it's (mostly) not related to that
  COVID-19 pandemic situation. Or at least I don't think so. All in all, I've
  come to the conclusion that I'll probably never really understand people, and
  I'm tired, and I'm not even sure I want to do "this" anymore.
</p>

<p>
  Anyway, for the most part, I haven't touched this whole "*.chromic.org"
  environment since my <a href="/blog/the-road-to-gtfs/">last post in
  September</a>. I don't think this post is indicative of a "return to a
  regular schedule". If things keep going this way, I don't think I'll have the
  energy/motivation to work on it much.
</p>

<p>
  So what am I doing here rambling about some random nonsense then? I found a
  draft post I'd started almost a year ago, around the time I was messing with
  weather data and wrote the <a
  href="https://chromic.org/blog/weathered-radio/">Weathered Radio</a> post. I
  figured I'd get it done and, who knows, maybe I'm wrong and I'll start
  posting more. So let's cut the crap and get to it, shall we?
</p> 

<!-- more -->

<p>
  This post is very specific to the <a href="https://weather.gc.ca">Environment
  and Climate Change Canada</a> (ECCC)'s data, so might not be very interesting
  or relevant to many people, but as always, these posts are mostly about
  reminding me how my own stuff works.
</p>

<p>
  The recurring theme on this blog is about self-hosting the data that I'm
  using. Unfortunately, I can't really go out and setup weather stations all
  over the place, so next best thing is to consume external data in a way that
  reduces the number of third-parties/tracking/etc.
</p>

<p>
  In short, I have a small <a href="https://code.chromic.org/chimo/weather">PHP
  script</a> that takes a pair of latitude/longitude coordinates, finds the
  closest ECCC weather station and returns the current temperature.
</p>

<p>
  This in itself isn't very interesting, but the process of collecting the
  weather station data was a fun exercise (an exercise that wouldn't have been
  necessary if they'd just provide an API... but hey, whatever.) It was also
  the first time (or one of the few times) using PostGIS, so that was also fun.
</p>

<p>
  Most of the work is done via the <a
  href="https://code.chromic.org/chimo/weather/src/branch/master/private/src/scripts/import_sites.php">import_sites.php</a>
  script. It parses ECCC's "<a href="http://dd.weatheroffice.ec.gc.ca/citypage_weather/xml/siteList.xml">siteList</a>" XML file, then fetches and parses each
  <a href="http://dd.weatheroffice.ec.gc.ca/citypage_weather/xml/BC/s0000671_e.xml">weather station's XML file</a> to extract its location. It then inserts the
  weather station's information into the postgres database.
</p>

<p>
  That's pretty much it. Pretty simple, turns out.
<p>

