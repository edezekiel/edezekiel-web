---
pubDate: 2019-08-13
title: 'Mac Setup CLI'
description: ''
tags: ['projects', 'shell']
---

## A Simple Tool For Setting Up New Macs

This blog post is about a Command Line Interface tool I just built called [mac-setup](https://github.com/edezekiel/mac-setup). mac-setup helps save a few hours when you're setting up developer environment on a new mac.

## What it Does

mac-setup installs homebrew, oh-my-zsh, nvm, node, a bunch of applications (slack, notion, chrome, etc), several npm packages (like prettier and typescript), and a few brew "formulae" like git and zsh.

It also provides template .zshrc and .vimrc dotfiles. These files add a few of my favorite features to zsh and vim.

**Please note, if you have already created a .zshrc or .vimrc configuration file, your settings will be lost.**

## Instructions

mac-setup is pretty straight forward to use. Here are the instructions:

1. Make sure your mac is connected to github - [instructions](https://help.github.com/en/articles/set-up-git)
1. Open your terminal.
1. Navigate to user directory: `cd ~`
1. Clone repo: `git clone git@github.com:edezekiel/mac-setup.git`
1. Enter command: `cd mac-setup && chmod +x ./mac-setup-script.sh && ./mac-setup-script.sh`

## Customization

You probably have your own favorite apps and npm packages that aren't included in this tool. If you'd like to extend mac-setup, I'd recommend (i) forking the repo (ii) navigating to the mac-setup-script.sh in github, and (ii) editing the file however you'd like (you probably haven't installed an IDE yet).

For example, if you use the [Alfred](https://www.alfredapp.com/) productivity app, add the line `brew cask install alfred` to the script. Then follow the instructions above to run the program.

## What it Doesn't Do

This cli is barebones. Besides the zshrc and vimrc files, it does not set any configurations or log you in to any services. There is a tool called [mackup](https://github.com/lra/mackup) for this purpose, but it doesn't include some of my favorite apps (1Password7, Slack, Notion).

Additionally, mac-setup does not have a smart [dotfile management system](https://dotfiles.github.io/). As stated above it simply overrides your zshrc and vimrc files. I would checkout Anish Athalye's [tutorial](https://www.anishathalye.com/2014/08/03/managing-your-dotfiles/) and [tool](https://github.com/anishathalye/dotbot) if you want to learn more about this topic.

## Why Build "mac-setup"?

Last week, I joined a software development company in Memphis as a front-end web developer.

The company is called [Ubisquisoft](http://www.ubiquisoft.com/). They help companies build all kinds of software, including ful-stack web apps, mobile apps, and wearable device apps. I am very
excited to join the team!

One of the first things I had to do was set up a development environment on my new computer. I thought
this would be a breeze, but I didn't realize just how much work it takes to set up an environment from scratch. At Flatiron, I had weeks to download applications, install command line tools, and tweak my laptop before Day 1. Even after class started I added more functionality to my laptop throughout the course.

So, starting at Ubiquisoft meant compressing that process into a few days/hours. In order to accomplish that I built [mac-setup](https://github.com/edezekiel/mac-setup)!
