---
pubDate: 2019-03-06
title: 'My Capstone Full-Stack Web App: YouTube Academy'
description: ''
tags: ['react', 'ruby', 'bootcamp', 'projects', 'javascript']
---

It's official, I have graduated from Flatiron's Web Development bootcamp!I am so incredibly grateful for the passionate Flatiron students and staff that have helped me along this journey.

![](https://media.giphy.com/media/zD2SpVI4vBLeo/giphy.gif)

Part of graduation is building a capstone project. This blog post introduces my Flatiron capstone project, explains my inspiration for building the site, and summarizes the site's architecture.

## YouTube Academy

My capstone project at Flatiron is [YouTube Academy](https://youtube-academy.netlify.com), which is a React/Rails Single Page Application that leverages Google's OAuth2 for authentication and the YouTube API to search and play videos. The app takes YouTube instructional videos to the next level.

## My Inspiration For Building the Site

Let's say you are watching a YouTube video about Closure in Javascript. My app lets you take notes while you watch the video, and save your notes for future reference to enhance your learning.

The example above is actually my personal inspiration for making this site. I watched a ton of YouTube videos about programming at Flatiron, but as a recovering attorney I can't help but take notes. We're in the 21st century, so I wanted a way to save my notes alongside the YouTube video in a programmatic way.

## Authentication and YouTube API

My favorite features of the app are the "Login With Google" button and the site's ability to pull videos from YouTube.

The "Login With Google" button implements OAuth2 by calling on the Google Auth API and prompting the user to sign in using their Google Account. If the user successfully signs into their Google account, Google sends the client an id_token. The front-end sends that id_token to the backend of my app. My backend then checks whether the token is valid. If it is, the user is logged in.

The site pulls YouTube videos by making requests to the YouTube API. Google provides instructions on how to obtain an API key and how to add client-side scripting to make requests. See [Getting Started](https://developers.google.com/youtube/v3/getting-started).

## The Frontend

The Front End uses React and Redux and is hosted on Netlify. I followed the Container/Presentational approach to separating React Components, and centralized state within a Redux store.

One tweak is that I separated forms out into their own folder. This approach simplified my app and streamlined the code for my forms. Also, I separated out various functions in a "utils" folder to make them more composable. Most of my utils are reusable fetch requests, but I also have functions related to Google Authentication.

## The Backend

The Backend uses Ruby on Rails and is hosted on Heroku. My favorite aspect of the backend is that is sends nested associated data back to the frontend (e.g., a user plus all of their associated video outlines) using the [to_json](https://apidock.com/rails/Hash/to_json) API. Using this system makes it incredibly easy to update the Redux store on the frontend with scalpel-like precision.

Because authentication is largely handled on the client side, the backend for this project is fairly straightforward.
