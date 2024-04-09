---
date: 2020-01-27
title: 'A Smarter Robot - Eloquent JavaScript Continued'
slug: 2020-01-27-A-Smarter-Robot
description:
published: true
tags: ['javascript', 'projects']
---

I've made it through Eloquent JavaScript, chapter 10! This post is about the Project Robot exercises in Chapters 7 and 10. After a lot of head-scratching I put together a solution I'm happy with. Here is a link to [my solution](https://github.com/edezekiel/eloquent-robot-modules) in GitHub.

## The Problems

Chapters 7 and 10 of Eloquent JavaScript concern optimizing a package delivery "robot", and splitting your code up into modules. Marijn Haverbeke (author of Eloquent JavaScript) provides most of the code for creating the "village", the roads, and the basic delivery robot.

## A Smarter Robot

Marijn gives us the code for basic delivery robots. The first robot randomly picks a direction until all packages have been delivered. The "mail route" robot visits every house twice. Finally, the goalOrientedRobot used an algorithm to optimize how to get a parcel from point A to point B. The goalOrientedRobot generally completes its deliveries in about 16 turns.

Marijn then challenges readers to create an even more efficient robot. At first, it was difficult to know where to start. I "observed" how the goalOrientedRobot worked by stepping through code and using the animation tool built into the book.

Eventually, I realized that the goalOrientedRobot randomly picked its first parcel. This seemed like a good place to save some steps.

I built a "smarterRobot" to compare all "parcelRoutes", and pick the shortest option to start with:

```javascript
function shortestParcelRoute(parcelRoutes) {
  let shortestRoute = parcelRoutes[0];

  if (parcelRoutes.length > 1) {
    for (let i = 0; i < parcelRoutes.length; i++) {
      if (parcelRoutes[i].length < shortestRoute.length) {
        shortestRoute = parcelRoutes[i];
      }
    }
  }

  return shortestRoute;
}
```

My "smarterRobot" generally beats the goalOrientedRobot by 3-4 steps.

## JavaScript Modules

Chapter 10's challenge is to split your code into modules. Modules are a relatively new feature in JavaScript. As usual, mdn has great a [explainer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

To summarize, modules let you split JavaScript code into separate files that can be imported when needed.

I hit a few road bumps when I tried to create my own modules. The biggest hurdle was just getting a module to load into my browser. I kept getting CORS errors and complaints about various modules not exporting what they were supposed to.

### http-server and CORS

Modern browsers do not allow JavaScript files to access files on the local filesystem, even if the html document is also on the filesystem. The browser throws a CORS error and prevents the file from running.

Eventually I came across a [stack overflow](https://stackoverflow.com/questions/50197495/javascript-modules-and-cors) post addressing this issue. The post recommended running the files through a local web server, such as [http-server](https://www.npmjs.com/package/http-server).

All you have to do is `cd` into the project directory and enter `http-server`. It automatically spins up a web server on your computer accessible through localhost:8080. Open up that page and you're code will run! ... well almost. I ran into another issue.

### name-is-not-exported-by-module

After I started using http-server I still kept getting another error. The browser kept telling me that "some function" is not exported by "some module". I tweaked the export and import statements, restarted the server, and edited the html script tag but it still didn't work.

After some googling I found a post recommending that I try to "Empty Cache and Hard Reload" in the browser. This finally fixed my issue and my code loaded!

In retrospect, I was running into two issues. First, I should have used `export` instead of `export default` in a few places. Second, even after I made this fix the browser's cache wasn't picking it up. I had to empty the cache and do a hard reload to see the code function properly.

## Concluding Thoughts

My "smarterRobot" isn't the fastest, and my modules aren't perfect. Even so, I'm incredibly proud of my work. I simply wasn't capable of completing these exercises a year ago, so it's a great feeling to get through them now.
