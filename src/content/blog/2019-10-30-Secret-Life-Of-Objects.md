---
pubDate: 2019-10-30
title: 'The Secret Life of Objects'
description: ''
tags: ['javascript']
---

This blog post is part 1 of [2](/blog/2019-11-15-secret-life-of-objects-pt-2).

I've encountered several hurdles while learning JavaScript. One of the biggest
challenges has been chapter six of [Eloquent JavaScript](https://eloquentjavascript.net/06_object.html). I got through chapters 1-5 before starting the Flatiron bootcamp, but reaching this chapter was like hitting a wall.

When I first came across this chapter I hadn't started learing Ruby and certainly didn't have experience with classical OOP patterns in languages like Java. Even after learning Ruby I still couldn't master this chapter.

Instead, I was exposed to material like [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do). Author Douglas Crockford highlights a tension in JavaScript between its prototypical nature and some class-based syntax:

> JavaScript itself is not confident in its prototypal
> nature, so it offers an object-making syntax that is reminiscent of the classical languages. Few classical
> programmers found prototypal inheritance to be acceptable, and classically inspired syntax obscures the
> language's true prototypal nature. It is the worst of both worlds.

So, when I first started working on the exercises in chapter 6 I was resistant to practicing the class syntax.

Over the past few months I've begun learning the Java programming language. I've also gotten more practice with JavaScript prototypical inheritance. I think this has given me more appreciation for classical OOP, and a deeper understanding of JavaScript.

## A Vector Type

[Eloquent JavaScript](https://eloquentjavascript.net/06_object.html) explains the concept behind this challenge. To summarize, I needed to create a class `Vec` with a constructor, a few methods, and a getter.

Here is my solution:

```javascript
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  coordinates() {
    console.log(`Coordinates ${this.x} and ${this.y}`);
  }

  plus(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  minus(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}
```

### VectorType: Lessons Learned

The hardest part about solving this problem was just accepting the classically-inspired syntax. Once I gave it a shot it was relatively easy to make the constructor and methods.

## Groups

The second exercise in chapter six requires the creation of a "Group" class, modeled after JavaScript's native [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object.

This is what I came up with:

```javascript
class Group {
  constructor(arr) {
    this.entries = [];
  }

  add(val) {
    if (!this.has(val)) {
      this.entries.push(val);
    }
  }

  delete(val) {
    if (this.has(val)) {
      this.entries.splice(this.entries.indexOf(val), 1);
    }
  }

  has(val) {
    return this.entries.includes(val);
  }

  static from(arr) {
    let newGroup = new Group();
    for (let i = 0; i < arr.length; i++) {
      newGroup.add(arr[i]);
    }
    return newGroup;
  }
}
```

### Groups: Lessons Learned

This problem was a bit trickier. Initially I tried to make each entry in the group a symbol. This approach wasn't working, so I decided to simply create an `entries` property that defaults to a blank array. Once I made that switch the rest fell into place pretty quickly.

***

Thank you for reading this post. In the next post in this series I will discuss my solutions for the final two exercises in this chapter.
