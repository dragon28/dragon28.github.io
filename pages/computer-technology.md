---
layout: page
show_meta: false
title: "Computer Technology"
subheadline: "Computer Technology"
teaser: "Computer Technology"
header:
   image_fullwidth: "header_homepage_13.jpg"
permalink: "/computer-technology/"
---
{% assign posts = site.categories.computer-technology %}
{% if posts.size > 0 %}
<ul>
    {% for post in posts %}
    <li><a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
{% else %}
<p>No articles in this topic yet. Browse the <a href="/blog/">latest articles</a> or the <a href="https://github.com/dragon28">GitHub projects</a>.</p>
{% endif %}
