---
title: Gitea, Drone CI, Hugo and Auto-deployment
description: "Deploying my blog on git-push"
publishdate: 2019-07-31
lastmod: 2019-07-31
categories: blog
tags: [git, gitea, drone, hugo, blog]
---

<div class="p-summary">
  <p>
    This is an update to my previous blog post "<a
    href="https://chromic.org/blog/git-gogs-jekyll/">Git, Gogs, Jekyll and
    Auto-deployment</a>" since I've changed things up in the last four years.
  </p>
</div>
<!--more-->

<h2>The Static Blog Generator</h2>

<p>
  I've switched to <a href="https://gohugo.io">Hugo</a> from
  <a href="https://jekyllrb.com/">Jekyll</a>. A few reason are:
</p>

<ul>
  <li>
    Hugo seemed to generate the static files faster (I didn't run benchmarks or
    anything)
  </li>

  <li>
    A single Go executable is easier to manage than Ruby environments (and the
    `bundle` thing, or whatever -- I don't really care)
  </li>

  <li>
    The Hugo file structure seems cleaner (although that might just be me
    having more experience with static site generators overall)
  </li>
</ul>

<h2>Publishing</h2>

<p>
  I still just push to a git repository to trigger an update to the blog. I've
  switched my self-hosted git platform from <a href="https://gogs.io/">Gogs</a>
  to <a href="https://gitea.io/">Gitea</a>, however. The main reason is that,
  the development on Gogs <a
  href="https://github.com/gogs/gogs/issues/1304#issue-83270444">stalled for a
  while</a> and the community had some interesting ideas on the roadmap I
  wanted to play with.
</p>

<h2>The Hook</h2>

<p>
  Instead of calling a local custom script on the post-receive git hook, I'm
  using <a href="https://drone.io">Drone CI</a> to run `hugo` and `scp` the
  results over to the live blog. You can look at the <a
  href="https://code.chromic.org/chimo/chromic.org/src/commit/8c538af716878209d65938ce27267303ba106b3e/.drone.yml">.drone.yml
  file in the repository</a> for more info.
</p>

<p>
  Since <a href="https://chromic.org/blog/lxd/">I'm switching everything to LXC
  containers</a>, the blog and Gitea are in separate "environments" so I can't
  rely on the old post-receive git hook on Gitea to build the blog on-the-fly.
  Plus, this task is perfect for a CI pipeline and I've wanted to set something
  like this up for a while now. I'll probably end up using the pipeline for
  other things too.
</p>

