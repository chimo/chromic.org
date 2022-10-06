---
title: vim
description: ""
publishdate: 2022-10-05
categories: blog
tags: [vim]
---

<div class="p-summary">
  Documenting my vim setup and plugins I'm using. It's pretty underwhelming,
  but I'm jotting this down here so I can keep track of how it evolves over
  time.
</div>
<!--more-->

<h2>.vimrc</h2>

Keep it simple:

{{< highlight VimL >}}
set background=dark " tell vim/plugins our background is dark
set expandtab       " convert tabs into spaces
set cc=80           " hightlight the 80th column (the default textwidth)
set number          " show line numbers
set shiftwidth=4    " four spaces per indentation level
set smartindent     " have vim figure out when to indent
set tabstop=4       " four spaces per 'tab' press
set updatetime=100  " Lessen delay so git-gutter appears more seamless
                    " Note: also controls the delay before vim writes its swap
                    " file

syntax enable       " pretty colours (syntax highlighting)
{{< /highlight >}}

<h2>Theme</h2>

None (so far). My terminal uses <a
href="https://ethanschoonover.com/solarized/">solarized</a> dark and vim just
goes with it:

<a href="/images/vim/vim.png"><img src="/images/vim/vim.png" /></a>

<h2>Plugin Loader</h2>

None (so far). I use vim's native "<a
href="https://vimhelp.org/usr_05.txt.html#add-package">package</a>" feature.
We'll see if I feel the need for something else later.

<h2>Plugins</h2>

<dl>
  <dt>
    <a href="https://github.com/rhysd/committia.vim">committia.vim</a></dt>
  <dd>
    "committia.vim splits the [git-commit] buffer into 3 windows; edit window,
    status window and diff window."<br /> Here is an example for this post's
    commit (meta!): <a href="/images/vim/committia.vim.png"><img
    src="/images/vim/committia.vim.png" /></a>
  </dd>
  <dt>
    <a href="https://github.com/airblade/vim-gitgutter/">vim-gitgutter</a></dt>
  <dd>
    "A Vim plugin which shows a git diff in the sign column. It shows which
    lines have been added, modified, or removed. "
  </dd>
</dl>

