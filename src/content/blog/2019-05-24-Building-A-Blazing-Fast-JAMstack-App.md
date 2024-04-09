---
pubDate: 2019-05-24
title: 'Building a Blazing Fast JAMstack App'
description: ''
tags: ['javascript', 'jamstack', 'projects']
---

I recently attended a meetup in Memphis hosted by Bryan Robinson. He is an accomplished web developer with a focus on [creating static sites](https://bryanlrobinson.com/blog/2019/04/26/client-work-and-the-jamstack/).

This got me excited to finally build my own static site using JAMstack architecture! So, I built this [blog template (live)](https://zealous-thompson-59a9ca.netlify.com/) using GatsbyJS and Netlify. Here is the [Github Repo](https://github.com/edezekiel/gatsby-netlify-blog).

## Lighthouse Audit

I am very pleased with how the site turned out. I used the Lighthouse tool to audit the gatsby site and my blog. Lighthouse is built into the chrome browser. It is a great automated tool for performing webpage audits.

Here are the results:

### Lighthouse scores for my React/Rails blog

![rails-audit](https://i.imgur.com/md5bX64l.png)

The scores are not terrible, but there is definitely room for improvement.

### Lighthouse scores for the JAMstack site

![gatsby-audit](https://i.imgur.com/93kkJ1Zl.png)

The JAMstack site almost scores perfectly across the Lighthouse metrics. Navigating through the site reflects these scores: pages loading blazingly fast and it generally feels crisp.

## Resources

If you are interesting in exploring JAMstack further, here are some of resources I used while learning about this topic:

- [WTF is JAMstack?](https://jamstack.wtf/#getting-started) a straightforward primer on the JAMstack architecture.
- [Gatsby Tutorial](https://www.gatsbyjs.org/tutorial/): This will walk you through your first Gatsby app. There are plenty of "starters" on the site to help you get your first site up and running. I personally used the [gatsby default starter](https://github.com/gatsbyjs/gatsby-starter-default).
- [Netlify](https://www.netlify.com/)
- [Tania Rascia](https://www.taniarascia.com/migrating-from-wordpress-to-gatsby/): aka my web dev hero.
