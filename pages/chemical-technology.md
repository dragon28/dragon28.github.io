---
layout: page
show_meta: false
title: "Chemical Technology"
subheadline: "Chemical Technology"
header:
   image_fullwidth: "biotech_header_unsplash_5.jpg"
permalink: "/chemical-technology/"
---
{% assign posts = site.categories.chemical-technology %}
{% if posts.size > 0 %}
<ul>
    {% for post in posts %}
    <li><a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
{% else %}
<p>No articles in this topic yet. Browse the <a href="/blog/">latest articles</a> or the <a href="https://github.com/dragon28">GitHub projects</a>.</p>
{% endif %}
