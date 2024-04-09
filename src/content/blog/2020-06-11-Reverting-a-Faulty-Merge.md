---
date: 2020-06-11
title: 'Reverting a Faulty Merge and Fixing the Feature Branch'
slug: 2020-06-11-Reverting-a-Faulty-Merge
description:
published: true
tags: ['git']
---

Sometimes a branch that was already merged to the mainline is later found to be faulty. Pulling the branch out is pretty straightforward.
However, simply doing a `git revert` may cause some unintended
consequences if you aren't careful. This article provides outlines some simple steps you can take to address this issue.

## Best Practices

Linus Torvalds created git. He distributed an article/mailing list message in 2008 called [Revert A Faulty Merge](https://github.com/git/git/blob/master/Documentation/howto/revert-a-faulty-merge.txt). Linus' page is the authority on this topic. See [git-scm](https://git-scm.com/docs/git-revert) (comment to the `git revert` `--mainline parent-number` option); see also [stack overflow](https://stackoverflow.com/questions/7099833/how-to-revert-a-merge-commit-thats-already-pushed-to-remote-branch) (answer referencing the 'article/mailing list message').

## Step 1: Try to fix the issue without using `git revert`

Linus' top advice in this situation is to try to fix the problem without using revert:

> If at all possible, for example, if you find a problem that got merged into the main tree, rather than revert the merge, try _really_ hard to bisect the problem down into the branch you merged, and just fix it, or try to revert the individual commit that caused it.

Note, if you haven't pushed the merge to GitHub you have more options for fixing the faulty merge. See [Fix the References](https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging).

If these approaches won't work then move on to Step 2.

## Step 2: Decide if you need help from a git expert

If step 1 didn't work and Linus' article is not (mostly) clear to you, then you should probably reach out for help from a friend or colleague. There are some real perils in using `git revert` incorrectly. Specifically, if you revert the merge commit, you can't just merge the branch again later and expect the same changes to come back. All of the resources posted above discuss this issue in more detail.

Otherwise, continue on to Step 3.

## Step 3: Use a little git magic\*\*\*

This step is a high level summary of reverting a faulty merge, fixing any issues, and bringing feature back.

### i. Revert the merge

You can revert a merge from the command line or from GitHub.

**Command Line:** Linus' article walks through how to use `git revert` in the command line. For a slightly easier-to-follow example, checkout the [Reverse the commit](https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging) section of the git-scm book Chapter 7.

**GitHub:** Alternatively, you can use GitHub's [built-in revert feature](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/reverting-a-pull-request).

### ii. Fix the feature branch

Fix mistakes on the side branch (feature branch) and commit changes to that branch. See Linus' article for an example of what the git history looks like at this point.

### iii. Revert the revert

As noted by Linus:

> If the faulty side branch was fixed by adding corrections on top, then doing a revert of the previous revert would be the right thing to do.

### iv. Merge the updated topic branch into mainline branch

This step is what will finally bring features back into the mainline branch.

## \*\*\*Disclaimer

This solution is not a cure-all. For example, if significant development occurs after the feature branch is originally merged into the mainline branch, running `git revert` can cause breaking changes even if you follow the steps described in this document.
