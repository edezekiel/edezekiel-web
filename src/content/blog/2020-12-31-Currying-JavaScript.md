---
pubDate: 2020-12-31
title: 'Replacing the Lodash Curry Method With ES6'
description: ''
tags: ['javascript']
---

This is my second post covering my journey through the Beginner [Frontend Masters](https://frontendmasters.com/) learning path. Although I completed `Getting Started with JavaScript, v2`, and `CSS Grids and Flexbox for Responsive Web Design`, this post is about `JavaScript: From Fundamentals to Functional JS, v2`. I enjoyed the Functional course the most out of these three, so that's what I'm most inspired to write about!

## Course 2 - JavaScript: From Fundamentals to Functional JS

[From Fundamentals to Functional JS](https://frontendmasters.com/courses/js-fundamentals-functional-v2/) is taught by Bianca Gandolfo. She covers high-order functions, closures, scope, and lots of fun ES6 syntax. The unifying theme of the course is replicating some common methods used in the [Lodash](https://lodash.com/) library.

## Lodash

Lodash [describes itself](https://lodash.com/) as "modern JavaScript utility library delivering modularity, performance & extras." Even if you haven't used the tool before, you've probably seen it used online or in common libraries. Lodash is an object with lots of methods for iterating over arrays, creating composable functions, etc. For example:

```javascript
_.defaults({ a: 1 }, { a: 3, b: 2 });
// → { 'a': 1, 'b': 2 }
_.partition([1, 2, 3, 4], (n) => n % 2);
// → [[1, 3], [2, 4]]
```

## ES6 and Lodash

It seems like Lodash has [lost popularity](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore) over the years thanks to ES5 and ES6. Indeed, in Bianca's course we use ES6 syntax to build several lodash methods from scratch. The exercises start out with creating a new `_` object, writing the ES6 methods, and assigning them to the new object:

```javascript
const _ = {};

/**
  Declare ES6 curry, compose and reduce methods. 
*/

/**
  Assign methods to _ object
*/
_.curry = curry;
_.compose = compose;
_.reduce = reduce;
```

In this post I'll describe the `_.curry` method I made in this course.

## Creating a Curry Method

The `_.curry` method just took up one line of code, but it was one of the harder methods for me to wrap my head around:

```javascript
const _ = {};

const abc = function (a, b, c) {
  return [a, b, c];
};

const curry = (func) => (a) => (b) => (c) => func(a, b, c);

_.curry = curry;

const curried = _.curry(abc);

curried(1)(2)(3); // [ 1, 2, 3 ]
abc(1, 2, 3); // [1, 2, 3]
```

The above `_.curry` method takes a function as an argument. In this case the argument is `abc`. The argument (function `abc`) is transformed to another function called `curried`. Invoking `curried(1)` returns a function that processes the next argument, etc. So `curried(1)(2)(3)` returns an array `[1, 2, 3]`.

We could refactor `curried(1)(2)(3)` to explicitly show each step:

```javascript
firstIsProcessed = curried(1);
secondIsProcessed = firstIsProcessed(2);
result = secondIsProcessed(3); // [1, 2, 3]
```

## Why Bother Using Currying?

At a quick glance, you might notice that we could have gotten the same return value by simple calling `abc(1, 2, 3)`. So what's the point of using `_.curry` at all?

A comment in this [StackOverflow thread](https://stackoverflow.com/questions/113780/javascript-curry-what-are-the-practical-applications) is most concise rationale I've seen for using currying:

```markdown
After some more thinking, I posit there is one valid use
case for currying in JavaScript: if you are trying to
write using pure functional programming techniques using
JavaScript. Seems like a rare use case though.
```

Of course, functional programming enthusiasts like Eric Elliot place a high priority on using pure functions:

```markdown
I recommend that you favor pure functions. Meaning, if it is
practical to implement a program requirement using pure
functions, you should use them over other options. Pure
functions take some input and return some output based on
that input. They are the simplest reusable building blocks
of code in a program.Perhaps the most important design
principle in computer science is KISS (Keep It Simple, Stupid).
I prefer Keep It Stupid Simple. Pure functions are stupid
simple in the best possible way.
```

Eric Elliot, [What is a Pure Function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976) (March 25th, 2016).

## Closing Thoughts

This exercise was eye opening. The process of transforming a function into a curried function helped me learn about pure functions.

I still have a lot to learn before I understand exactly when pure functions are necessary, and how to best implement currying though.
