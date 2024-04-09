---
pubDate: 2018-11-06
title: 'Pry Tips for Ruby Developers'
description: ''
tags: ['ruby', 'bootcamp']
---

Pry is an amazing tool that can supercharge the software development process. Pry is a REPL (Read, Evaluate, Print, and Loop) like rpl.it and IRB. However, Pry has additional features that make it especially helpful for writing and debugging code.

You may already be familiar with the `binding.pry` method. If not, check out this [Tutorial](https://www.sitepoint.com/rubyists-time-pry-irb/) by Benjamin Tan Wei Hoa.

Pry's awesome features don't stop there though. You can also navigate through files, lookup relevant methods and documentation, and even trace the stack to hunt down a bug.

**Getting Started - Navigating State with `cd`, `whereami`, `ls`, and `exit`**

Pry helps you learn how to use advanced features. Here are some tips for accessing these features.

To get started, it helps to know Pry’s `cd` method, `whereami`, and `ls`. Pry’s cd and ls methods are similar to the terminal commands with the same name. They both help users navigate around files and display directory contents. Type “whereami” in a Pry session to check where you are.

On to the code - open up a pry session and cd into Pry itself:

```ruby
// ♥ Pry
[1] pry(main)> whereami
At the top level.
[2] pry(main)> cd Pry
[3] pry(Pry):1> whereami
Inside Pry.
[4] pry(Pry):1>
```

As you can see from the code above, you are now “inside Pry.” Pry is a program like any other and contains numerous files and Commands. Now,enter `ls` or `help` to get a display of all sorts of Pry commands. Enter `exit!` to back out of your current Pry session.

### Introspection

Pry’s Introspection methods like `show-docs` and `show-code` help you learn background information about the program/class/method that you’re working with.

### Show Documentation - ?**

The Pry command `show-docs` (or `?` for short) does exactly what it says: it shows you any relevant documentation for the file you’re working with. This saves you from having to hunt down the docs online. For example, typing ? in Pry will bring up Pry’s docs:

```ruby
// ♥ Pry
[1] pry(main)> cd Pry
[2] pry(Pry):1> ?

From: /Users/edwardezekiel/.rvm/gems/ruby-2.3.3/gems/pry-0.11.3/lib/pry/pry_instance.rb @ line 2:
Class name: Pry
Number of monkeypatches: 6\. Use the `-a` option to display all available monkeypatches
Number of lines: 22

-*- coding: utf-8 -*-
#
Pry is a powerful alternative to the standard IRB shell for Ruby. It
features syntax highlighting, a flexible plugin architecture, runtime
invocation and source and documentation browsing.
```

### Show Sources**

As explained on on the Pry [wiki:](https://github.com/pry/pry/wiki/Source-browsing)

> The code show-source command is capable of showing source code for classes/modules and methods. Simply typing show-source method_name will pull the source for the method and display it with syntax highlighting. As a convenience, Pry looks up both instance methods and class methods using this syntax, with priority given to instance methods.

Here is an example:

```ruby
// ♥ Pry
[1] pry(main)> cd Pry
[2] pry(Pry):1> $

From: /Users/edwardezekiel/.rvm/gems/ruby-2.3.3/gems/pry-0.11.3/lib/pry/pry_instance.rb @ line 24:
Class name: Pry
Number of monkeypatches: 6\. Use the `-a` option to display all available monkeypatches
Number of lines: 643

class Pry
attr_accessor :binding_stack
attr_accessor :custom_completions
```

### Pry Stack Explorer**

Pry even lets you explore the stack that you’re working with to trace down tricky bugs. Stack trace methods include `up`, `down`,`cat --ex`, and my personal favorite `wtf?` This [article](https://www.sitepoint.com/rubyists-time-pry-irb/) by Benjamin Tan Wei Hoa provides some great stack trace examples.
