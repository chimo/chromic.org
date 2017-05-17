---
title: Transferred
description: "Changing domain registrars"
categories: blog
tags: [chromic, domain, registrar, meta]
---

<p class="p-summary">
  I've transferred the chromic.org domain from Dreamhost to Hover. Mostly because
  of UI/UX reasons.
</p>

<!-- more -->

Back in 2009, when I was looking to get a domain,
[I chose DreamHost for Shared Hosting](https://chromic.org/blog/the-web-and-i/#hosting).
They're also a registrar, so that's who I registered the domain with.

A couple of years later, [I moved the hosting part to 
Linode](https://chromic.org/blog/the-web-and-i/#vps)
and kept DreamHost as the registrar. Linode doesn't do domain registrations, and I never had any problems
with my domain over at DreamHost so I wasn't really looking for alternative registrars.

Recently, [I started looking into the possibility of implementing DNSSEC](https://chromic.org/blog/renewed/#dnssec),
and while DreamHost supports it (as long as you don't use their nameservers), I couldn't find the options
(DNS glue, DNSSEC fields) myself in the account settings. While hunting around for those, I realized that
the vast majority of everything I was seeing on the screen were menus/options completely useless to me
since I'm not hosting anything with them.

Then, I came across an [article that suggests I need to create a support ticket](https://help.dreamhost.com/hc/en-us/articles/219539467-DNSSEC-overview)
to have support complete the configuration. Blech. What is this? 1997? I never had to deal with DreamHost
support much, and the couple of times I contacted them they were quick to respond and helpful, but I'd very
much rather have the option to do this on my own.

I did a couple of searches to see what my options were and decided to move to Hover. They don't do hosting,
their UI focuses on domain-related features, and the glue/DNSSEC settings aren't hidden away multiple levels
deep or completely missing.

More importantly, I can set those up myself. Win!

The transfer itself went without a hitch. No suprises, no downtime, and ultimately transparent. So kudos
to both DreamHost and Hover for making that happen painlessly.
