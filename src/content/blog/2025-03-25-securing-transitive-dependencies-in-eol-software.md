---
pubDate: 2025-03-25
title: 'Securing Transitive Dependencies in End-of-Life Software: A Guide'
description: 'A guide on the HeroDevs blog to fixing vulnerabilities that come in through dependencies of your dependencies'
tags: ['security', 'npm', 'javascript']
---

I wrote this post for the HeroDevs blog: [Securing Transitive Dependencies in End-of-Life Software: A Guide](https://www.herodevs.com/blog-posts/securing-transitive-dependencies-in-end-of-life-software-a-guide).

When you install a package from npm, you also install all of its dependencies. Those transitive dependencies can bring in vulnerabilities, and fixing them gets harder when the package you depend on is end-of-life and no longer releasing updates.

The guide walks through how npm resolves versions with SemVer ranges, why pinned versions can leave you stuck on a vulnerable release, when `npm update` is enough to pull in a fix, how to use `overrides` when it isn't, and what to do when the transitive dependency itself is end-of-life.
