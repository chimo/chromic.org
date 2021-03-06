---
title: Renewed
description: "Plans for chromic in the near-future"
publishdate: 2017-03-04
lastmod: 2017-03-07
categories: blog
tags: [chromic, plans, meta]
---

<div class="p-summary">

I just renewed the chromic.org domain for another two years:

<blockquote class="embedded-notice" style="margin-top: 12px;">
  <section>
    <a href="http://sn.chromic.org/chimo" title="chimo">
      <img src="https://avatars.chromic.org/avatar/1dfffb55178d6085935eafacf1a383a1?size=48&amp;default=http%3A%2F%2Fsn.chromic.org%2Ftheme%2Fpretty-simple%2Fdefault-avatar-stream.png" width="48" height="48" alt="Chimo"> Chimo</a>
    <article style="margin-top: 8px;">
      Boop! Renewed chromic.org. You guys are stuck with me for at least another two years.
    </article>
    <footer>
      <a href="http://sn.chromic.org/conversation/1081528#notice-1237454">In conversation</a>
      <time datetime="2017-03-03T15:52:54-05:00" title="Friday, 03-Mar-2017 15:52:54 EST">about 10 hours ago</time>
      from web <a href="http://sn.chromic.org/notice/1237454">permalink</a>
    </footer>
  </section>
</blockquote>

<p>
  The act of renewing the domain kind of felt like the beginning of a new year,
  somehow. A good time to reflect on what I've done with the domain since last
  time I renewed it, to think about where it's going, what the future projects
  are.
</p>

<p>
  I'm not going to lay down plans for the next two years in this post because
  frankly, I haven't thought about it that far ahead. But I can try to give an
  overview of the plans I have for the near-future. Maybe publishing those plans
  here is going to give me a reason to get to them faster than I normally would.
</p>
</div>

<!--more-->

## Serving DNS

Right now, I'm hosting a bunch of stuff (including this blog) on Linode, and
I'm using Linode's nameservers for DNS. Everything's been working well, but
I want to try and run my own DNS server for my (sub)domains. There are a couple
of reasons for that. One reason is
"[Project Autonomous](https://chromic.org/blog/project-autonomous/)" driven: don't
rely on third-parties whenever possible. The other reason is because Linode's
nameservers don't support DNSSEC, which brings me to my second item in my plans.

## DNSSEC

I want to implement [DNSSEC](https://en.wikipedia.org/wiki/DNSSEC). I'm not sure
what else to say about this other than "because why not!". I think it'll be
interesting and I might learn a couple of things along the way.

## DANE

I also want to implement [DANE](https://en.wikipedia.org/wiki/DANE), for the same
reasons listed for DNSSEC, really.

## Indieweb

The *.chromic.org "environment" has grown and evolved and changed over the years.
When I started fiddling around with all the platforms and things on here, I
wasn't aware of the Indieweb's [POSSE](https://indieweb.org/POSSE),
[webmentions](https://indieweb.org/webmention), etc. I kind of wedged webmentions
on here at some point, but I'd like to make Indieweb a first-class
"citizen" of this place.

For example, I can receive webmentions, but it's a bit of a pain to reply or
send them at the moment. I do have plans and tools in mind to fix this problem,
and I hope to get to it soon.

## HSTS

[<time datetime="2017-03-04T19:57:45-0500">2017-03-04</time> update: This is done!]

I don't know why, but I haven't enabled [HSTS](https://en.wikipedia.org/wiki/HSTS)
on my (sub)domains yet. I want to do that.

## Content Security Policy Headers

I want to enable restricitve
[CSP headers](https://en.wikipedia.org/wiki/Content_Security_Policy)
on all subdomains.

## Enable Brotli Compression via nginx

[<time datetime="2017-03-07T22:14:00-0500">2017-03-04</time> update: This is done!]

I want to enable [Brotli compression](https://en.wikipedia.org/wiki/Brotli) on
my nginx server. I need to [grab the module](https://github.com/google/ngx_brotli)
and compile nginx against it. Not a big deal. I might use the Arch Build System (ABS)
for that. I don't know yet.

## Home network (unrelated, bonus item)

This has nothing to do with the domain renewal or the Linode VPS, but since
I'm making a list of things I want to do I'm adding it here.

I recently got [a couple](https://www.ubnt.com/edgemax/edgerouter-x/) of
[network devices](https://www.ubnt.com/unifi/unifi-ap-wall/) that allow me greater
control over my network (compared to the generic ISP-provided router/modem I was
using before) and I need to sit down and configure my home network with the ideas
I have in mind.

Once that's done, I'm going to have a blog post dedicated to that configuration on here.

