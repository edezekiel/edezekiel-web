---
date: 2018-12-02
title: 'Ruby on Rails - Why form_for Uses Instance Variables'
slug: 2018-12-02-Form-For-Ruby-On-Rails
description:
published: true
tags: ['ruby', 'bootcamp']
---

TLDR - we need an instance variable because `form_for` wont work without it.

The past weeks have flown by. At Flatiron, we've moved from learning Ruby, to building Command Line Interfaces, to Sinatra, and now Rails.

**My "ah-ha" Moment.**

This article is about the my favorite "ah-ha" moment from this week: when I finally understood why we need to use an instance variable in `form_for`. Below is an example using `form_for` and `collection_select` to build a new employee form:

```ruby
#app/view/new.html.erb

<%= form_for @employee do | f | %>
  <%= f.label :name %>
  <%= f.text_field :name %>
  <%= f.label :dog %>
  <%= f.collection_select :dog_id, @dogs, :id, :name %>
  <%= f.submit %>
<% end %>
```

**What's Going on in This Example?**

- `form_for`: this is our view helper.

- `@employee`: see the section below.\*

- `f.`: the form_for method yields a form builder object (the f variable).

- `collection_select`: this is a pre-defined rails form-building method, called on f.

- `dog_id`: save the user’s input (whatever it is) in the params[:id].

- `@dogs`: this kind of object will appear in the drop down menu.

- `:id`: save the id of whatever dog the user selects.

- `:name`: show dog names to the user in the drop down menu.

### @employee

In our example above, the new form starts off empty. The user then fills out the form and clicks submit.

Take a moment to think about what happens next in the lifecycle of the form. What data is being posted? Where did it come from? How is it being manipulated by our controller?

### Explanation

The `form_for` tag isn't magic. It render the html in the browser. Html `form` Html form tags have action and method attributes that specify what route to take next and what to do with data entered into the form.

Here, form_for gathers the data entered in the form and stores it in the instance variable @employee. Then, rails transmits that data to the next route (edit) as params.

Because form_for gathers data in an instance variable, our params can easily be destructed on the edit page and used to post a new employee to the database.
