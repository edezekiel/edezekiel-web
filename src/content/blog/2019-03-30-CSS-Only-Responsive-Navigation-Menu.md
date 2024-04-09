---
pubDate: 2019-03-30
title: 'CSS-Only Responsive Navigation Menu'
description: ''
tags: ['css', 'projects']
---

This week I focused on my CSS skills by building a responsive navigation bar without using Javascript.

I'm really happy with how this project turned out! Here is a link to the [codepen](https://codepen.io/edezekiel/pen/drrQzP?editors=1100). It's obviously not a full-fledged website, but I've wanted to build this kind of navbar ever since I started this blog.

The full desktop view displays a standard navbar links to various pages. If you view the site on a mobile device or if you shrink your browser window, you'll see that the navbar shrinks to the "hamburger" button style.

## Why This Project? Why No Javascript?

At Flatiron, we mostly used CSS frameworks like semantic UI or Bulma for navigation menu bars. I wanted to see what it would be like to implement a responsive navbar from scratch.

I decided not to use Javascript as a bit of a challenge. I just thought it would be fun to see what kind of advanced features I could build with CSS and HTML.

## Flexbox

Flexbox does a lot of the heavy lifting for this project. If you haven't used Flexbox before, or just need a refresher, I definitely recommend this [game](https://flexboxfroggy.com/) and this [site](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to get started.

## How does the "Hamburger" Menu Work Without JS?

The trick here has a few parts. First, add checkbox and label tags to the HTML. For the label I used the HTML unicode #9776\. This is technically called the "Trigram for Heavan" glyph, but people generally recognize it as the "hamburger icon."

Next, set the display for these elements to "none" in the stylesheet. After that, create a CSS media query for smaller screens, e.g., when the client is a mobile phone. On smaller screens the media query hides the navlinks and reveals the hamburger icon.

Clicking the hamburger icon toggles the navlinks back to flexbox display. However, the nav's position is fixed, and the navlinks flex-direction is set to "column." Taken together, this results in a hamburger menu that pops out navigation links.
