---
pubDate: 2019-01-17
title: 'Using Javascript "this" Keyword in React'
description: ''
tags: ['javascript', 'bootcamp']
---

In this post, I break down the keyword `this` and provide a quick example using React.

### Why Should I Care About `this` in React?

My Flatiron cohort is finally getting to use React js! React has a ton of features that simplify writing front-end Javascript code.

However, it's even more important to understand how the keyword `this` works. Whether you're defining a method, setting state, lifting state up, referring to props, etc., the value of `this` can make or break your app.

### `this` Scope in the Browser (Global)

If you type `this` in chrome's dev console, the console returns:

`Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}`.

Check out my post [Where is the DOM?](http://edezekiel.com/blogs/12_13_2018.html) if you are interested in learning more about the `window` object.

### `this` Scope Inside a New Object

Let's create a simple object and set some properties:

```javascript
// create an empty object using the ES6 object initializer
let myObject = {};

myObject >> {};

// defining "a" and "b" properties and setting their values using dot notation
myObject.a = 100;
myObject.b = 50;
```

Next, we can define a method called "mySum" on myObject. When mySum calls on `this`, `this` refers to myObject:

```javascript
// example demonstrating the scope of this inside an object
myObject.mySum = function () {
  return this.a + this.b;
};

myObject.mySum() >> 150;

// another example
myObject.newFunction = function () {
  console.log(this);
};

myObject.newFunction() >> { a: 100, b: 50, mySum: ƒ, newFunction: ƒ };
```

### Arrow Functions: Explicitly Setting `this`

As noted in Trey's article, there are several ways to explicitly set `this` on a function. One way is to use the arrow function introduced in ES6.

[Here](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/) is a great article by Jason Orendorff comparing the difference in behavior between `this` in ordinary functions and arrow functions.

Jason explains it best:

> Arrow functions do not have their own `this` value. The value of `this` inside an arrow function is always inherited from the enclosing scope.

### Refactoring a React js Example Using Arrow Functions

Facebook provides great [documentation](https://reactjs.org/docs/getting-started.html) on React JS. One of the "Main Concepts" in the getting started guide explaines how to "lift state up."

If you are not familiar with this concept, you should work through their [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html) guide before continuing with this article.

Interestingly, in FB's example they use `bind` instead of arrow functions to set the value of `this`:

```javascript
// using .bind
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }
```

FB's example can easily be refactored using the arrow function instead of bind:

```javascript
// using the arrow function

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange = (temperature) => {this.setState({scale: 'c', temperature});}

  handleFahrenheitChange = (temperature) => {this.setState({scale: 'f', temperature});}
```

[Here](https://codepen.io/edezekiel/pen/GPaOMr) is the codepen to my version using the arrow function.

### Weird Highlighting Error with Refactored CodePen Example

If you open my codepen you may notice a weird highlighting issue. The handleCelciusChange and handleFarenheitChange syntax highlighting is off. Codepen's syntax highlighter thinks the code is broken, but the JS(Babel) tool is still able to render the Calculator component.

### Credits

Many thanks to Trey Alexander Davis for his article ["What is 'this' in React?"](https://medium.com/byte-sized-react/what-is-this-in-react-25c62c31480)
