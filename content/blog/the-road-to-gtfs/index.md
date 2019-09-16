---
title: The Road to GTFS
description: "The story of how gtfs.chromic.org came to be."
publishdate: 2019-09-17
categories: blog
tags: [gtfs, transportr, android, navitia]
---

<div class="p-summary">
  <p>
    Pretty much every blog post here relates to <a
    href="https://chromic.org/blog/project-autonomous/">Project Autonomous</a>
    in a way or another. This blog post does as well. This time, I'm telling
    the story of how <a href="https://gtfs.chromic.org">gtfs.chromic.org</a>
    came about.
  </p>
</div>
<!--more-->

<p>
  TL;DR: I want to self-host the public transportation data I'm interested in.
  <a href="https://www.navitia.io/">Navitia</a> is really, really cool, but
  also way overkill for this particular project. So I built a <a
  href="https://code.chromic.org/chimo/gtfs">simple, private "API"</a> (it only
  has a single function at the moment) over the database created by the
  `pygtfs2db` utility.
</p>


<h2 id="transportr">Transportr</h2>

<p>
  The logical step after self-hosting a bunch of services was to find
  Android apps that can integrate with them. While working on my <a
  href="https://chromic.org/blog/my-android-stack/">Android Stack</a>, I ran
  into the excellent <a
  href="https://f-droid.org/en/packages/de.grobox.liberario/">Transportr</a>
  app. I'm not self-hosting the service behind Transportr, but having a FLOSS
  public transport app is a big win.
</p>

<p>
  Transportr didn't support my region at first but digging into how the app
  works, I discovered that it uses <a href="https://www.navitia.io">Navitia</a>
  as a data source. After a bit of fiddling around, I <a
  href="https://github.com/grote/Transportr/pull/157">submitted a
  pull-request</a> to have the region added.
</p>


<h2 id="navitia">Navitia</h2>

<p>
  As mentioned, I learned about navitia while poking around the Transportr app.
  One thing that caught my eye was the fact that <a
  href="https://github.com/CanalTP/navitia">Navitia itself is Free
  Software</a>. At some point, mostly just for fun, I had a <a
  href="http://sn.chromic.org/notice/1060525">local instance of navitia</a>
  running for the province I live in. This was a very interesting experiment,
  but with the limited hardware that I have, it's not viable for me to keep
  running this for essentially a single user using a single transit agency.
</p>

<h2 id="gtfs">GTFS and pygtfs</h2>

<p>
  Naturally, diving into how Navitia works I ran into <a
  href="https://en.wikipedia.org/wiki/General_Transit_Feed_Specification">GTFS
  data</a>, which is pretty interesting on its own. Since this is really all I
  need for this use-case, I looked for a utility to convert GTFS into a working
  database. One of them was <a
  href="https://github.com/jarondl/pygtfs">pygtfs</a>.
</p>


<h2 id="gtfs-chromic-org">gtfs.chromic.org</h2>

<p>
  Using `pygtfs`'s `pygtfs2db` utility, I periodically get a copy of <a
  href="https://www.octranspo.com/en/plan-your-trip/travel-tools/developers/">my
  transit's GTFS data</a> and import it into a PostgreSQL database. A simple <a
  href="https://code.chromic.org/chimo/gtfs/src/branch/master/public/api/index.php">simple
  PHP script</a> takes requests (an agency ID and a stop ID), queries the
  database and spits out the next three trips at the given bus stop. This,
  along with the <a
  href="https://www.octranspo.com/en/plan-your-trip/travel-tools/developers/dev-doc">GPS
  live-tracking API provided by my transit agency</a> is all I need on a
  day-to-day basis.
</p>

