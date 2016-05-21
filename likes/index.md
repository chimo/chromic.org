---
layout: page
title: Items 'liked'
excerpt: "An archive of liked items sorted by date."
search_omit: true
---

<ul class="post-list">
{% for post in site.categories.likes %} 
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.title }} <span class="entry-date"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time></span></a></article></li>
{% endfor %}
</ul>

<p style="text-align: center;"><a href="//chromic.org/likes.xml" title="Atom/RSS feed"><i class="fa fa-rss-square fa-2x"></i></a></p>

