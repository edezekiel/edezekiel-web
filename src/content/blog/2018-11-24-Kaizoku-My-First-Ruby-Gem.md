---
date: 2018-11-24
title: 'Kaizoku - My First Ruby Gem'
slug: 2018-11-24-Kaizoku-My-First-Ruby-Gem
description:
published: true
tags: ['ruby', 'bootcamp', 'projects', 'shell']
---

I had so much fun building Groupie that I decided to build another CLI! This time I wanted to incorporate web scraping and turn my CLI into a Ruby Gem. The result is Kaizoku.

Kaizoku means "pirate" in Japanese. Kaizoku scours the internet for the best Ruby gems.

Here is the [Github link](https://github.com/edezekiel/kaizoku) to the source code.

**[Video Walkthrough](https://asciinema.org/a/KOVQnUkhHl41LQE7nCAWzehQ7)**

### Installing Kaizoku**

If you visit rubygems.org and search for Kaizoku, you will see my gem! Here is a direct [link](https://rubygems.org/gems/kaizoku). You can also use the terminal to search for and install the gem by typing `gem search kaizoku` and `gem install kaizoku`.

### Making a Gem

There are a ton of helpful guides on [rubygems.org](https://guides.rubygems.org/make-your-own-gem/). Their guides walk you through making your first gem and publishing it to the site.

The trickiest part for me was pushing the gem to RubyGems.org. I kept on getting an error that had something to do with a "changelog." After some quick googling, I realized that a changelog is simply a .md file you add to the gem. The changelog.md file is where you record notable changes to the project. My changelog's is based on [Keep a ChangeLog](https://keepachangelog.com/en/1.0.0/) template.

### Web Scraping with Nokogiri

Nokogiri is Ruby gem that fetches and parses HTML documents (a web scraper). Kaizoku uses Nokogiri to scrape ruby-toolbox.com. Here an example of the code used to return a list of categorized gems:

```ruby
 def get_category
   doc = Nokogiri::HTML(open("https://www.ruby-toolbox.com"))
   doc.css(".category-group").each do |category|
     puts category.css("h3").text
   end
   get_subcategory_screen
 end
```
