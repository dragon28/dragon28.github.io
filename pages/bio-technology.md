---
layout: page
show_meta: false
title: "Biotechnology"
subheadline: "Biotechnology"
header:
   image_fullwidth: "biotech_header_unsplash_5.jpg"
permalink: "/bio-technology/"
---
<ul>
    {% for post in site.categories.bio-technology %}
    <li><a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
