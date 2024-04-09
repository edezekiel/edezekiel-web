---
pubDate: 2020-09-10
title: 'Building a Calculator - Frontend Masters Series'
description: ''
tags: ['javascript', 'css']
---

This post is the first in a new series inspired by [Frontend Masters](https://frontendmasters.com/). Frontend Masters is a site that provides awesome online courses for learning frontend web development. Whenever I complete a course, I will make a CodePen to apply what I've learned and a blog post to go over the details.

## Course 1 - Intro To Web Development

The first course up is [Intro To Web Development](https://frontendmasters.com/courses/web-development-v2/), where I got a refresher on basic HTML, CSS, and JavaScript. The instructor was Brian Holt (Microsoft).

## The Calculator

Brian challenged students to create a simple calculator using plain HTML, CSS, and vanilla JavaScript. Here's my [CodePen](https://codepen.io/edezekiel/pen/MWyVGmY) solution.

## JavaScript

Using vanilla JavaScript to create the calculator's brain posed a few challenges. Somehow, calculators have to 'remember' previous key presses to determine what the current key press should accomplish. For example, if a user presses the number 7, then 'x', and finally 9, the calculator should return 63. However, if a user presses 7, then 7 again, they are trying to build the number 77.

There are probably purely functional ways of accomplishing this, but for simplicity's sake I created the following object and various helper functions:

```javascript
const calculator = {
  firstOperand: '0',
  secondOperand: '0',
  currentOperation: null,
};
```

This object simply stores the firstOperand, secondOperand, and currentOperation. The rest of the app is a set of functions to build numbers, edit numbers (backspace), update the stdout, perform calculations, and reset everything.

For me, the trickiest part was determining how and when to update state in the calculator object. These are the core methods I came up with to update state:

```javascript
function updateCalculatorValue(num) {
  !calculator.currentOperation ? buildOperand(num) : buildOperand(num, false);
}

function buildOperand(num, first = true) {
  if (first) {
    if (num !== '0' && calculator.firstOperand !== '0') {
      calculator.firstOperand = calculator.firstOperand.concat(num);
    } else {
      calculator.firstOperand = num;
    }
    setStdout(calculator.firstOperand);
  } else {
    if (num !== '0' && calculator.secondOperand !== '0') {
      calculator.secondOperand = calculator.secondOperand.concat(num);
    } else {
      calculator.secondOperand = num;
    }
    setStdout(calculator.secondOperand);
  }
}
```

The `updateCalculatorValue` and `buildOperand` functions work together to appropriately update the `calculator` object.

## HTML & CSS

I challenged myself to build the calculator using just Flexbox (no Grid, SCSS, etc.). Here are some of the challenges and how I addressed them in my solution:

**Centering The Calculator**: I created a wrapper div with the class `container`. I used the tried and true `display: flex`, `align-items: center` and `justify-content: center` to center the calculator div vertically and horizontally on the page.

**Stdout**: Calculator standard outs read right to left, so I applied `row-reverse` to the stdout div.

**Responsive Buttons**: The calculator's buttons maintain their position and relative sizing across viewport sizes (laptop, mobile, etc.). I achieved this by created a flex `buttons-container` with `flex-direction: column`. Then, I nest several `buttons-rows` inside the container with `flex: 1`, which results in the flex item receiving the specified proportion of the remaining space. This results in 1 column of button rows, where most of the buttons inside each row grow responsively at the same rate.

**Differently-Sized Buttons**: You'll notice that the Clear button and 0 number are different sizes than the other buttons. This was accomplished by creating `double` and `triple` classes with `flex` set to 2, and 3 respectively.

**Some Buttons Are Orange** Finally, specific buttons had to be colored orange. I applied orange colors using the `:last-child` pseudo-element to catch the last button in each `button-row`.
