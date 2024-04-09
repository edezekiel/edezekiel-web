---
date: 2021-01-26
title: "Git Filter Repo"
slug: 2021-01-26-Git-Filter-Repo
description:
published: true
tags: ["git", "shell"]
---

Welcome to 2021! This is my first blog post of the new year and I'm excited to
get back to writing. Let's dive right in.

## The Task: Pulling a Frontend Repository From a Combined Frontend/Backend Project

I've worked on a project for some time that has one GitHub repository containing
both the frontend and backend applications.

```markdown
PROJECT/
    .git/
    BACKEND/
    FRONTEND/
```

Recently, it finally came time to split these applications apart:

```markdown
BACKEND/
    .git/
    APP/
FRONTEND/
    .git/
    APP/    
```

## Preserving Git History

One obviously problem with creating a new repository from a subfolder is
preserving git history. Losing years of git history or losing current branches
in development would have been a non-starter.

This post shares the exact steps I used to create a new frontend repository from
the project while preserving git history. The key here was a tool called git
filter-repo. The git CLI itself advised me to use git filter repo instead of
the native git filter-branch command.

## Instructions

1. Install git-filter-repo

```shell
brew install git-filter-repo
```

2. Change directories to the location where you would like to create the new frontend repository

```shell
cd ~
```

3. Clone down the original PROJECT repository and change directories

```shell
git clone git@github.com:[PROJECT]

cd PROJECT
```

4. Run git filter-repo

```shell
git filter-repo --subdirectory-filter FRONTEND/ --tag-rename '':'frontend'
```

5. Create FRONTEND repository in GitHub

6. Add the remote branch

```shell
cd FRONTEND

git remote add origin git@github.com:[FRONTEND]

git branch -M main

git push -u origin main
```

7. Push all git branches to the remote

```shell
git push remote --all
```

And that's it! I hope you found this post useful and thank you for reading.

## Resources

* [git filter-repo GitHub](https://github.com/newren/git-filter-repo/#how-do-i-install-it)
* [git filter-repo man page](https://www.mankier.com/1/git-filter-repo)
* [Pushing all local branches to a remote](https://stackoverflow.com/questions/6865302/push-local-git-repo-to-new-remote-including-all-branches-and-tags)
* [Moving Files and Directories to a New Repository in Git](https://ptc-it.de/move-files-to-new-repo-in-git/)
* [Detach (move) subdirectory into separate Git repository](https://stackoverflow.com/questions/359424/detach-move-subdirectory-into-separate-git-repository)
* [Splitting sub-folder(s) out into a new Git repository](https://making.close.com/posts/splitting-sub-folders-out-into-new-git-repository)
