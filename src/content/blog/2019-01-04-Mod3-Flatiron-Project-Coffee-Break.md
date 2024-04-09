---
pubDate: 2019-01-04
title: 'Mod 3 Flatiron Project - Coffee Break'
description: ''
tags: ['javascript', 'ruby', 'bootcamp', 'projects', 'agile']
---

January marks the beginning of 2019 and the end of mod 3. This mod has been the most challenging yet. As I discussed in my last blog post, it took me a while to wrap my head around several mod 3 concepts.

After weeks of debugging, practicing, and coding, I have finally completed my mod 3 project! Here are links to the [frontend](https://github.com/edezekiel/frontend-coffee-bulma) and [backend](https://github.com/edezekiel/backend-coffee-bulma).

This post is about my key takeaways from the past few weeks.

### Know When To Take A Step Back

Going to a coding bootcamp can feel like a cramming session. Labs stack up, project deadlines get closer, and study sessions run late. Even so, it is incredibly important to take breaks.

This project really tested my mental endurance, which is why taking breaks was critical. It helped that Christmas and New Year's fell in the middle of the mod. They helped/forced me to take a step back from the code. After a few days of rest the concepts started coming together.

### Thoughts on External APIs (Use Faker Instead)

At the beginning of my project I considered using an external API like yelp fusion. Their API is really easy to use and the documentation is great.

Notably, you can make yelp API requests without having to set up advanced OAuth2 tokens. OAuth2 tokens are important, but beyond the scope of my project.

I got as far as seeding my rails database with data from yelp API. Eventually, though, I used the Ruby gem "Faker" to create my seed data.

### Faker

Faker is amazing. It lets you build seed data amazingly fast with just a few lines of code. You don't have to learn API-specific rules, set up OAuth tokens, or manually create object instances.

Here is the entirety of my db.seed file for my mod 3 project:

```ruby
Blend.destroy_all

Note.destroy_all

20.times do
  b = Blend.create(
      name: Faker::Coffee.blend_name,
      origin: Faker::Coffee.origin,
      variety: Faker::Coffee.variety
  )
  Note.create(blend_id: b.id, body: Faker::Coffee.notes)
end
```

With this seed file, I had enough data to test my rails associations and render my website.

### Bulma

I decided to switch up my CSS framework for this project. Bulma is modern and based around the CSS Flexbox feature. My feelings about Bulma are mixed.

Pros:

1. It is incredibly easy to get set up. Just paste [this](https://gist.github.com/edezekiel/41e3fc3e0bf229043d192d4260d94898) header.
1. The standard configurations make it easy to set up a hero banner, navBar, footer, etc.
1. The features look good.

Cons

1. The documentation is a little bit sparse;
1. It was surprisingly difficult to implement a basic flex wrap system for "cards" or "tiles." At a few points I was tempted to ditch the framework and just code the CSS using Flexbox.
1. Setting up event handlers on "form" buttons was a nightmare. I didn't have problem getting the event listeners to work before adding Bulma, but afterwards it took hours of debugging.
