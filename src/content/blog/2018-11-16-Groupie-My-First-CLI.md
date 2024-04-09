---
pubDate: 2018-11-16
title: 'Groupie - My First CLI'
description: ''
tags: ['ruby', 'bootcamp', 'projects', 'shell']
---

This week I wrote my first Command Line Interface! It's called "Groupie," and it helps people get tickets to see their favorite concerts.

Here is the [Github link](https://github.com/edezekiel/groupie) to the source code in case you are interested in taking a look.

### Video Walkthrough**

Let's jump right in. [Here](https://asciinema.org/a/7rcvL0AnlFtJsblXxn797XWco) is a video walkthrough showing Groupie's basic features:

### Organizing the Run File Using Screens**

As you may have noticed during the walkthrough, Groupie has several “menus” or “screens.” Different screens can be accessed at different times throughout the execution of the file. Each screen lets the user interact with some aspect of the CLI. For example, the “greeting screen” welcomes the user and provides basic instructions.

```ruby
def greet_screen
    welcome_user
    list_first_concert
    list_first_band
    session_screen
end
```

These are the different screens:

- Greeting;
- Concert list;
- Individual concert information;
- Ticketing;
- Band list;
- Individual band information; and
- Exit - allowing the user to exit at any time.

The trickiest part was getting the exit screen and the ticketing screens to work. I wanted to user to be able to exit the program at any time and the buy tickets at several different points.

### Formatting - Pastel and Separators**

I stylized Groupie using the "pastel" gem. I also created a method called "separators" that was responsible for inserting line breaks between each screen.

```ruby
def pastel
    pastel = Pastel.new
    pastel
  end
def separator
    puts "                                                      "
    puts pastel.bright_magenta("==================================================")
    puts "                                                      "
  end
```

### ActiveRecord**

I used the ActiveRecord gem to streamline several aspects of the program. This gem helps with creating and updating databases, creating associations between classes, and inheriting all kinds of built-in methods. For example, the “Bands” class is associated with the “Sessions” and “Concerts” classes:

```ruby
class Band < ActiveRecord::Base
  has_many :sessions
  has_many :concerts, through: :sessions
end
```
