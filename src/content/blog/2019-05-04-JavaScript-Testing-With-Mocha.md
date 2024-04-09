---
pubDate: 2019-05-04
title: 'Javascript Testing With Mocha'
description: ''
tags: ['javascript']
---

One of my favorite parts about going to a coding bootcamp was all the automated tests. It was incredibly helpful to see whether my code contained errors, and to get hints about what might be causing those errors.

## Javascript Testing

Now that I've graduated it's up to me to write those tests for my own projects!

I had written some Ruby tests using Capybara, so now I wanted to try my hand at writing Javascript tests.

## Mocha

In honor of "May the 4th Be With You" my alternative title for this post is "May the Mocha Be With You." I found that Mocha was easy to get up and running and a pleasure to use.

Mocha is a Javascript testing framework. It works for testing JS in the browser, as well as JS that is executed in a node JS environment.

## My First Mocha Test

I decided to write a Mocha test that would be executed in the node JS environment.

Here is the code:

```javascript
// Require the built in 'assertion' library
var assert = require('assert');

describe('Compare', function () {
  describe('Star Wars Quotes', function () {
    it('should test whether two data types are equivalent ', function () {
      assert.equal(
        true,
        typeof 'May the Fourth Be With You' ===
          typeof "Help me Obi Wan Kenobi, you're my only hope"
      );
    });
  });
});
```

This test passes, because both operands are strings, so function will return the expected output of true.

## Lessons Learned

The Getting Started guide on [mochajs.org](https://mochajs.org/#getting-started) has very basic instructions on how to get you're first Mocha test running.

However, I kept getting an error message about my package.json file whenever I tried to run "npm test." The error message claimed "no such file or directory" existed. Eventually I ran the command "npm init" from within the project directory. That created a package.json file within my project directory and that fixed the problem.

## Resources

There are a lot of great resources out there to learn Mocha if you are interested. Of course, there is the official documentation at [mochajs.org](https://mochajs.org/#getting-started).

There is also a more in-depth tutorial on medium by [codeburst](https://codeburst.io/how-to-test-javascript-with-mocha-the-basics-80132324752e)
