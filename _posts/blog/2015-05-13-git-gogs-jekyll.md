---
title: Git, Gogs, Jekyll and Auto-deployment
description: "Deploying my blog on git-push"
modified: 2015-05-13
categories: blog
tags: [git, gogs, jekyll, blog]
---

<div class="p-summary">
<p>Since yesterday, this blog deploys automatically when I push changes to its git
repository. Before that, my workflow was something like:</p>
</div>
<!-- more -->

<ol>
  <li>ssh into the server</li>
  <li>write something</li>
  <li>git add, git commit, git push (or forget about this step altogether)</li>
  <li>bundle exec jekyll build</li>
</ol>

<p>Now, I do:<p>
<ol>
  <li>Write something (from any machine where I have a copy of my blog's git repository)</li>
  <li>git add, git commit, git push</li>
</ol>

<p>The best part for me is that I should now have a proper git history of my
blog's modifications instead of a few giant commits spaced far apart in time
due to skipping step 3 by mistake or laziness.</p>

<p>This isn't unique, has been done before, and a few
<a href="http://jekyllrb.com/docs/deployment-methods/#automated-methods">automated
deployment techniques are documented on the Jekyll site</a>, but I wanted to jot
down my configuration for a few reasons:</p>

<ul>
  <li>As a "note to self" so I can recall how it works if I need to set this up again</li>
  <li>I'm due for my yearly blog post (yes, I should write more)</li>
  <li>It might be helpful to other people using a similar list of tools</li>
</ul>

<h2>The Environment</h2>

<p>This blog is hosted on a VPS (Linode) that runs
<a href="http://chromic.org/blog/project-autonomous/">a few other products</a>,
notably <a href="http://gogs.io">Gogs</a> which I use to "self-host" my git projects.</p>

<p>One of those git projects is the <a href="https://code.chromic.org/chimo/chromic.org">
source files for the blog</a>.</p>

<p>Gogs lets you edit <a href="https://git-scm.herokuapp.com/book/en/v2/Customizing-Git-Git-Hooks">
git hooks</a> via its web interface under the git repository's "Settings > Git Hooks"
section. The one we're interested in is
"<a href="https://git-scm.herokuapp.com/book/en/v2/Customizing-Git-Git-Hooks#idp27140432">post-receive</a>",
which runs on the server-side after git is done receiving the changes you pushed
to it via "git push" from the client-side.</p>

<p>Since both Gogs and the Jekyll blog are on the same server, the only thing I
have to do is tell git to run the "jekyll build" command (along with some
house-keeping details) after it got the new data:</p>

{% highlight bash %}
#!/usr/bin/bash

mkdir -p /tmp/gogs-bundle               # Create directory where bundle will install required tools to build
export BUNDLE_BIN_PATH=/tmp/gogs-bundle # Set env. var used by bundle so it knows where to install stuff

cd /srv/http/chromic.org/public_html    # Change to the directory where the blog's source files are
unset GIT_DIR                           # Have git use $PWD instead of $GIT_DIR
git pull                                # Get latest changes

bundle install                          # Make sure we have all the required gems, etc. installed
bundle exec jekyll build                # Deploy!
{% endhighlight %}

<p>And that's pretty much it. Make sure the user running your Gogs instance has
access to the blog's files/directories and you should be good to go.</p>
