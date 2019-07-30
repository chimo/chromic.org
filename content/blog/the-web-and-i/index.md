---
title: The Web and I
description: "My journey with the Web"
publishdate: 2013-12-16
lastmod: 2013-12-16
categories: blog
tags: [sysadmin, foss, floss, autonomous, web]
image:
  feature: electronic-kit.jpg
  credit:  Jeff Keyzer
  creditlink: http://www.flickr.com/photos/mightyohm/2729474646/
---

<div class="p-summary">
<h2 id="beginning">And so it Begins</h2>
<p>I've always been fascinated by electronics and computers.</p>
<p>I remember spending countless hours messing around with one of those "Electronic Project Kits" similar to the one pictured above.</p>
<p>I followed every instruction in the book, went off-course and tried new things.</p>
</div>
<!--more-->

<h2 id="html">HTML</h2>
<p>Sometime around 1996 (at approximately 11 years old), my school organized a few different summer camps. One of them was computer related and, of course, piqued my interest.</p>
<p>During the summer, we worked on a few different projects. The one I remember best was creating websites, and if I recall correctly, this was my first introduction to HTML.</p>
<p>My website definitely looked like the classic Geocities site with &lt;blink&gt; and &lt;marquee&gt; tags, tacky .gifs, non-semantic &lt;font&gt; and tiled background patterns, and I was damn proud of it!</p>
<p>Once the camp was over, I went back home, built websites with Notepad and saved them on my C:\ drive since we didn't have home Internet at the time. I didn't have an audience&nbsp;&mdash; and probably still don't <abbr class="emoticon" title="wink">;)</abbr>&nbsp;&mdash; learned by trial and error, but I was learning and had fun doing it.</p>

<h2 id="online">Online!</h2>
<p>Once we got the Inter-tubes connected to our house, I started signing up for those "free hosting" sites that would give you a free subdomain.</p>
<p>More often than not, they would either announce that they're shutting down or going "paid only" after a while, forcing me to hop from host to host.</p>
<p>Some of them would display banner ads on your site, which I took as a challenge to come up with some "clever CSS" to hide them&nbsp;&mdash; unknowingly, but undoubtedly against their ToS.</p>
<p>One of the more vivid memories I have is how excited I was when I discovered Server-Side Includes (SHTML / SSI). I was browsing <a href="http://www.yourhtmlsource.com/">HTML Source</a>; one of the first websites I remember using as a reference. Every time I go back on that site I get a big hit of nostalgia <abbr class="emoticon" title="smiley face">:)</abbr></p>

<h2 id="services">Third-party Services</h2>
<p>LiveJournal, Blogger, Wordpress(.com), Xanga, Flickr, you-name-it&hellip; I signed-up for all of them.</p>
<p>I did so mostly out of curiosity to see how they worked and keep up with the new things appearing on the web.</p>
<p>Most of those allowed you to create custom themes with your own CSS stylesheets and sometimes even include your own JavaScript!</p>

<h2 id="oss">Open Source</h2>
<p>This isn't directly related to the web, but it plays an important role in what follows.</p>
<p>While I was in university, I was introduced to Linux and the whole concept of Free, Libre Open Source software (FLOSS).</p>
<p>I really liked the idea and soon thereafter all my machines were running some sort of Linux distro.</p>
<p>My experiments with Linux could be a little story on its own, and I might just write about it someday.</p>

<h2 id="hosting">Legit Hosting</h2>
<p>In 2009, I was 2 years out of university, had a job and a bit of money to invest into a host that was a bit more reliable than those free ones.</p>
<p>After thinking way too much about a domain name, I settled on "chromic" mostly because my online nickname, Chimo, is part of it (genius, I know, right?).</p>
<p>Since this was my first shot at paying for hosting, I looked for something inexpensive and chose <a href="http://dreamhost.com">Dreamhost</a> Shared Hosting.</p>
<p>One of the first things I did was to setup a Wordpress instance on there to move off Wordpress.com, "customize ALL the things!" and dive into the source code.</p>

<h2 id="identica">Identicaaaargh!</h2>
<p>Because of my obsession with Linux, I started listening to the <a href="http://linuxoutlaws.com">Linux Outlaws</a> podcast.</p>
<p>After hearing them talk about this "identi.ca" thing a couple of times, I decided to check it out. My limited understanding was that it was an open source version of Twitter. It sounded fun &amp; intriguing and was eager to look through the source code as a learning exercise.</p>
<p>This is when I became aware of the "<a href="http://en.wikipedia.org/wiki/Distributed_social_network">federated social network</a>" concept which, coupled with (FL)OSS, I thought sounded like an awesome idea.</p>
<p>It's one of the reasons why I got interested in Identi.ca and StatusNet.</p>
<p>Another reason was because the <a href="http://oracle.skilledtests.com/group/fediverse">!fediverse</a> community seemed like it matched my interests a lot closer than Twitter's or other social networks. Or at least those people were a lot easier to find, and usually more "approachable" in a sense. Conversations also seemed more interesting and "deeper", people more engaged.</p>
<p>Part of it is probably because Identi.ca's user-base was smaller compared to the bigger networks. Maybe the culture <em>actually is</em> different as well. I don't know. Either way, the <a href="http://oracle.skilledtests.com/group/fediverse">!fediverse</a> is where I felt the most "at home".</p>
<p>(Un)fortunately, identi.ca <a href="http://whird.jpope.org/identifailed-me-last-time/">sometimes had problems</a> with its uptime and general reliability, and after a while it started to happen too often for my taste.</p>
<p>This led me to look into hosting my own StatusNet instance, and I believe that while it might have been a minor annoyance at the time, it really was a good thing in the end.</p>
<p>I got lucky and StatusNet was one of Dreamhost's "one-click install" products. So I clicked. And it installed. And it was slow. And Realtime wasn't reliable (or not there at all, I can't quite remember now), but it was <em>mine</em>.</p>

<h2 id="vps">Graduating to a <abbr title="Virtual Private Server">VPS</abbr></h2>
<p>In 2011, I felt like being on a Shared Host was too limiting (I really wanted Realtime running on my <abbr title="StatusNet">SN</abbr> instance, too!).</p>
<p>After a bit of research, I found that <a href="http://linode.com">Linode</a> had good reviews and within my budget, so I dove right in and got a shiny VPS.</p>
<p>Oh, the freedom! Suddenly I could do anything I wanted! Want to tinker with your Apache configurations and bring everything down? You can! And I did! Multiple times!</p>
<p>Want to run a persistent process and eat all of your RAM? Yep! Been there, done that!</p>
<p>Want to deal with MySQL logs and fine-tuning? No? Well you still have to!</p>
<p>Of course, these are all things I ultimately enjoy doing and really like learning from so I don't mind.</p>
<p>As you can imagine, I then went ahead and setup a StatusNet instance, this time taking care of all the fun things related to web servers, databases, etc.</p>
<p>Administering a VPS&nbsp;&mdash; even a small, personal one&nbsp;&mdash; is something I highly recommend to anyone interested in learning sysadmin-type material. The amount of things I learned while tinkering with mine is astounding.</p>

<h2 id="today">Today</h2>
<p>I work full-time with HTML, SASS/CSS, jQuery/JavaScript, <abbr title="Web Accessibility Initiative - Accessible Rich Internet Applications">WAI-ARIA</abbr> and <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>.</p>
<p>I tinker with a bunch of other languages.</p>
<p>I'm a big fan of owning your data (to a certain degree, I suppose; I don't own the hardware I'm hosted on&hellip; yet).</p>
<p>I'm continually working on my <a href="http://chromic.org/articles/project-autonomous#cont">Project Autonomous</a> which serves as both a way to own my data and also as a learning tool.</p>
<p>I'm still messing around with <a href="https://code.chromic.org/chimo">code</a> and tech.</p>
<p>I'm still fascinated by electronics and computers (I <abbr class="emoticon" title="love">&lt;3</abbr> my RaspberryPi), still a (FL)OSS advocate, Linux-running (Arch <abbr title="for the win">FTW</abbr>!), federation-supporting, rambling nerd.</p>

<h2 id="future">The Future</h2>
<p>Who knows!</p>
<p>I'm planning on tinkering with all this for a long time still.</p>
<p>Technology changes so often and so fast that I can't imagine getting bored of it.</p>
