---
pubDate: 2021-06-24
title: 'Site Upgrade'
description: ''
tags: ['javascript', 'projects']
---

This post is about upgrading this site from Gatsby v2 to v3. I enjoyed the process and learned a lot about recent changes in the Gatsby ecosystem.

## Gatsby v3.6

Upgrading my site to v3 was long overdue. My npm audit has started getting out-of-hand and I was running into trouble installing the app on new machines.

I also just wanted a facelift for my site. I hadn't done any major style changes in about two years.

## The Upgrade Process

This whole upgrade started when I sat down and finally ran `npm audit fix` on the original repository for this site. Although it fixed a few issues, there were several remaining critical bugs that required major version updates.

So, I started running `npm update` on various packages and gatsby plugins. This turned out to be a rabbit hole and I quickly switched gears.

For a brief moment I considered writing my own static site generate using the fewest possible dependencies. Brian Robinson wrote an excellent article on creating a [custom static site generator](https://www.smashingmagazine.com/2020/09/stack-custom-made-static-site-generator/). Eventually I realized that programmatically creating _multiple_ pages would wind up getting tricky. I decided the cost of writing my own SSG would outweigh the time I'd have to spend learning/maintaining a Gatsby site.

My next step was to walk through the Gatsby v3 tutorials again with a fresh repository. I walked through each guide and learned about changes to the Gatsby ecosystem since I made this site two years ago.

I revisited the Gatsby tutorial docs to make sure my site's architecture was up-to-date. Unfortunately, the Gatsby [tutorial for v3](https://www.gatsbyjs.com/docs/tutorial/part-4/) only goes to section 4.

> Note: We're still working on updating this Tutorial to use Gatsby v3. You've reached the end of the new content we've released so far. Subsequent parts will be added as we finish them.

Thus, I had to refer back to plugin-specific docs and the v2 guide for information about plugins, programmatically creating pages from data, and preparing the site to go live.

At some point along the way I decided to just re-write the whole site from scratch. What you are looking at now is a fresh repository built from the ground-up.

## CSS Modules

One of the most significant changes to my blog is my use of CSS Modules. The prior version of this site had one css file for all styling. At the time, it seemed like one stylesheet would be sufficient for such a small site.

However, the css file did not seem so simple two years later. Instead, it seemed like an interconnected mess.

I decided to take a more formal approach to styling this time around. Wherever possible I used component-scoped css via CSS modules.

### Creating a CSS Module

To create a CSS module, I made a file following the naming convention of `[componentName].module.css`. So, for the `Nav` component I created a `nav.module.css` file. Then, I wrote CSS classes using native css syntax:

```css
.nav-links {
  display: flex;
  list-style: none;
  padding-left: 0;
}
```

Finally, I imported styles from the module file into the component and added the style as a className:

```javascript
// src/components/nav.js
import * as React from "react"
import { Link } from "gatsby"
import {
  container,
  navLinks,
  navLinkItem,
  navLink
 } from "./nav.module.css"

const Nav = () => {
  return (
    <header className={container}>
      <div>
        <Link to="/" className={navLink}>    
          Ed Ezekiel
        </Link>
      </div>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to ="/" className={navLink}>Home</Link>
          </li>
          <li className={navLinkItem}>
            <Link to ="/blog" className={navLink}>Blog</Link>
          </li>
          <li className={navLinkItem}>
            <Link to ="/about" className={navLink}>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav

```

### CSS and `composes`

One amazing feature of CSS Modules is that it lets you create sharable styles that are not global in scope. This is accomplished via the `composes` keyword. For example, I created a `/styles/shared.css` file with a container style:

```css
.container {
  margin: auto;
  max-width: 50rem;
  font-family: 'Times';
  padding: 0 2rem;
}
```

Then, I used the `composes` keyword in the `nav.module.css` file to apply the container styles to a new component-scoped `.container` class:

```css
.container {
  composes: container from '../styles/shared.css';
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1;
}
```

Finally, I imported that class into the component just like any other class from a CSS Module (see the import above in `src/components/nav.js`).

### Global Styles and CSS Variables

Despite using CSS Modules, I still wanted a simple way to apply a limited set of css globally. So, I made a `src/styles/global.css` file. My main use for the global.css file was to set a few global color variables:

```css
:root {
  --color-bg: #16161a;
  --color-bg-offset: #29293e;
  --color-text: #FFFFFF;
  --color-text-offset: #94a1b2;
  --color-border: #383a61;
  --color-primary: #7f5af0;
  --color-primary-offset:#e068fd;
}
```

Setting these styles globally meant that I could reference them from any of the CSS modules. For example, I referred to the `--color-text-offset` variable inside of the `postLinks.module.css`:

```css
.postDate {
  margin-bottom: .5rem;
  color: var(--color-text-offset);
}
```

## Code Highlighting

One pain point of my old site was the prismjs syntax highlighting. I didn't love the ultimate result, and it required overly complex configuration to get it working in Gatsby.

I did some research and came across this article by [Corinne Ling](https://corinneling.com/post/gatsby-syntax-highlighting/) explaining how to use VSCode styling in Gatsby. It only required one plugin, was incredibly easy to install, and producers cleaner-looking syntax highlighting.

## Dependencies

Another goal of mine during the upgrade process was to cut out as many dependencies as possible. This site ultimately servers a very narrow purpose: a home for my blog and a brief bio about me.

Each additional dependency means more maintenance and more mental overhead whenever I want to tweak something.

At the end of the day I cut down from 28 npm dependencies to just the following 16:

```javascript
  "dependencies": {
    "@mdx-js/mdx": "^1.6.22",
    "@mdx-js/react": "^1.6.22",
    "gatsby": "^3.6.2",
    "gatsby-plugin-google-analytics": "^3.7.1",
    "gatsby-plugin-manifest": "^3.8.0",
    "gatsby-plugin-offline": "^4.8.0",
    "gatsby-plugin-react-helmet": "^4.7.1",
    "gatsby-plugin-sharp": "^3.7.1",
    "gatsby-remark-vscode": "^3.2.1",
    "gatsby-source-filesystem": "^3.7.1",
    "gatsby-transformer-remark": "^4.4.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-helmet": "^6.1.0",
    "url-join": "^4.0.1"
  }
```

I'm really happy with how many dependencies I was able to get rid of. I think it will make it much easier to maintain and upgrade the site going forward.

## Conclusion

I had a lot of fun upgrading this site. I think this version of my blog has a cleaner look, and the code is better organized.

Thank you for reading!
