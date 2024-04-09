---
date: 2019-05-17
title: 'Looping Using ES6 Syntax'
slug: 2019-05-17-Looping-Using-ES6-Syntax
description:
published: true
tags: ['javascript']
---

Earlier this week I was working on a coding problem that involved looping through characters in strings. I wanted to loop over all the characters in two strings to determine whether they were anagrams. This kind of task is common in technical interview situations.

This made me take a closer look at Javascript for loops. I was especially interested in the `for...of` and `for...in` loops, so I wrote this post to share what I found out.

## Looping Through Elements in a String using `for...of`

So, what's a good way to accomplish this goal? One approach is to use a traditional for loop:

```javascript
for (let i = 0; i < string.length; i++) {
  console.log(string.charAt(i));
}
```

This kind of for loop has been around in Javascript since its inception twenty years ago. However, ES6 introduced some spiffy new syntax.

Since the introduction of ES6, you can use a `for...of` loop:

```javascript
for (character of string) {
  console.log(character);
}
```

Isn't the `for...of` statement much easier to read than the traditional for loop! It also requires less typing, which means less room for error.

## Are `for...of` and `for...in` Interchangeable?

TLDR: No, they iterate over different things.

Per MDN:

> The `for...of` statement iterates over values that the [iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables) defines to be iterated over.
>
> The `for...in` statement iterates over the [enumerable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) of an object, in an arbitrary order.

## What is an _iterable object_?

An object is **iterable** if it defines its iteration behavior, such as what values are looped over in a `for...of` construct.

An object defines its iteration behavior when the object (or one of its prototypes up its prototype chain) has a property with a `Symbol.iterator` key.

Here are Javascript's built-in Iterables:

- String
- Array
- TypedArray
- Map
- Set

## What are _enumerable properties_ of an object?

According to MDN, enumerable properties are those _properties_ whose internal enumerable flag is set to true.

This was a little cryptic to me at first glance. How can you tell whether an internal enumerable flag is set to true for a property?

Well, it turns out that there is a method baked right into the Object.prototype that answers this question. The method is called `propertyIsEnumerable()`.

Once again MDN has a great example demonstrating how to use this method to check whether a specified property is enumerable. [Here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable) is a link to MDN's example.

## Back to My Example

Let's take a look back at our example to confirm whether `for...of` and/or `for...in` works:

```javascript
let myString = 'valar morghulis';

'hello world'[Symbol.iterator]();
// StringIterator {}

console.log(myString.propertyIsEnumerable([1]));
// true
```

As demonstrated above, strings have the Symbol.iterator method. In addition, strings are indexed by character. Thus, you can use `for...of` or a `for...in` statement to iterate over characters in a string.
