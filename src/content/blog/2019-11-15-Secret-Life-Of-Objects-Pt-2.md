---
pubDate: 2019-11-15
title: 'The Secret Life of Objects, Part 2'
description: ''
tags: ['javascript']
---

This post wraps up my two-part series on [Eloquent JavaScript](https://eloquentjavascript.net/06_object.html), chapter 6.
Checkout [part one](/blog/2019-10-30-secret-life-of-objects) if you haven't read it yet.

I am so happy to have finally completed Eloquent JS chapter six. This has been a personal milestone of my for a long time.

![](https://media.giphy.com/media/lnlAifQdenMxW/giphy.gif)

Below are my answers to Exercises 3 and 4 of the chapter.

## Iterable Groups

Exercise 3 requires us to make the `Group` class from Exercise 2 iterable. It took me a minute
to realize that this was really a two part problem. First, I had to create the `GroupIterator`
class. Second, I had to replace the `Group` `Symbol.iterator` with
the newly created `GroupIterator`.

```javascript
class GroupIterator {
  constructor(group) {
    this.entries = group.entries;
    this.i = 0;
  }

  next() {
    if (this.i === this.entries.length) return { done: true };

    let value = this.entries[this.i];

    this.i++;

    return { value, done: false };
  }
}

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

for (let value of Group.from(['a', 'b', 'c'])) {
  console.log(value);
}
// → a
// → b
// → c
```

### Iterable Groups: Lessons Learned

Even after reaching this solution I still felt like there was JavaScript magic going on. Some part of the
language specification was smart enough to know that a `Symbol.iterator` with a `next`
method should work with a `for...of` loop.

So, I did a little digging online. Turns out ECMAScript 2015 introduced something called an "iterator protocol". [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable) has a great summary on this language feature:

> The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite), and potentially a return value when all values have been generated.
> An object is an iterator when it implements a next() method with (some additional) semantics.

## Borrowing a Method

The second exercise asks us to fix a malformed call to the `hasOwnProperty` method. Here
is my solution:

```javascript
let map = { one: true, two: true, hasOwnProperty: true };

console.log(hasOwnProperty.call(map, 'one'));
// -> true
```

### Borrowing a Method: Lessons Learned

This problem was deceptively tricky. It took me a while to realize that the local
execution environment had a `hasOwnProperty` method just laying around.

If you're interested in testing this out, just pull up DevTools in chrome and
type `hasOwnProperty`. This will return the function, seemingly out
of thin air.

If you're interesed in learning about the DOM execution environment, check out
my post [Where is the DOM?](/blog/2018-12-13-where-is-the-dom)

### Concluding Thoughts

I has a lot of fun solving these exercises. Now that I've finished Chapter 6, I can't wait to
tackle the rest of Eloquent JavaScript.
