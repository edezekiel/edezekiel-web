---
pubDate: 2018-12-13
title: 'Where is the DOM?'
description: ''
tags: ['bootcamp', 'javascript']
---

**TLDR:** the browser parses an html file, creates the DOM, and stores the DOM in memory.

My blog post this week deals with the Document Object Model (DOM). If you are not familiar with this concept, Mozilla has a great explainer [here](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).

At Flatiron, we've discussed what the DOM is, why it's important, and how to access it. However, we haven't addressed where the DOM is stored, or how it gets there. For some reason I found this topic especially interesting this week. This blog post is about my journey exploring this topic.

### Down the Rabbit Hole - `window` and `document`

I recently watched the "JavaScript: Understanding the Weird Parts" [video](https://www.youtube.com/watch?v=Bv_5Zv5c-Ts) by Tony Alicia. If you skip to 29:00, he creates and opens an empty "app.js" file in the browser. The app.js file is completely empty.

After opening the browser, Tony launches chrome's dev console and enters the word `window`. Somehow, the console returned a `window` property that contained hundreds of key/value pairs. Entering `document` in the console for a blank site similarly yields some kind of pre-defined property.

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window), "the `window` interface represents a window containing a DOM document; the `document` property points to the DOM document **loaded** in that window."

### Loaded From Where?

As MDN explains above, the browser "loads" the `document` into the window. But where is the DOM? How does `document` know where to look?

After some googling I landed on this answer from [React Kung Fu](https://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/):

> "So, while HTML is a text, the DOM is an **in-memory representation** of this text."

In other words, the browser stores the DOM in RAM. My next question was how?

### The Rendering Engine - How HTML Gets Transformed Into the DOM

[Here's](https://link.medium.com/V8nfg6ioBS) an excerpt from a post on medium that answers how the DOM gets loaded into memory:

> The browser's rendering engine receives the contents of the requested document from the networking layer. The first step of the rendering engine is parsing the HTML document and converting the parsed elements to actual DOM nodes in a DOM tree.

This process can be broken down further into "conversion," "tokenizing", "lexing", and DOM "construction." See [this](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model) article by Google Web for more info.

### One Last Experiment With JavaScript Runtime Environments

Google Chrome's Javascript Engine is called [V8](https://v8.dev/). V8 is also used a JavaScript runtime environment called [Node.js](https://nodejs.org/en/).

Unlike Chrome, Node.js does not run in the browser. It didn't make sense to me to have a DOM without a browser, but I wanted to confirm. I started Node.js by entering `node` in my terminal, and then I entered `document`. As I expected, the terminal returned `ReferenceError: document is not defined`.

I hope you enjoyed reading this post!
