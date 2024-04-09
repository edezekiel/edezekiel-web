---
pubDate: 2018-12-21
title: 'fetch() - A Line-By-Line Walkthrough'
description: ''
tags: ['javascript', 'bootcamp']
---

Learning the `fetch` API can be a struggle. It certainly was for me. Even when I got it working I had trouble explaining why it worked.

<iframe src="https://giphy.com/embed/2Faz1ANKPPUY4XhT2" width="480" height="480" frameborder="0" class="giphy-embed" allowfullscreen=""></iframe>

This article walks through each line of a simple fetch example in an attempt to demystify the process. I pulled example code from a [tutorial](https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data) on scotch.io. I loved this tutorial, and I definitely recommend working through it!

**Let's get started.**

Here is an example of a simple fetch request:

```javascript
fetch(url)
.then((resp) => resp.json()) // Transform the data into json
.then(function(data) {
  // Create and append the li's to the ul
  })
})
```

As discussed in the scotch.io tutorial, this example fetches data about "authors" from an API, and calls a function that adds those authors to the page.

**`Line 1: fetch(url)`**

The first line initiates a GET request (by default) to a url. This generates **promise one**, and returns that promise.

**`Line 2: .then((resp) => resp.json())`**

The second line is a callback. It runs after promise one is complete. This line should get the value from the fetch (a response). By default, the response is text.

We want to convert the text to json, so we accept the response as an argument to another function and call .json() method to parse it.

Parsing the text in our example to json happens almost instantaneously. However, this process could take several seconds if there is a lot of data to parse.

Just like we don't want to hold up the browser waiting on a server to return a response, we don't want to hold up the browser waiting on parsing text into json.

Therefore, this line returns **promise two**.

**`Line 3: .then(function(data) {//someFunction})})`**

By line three the json parsing is complete. We finally have a real JavaScript object with data that we can work with. Now we can pass that data into another function and process it in some way.

### Final Thoughts

Remember that any function that returns a promise, has to throw something on the callback queue to process the result when it's ready.
