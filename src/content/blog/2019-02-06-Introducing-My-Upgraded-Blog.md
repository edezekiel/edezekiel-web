---
pubDate: 2019-02-06
title: 'Introducing My Upgraded Blog!'
description: ''
tags: ['react', 'ruby', 'projects']
---

I am happy to introduce the new and improved [edezekiel.com](https://www.edezekiel.com/)! I had so much fun creating this site and I hope you enjoy it.

As of this article, I only have ten days left before graduating from Flatiron. I can't believe the program is almost over. After graduation I'll begin looking for a web development position near my family in Memphis, TN.

Please read on if you are interested in learning more how my site works under the hood.

## The Stack

I built the backend of my new blog using Rails, and the frontend using React. Here are links to the [frontend](https://github.com/edezekiel/frontend-react-rails-blog) and [backend](https://github.com/edezekiel/backend-react-rails-blog) on Github.

## Deployment

Selecting the right place to host my frontend and backend took a lot of research. I eventually landed on Netlify (frontend) and Heroku (backend). Both of these services streamline deployment for the kind of web app I wanted to build.

## Login and Authentication

Although it's not publicly displayed, my site does feature a log in system. This system lets me create and save new articles from the browser. (More on the article publishing feature in a moment). Authentication is token-based, using JSON Web Tokens to encrypt confidential information.

## Creating New Articles

My favorite feature in the new site is that I can create and save new articles from the website itself. After logging in, I navigate to a New Article tab and type away in a textarea.

Text is saved in local state using React, and immediately rendered to an "Article Preview" component. I can even draft inline styling in HTML/CSS as I write the article. This is possible because of the [html-react-parser](https://www.npmjs.com/package/html-react-parser) package on npm. The parser converts HTML strings into React elements. Therefore, I can save an "article" on my backend/in state as a simple Javascript string. The string can include html tags. Then, the Parser converts the simple string into a React Component.

## Flirting With a Static Site

There are a lot of options for creating your own blog. It can be as simple as loading up a new Wordpress site, or as involved as coding the full stack yourself. I discovered there are also options inbetween. For example, Gatsby JS lets you build a static site with React and GraphQL. This setup virtually eliminates the need for a backend like Rails.

I ultimately decided not to build my blog using Gatsby. The Gatsby community is not as developed as Rails and you have to learn GraphQL to get started.

## Closing Thoughts

Thank you for reading this post. I am currently working on my final Flatiron project and can't wait to share the details soon.
