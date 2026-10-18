---
name: blog-voice
description: Write or revise posts for this blog in Ed's own voice. Use whenever drafting a new post in src/content/blog, rewriting a draft that "reads like AI", or editing prose in an existing post.
---

# Writing in Ed's voice

Ed's posts read like a developer telling a colleague what he did and what he learned. They are first person, plain, a little informal, and organised around the order things actually happened. The goal of this skill is a draft Ed would believe he wrote.

## Before drafting

Read at least two of these posts in full. They are the clearest examples of the voice:

- `src/content/blog/2021-06-24-Site-Upgrade.md`: narrative of a project, start to finish
- `src/content/blog/2024-05-07-nx-react-vite-npm-link.md`: setup, a problem, how he got past it
- `src/content/blog/2021-01-26-Git-Filter-Repo.md`: short how-to with numbered steps
- `src/content/blog/2019-08-13-Mac-Setup-CLI.md`: an earlier tool post, more casual

If the new post is about something he has written about before, read that post too and link to it.

## How Ed writes

**Openings.** He says plainly what the post is about in the first line or two. "This post is about upgrading this site from Gatsby v2 to v3." "I recently explored doing something similar with React. The rest of this article steps through..." No hook, no scene-setting, no thesis statement dressed up as a punchline.

**Story order.** The middle of a post follows what he did, in order: what started it, what he tried first, what didn't work, what he switched to. He uses ordinary connectives to move through it:

- "This whole upgrade started when I sat down and finally ran..."
- "So, I started running..."
- "This turned out to be a rabbit hole and I quickly switched gears."
- "At some point along the way I decided to..."
- "My next step was to..."
- "Eventually I realized..."
- "Here is where I hit my first roadblock:"
- "So far so good."

**Reasoning.** He explains decisions in a sentence of plain cost and benefit: "I decided the cost of writing my own SSG would outweigh the time I'd have to spend learning/maintaining a Gatsby site." He states what he weighed, then what he chose.

**Tone.** Honest and mildly enthusiastic. "I'm really happy with how many dependencies I was able to get rid of." "One amazing feature of CSS Modules is..." "I had a lot of fun upgrading this site." He admits rough edges and wrong turns without drama. An occasional emoji after a win is fine (🎉), rarely.

**Sentences.** Mostly medium length, complete, conversational. He starts sentences with "So," "Thus," "Finally," "Then,". Contractions are normal. He uses parentheses for asides and "(i) ... (ii) ..." for small enumerations inside a sentence.

**Structure.**

- Headings are descriptive and in Title Case: "The Upgrade Process", "NPM Link Issue", "The Setup: Creating a Publishable Library and One Consumer Application".
- Instructions are numbered steps, each followed by its code block.
- Code blocks carry a lot of the post. He shows the actual command or config, then a sentence on what it does.
- Plain bulleted lists for genuinely parallel items. Bullets are full sentences, not bold labels followed by a colon.
- Tables are rare. Prefer a short list or a sentence.
- Posts usually end with a "Conclusion" section of two or three sentences on what he learned or how it turned out. "Thank you for reading!" shows up in some older posts but is optional; recent posts simply end on the conclusion, so don't add it by default. A "Resources" list of links is common for how-to posts.

**Point of view.** "I" throughout. He talks to the reader occasionally ("If you want to dig into...", "you probably haven't installed an IDE yet") but never lectures or prescribes.

## What to avoid

These are the patterns that make a draft read as machine-written. Remove them on every pass:

- Meta-labels for parts of the argument: "The punchline:", "Here's the thing:", "The kicker:", "TL;DR" (unless it's a genuine summary list, which he has used once).
- Punchy fragments for effect: "That adds up." "Not anymore." "Small change, big win."
- Announcing reactions instead of having them: "This one surprised me." "This is the part I most want you to remember."
- Bold-label bullets ("**Tabs.** Ghostty only has...") as the default list style.
- "Earned a spot", "level up", "supercharge", "power up", "game-changer", "seamless", "robust", "leverage" as a verb.
- Contrast flourishes: "It's not X, it's Y." "Less X, more Y."
- Triplets of adjectives or parallel three-part sentences used for rhythm.
- Em dashes. Ed uses commas, parentheses or a new sentence.
- Wrapping up with a moral or a call to action he wouldn't make. His endings are modest.
- Over-tidy symmetry: every section the same length, every list three items.

## Editing pass

Run this after the first draft is done, or whenever Ed asks for an edit of an existing post. Do the technical check first, because fixing a wrong claim often changes the prose around it.

### 1. Technical correctness

Treat every factual claim, command and snippet as something to verify, not something to trust because it was in the draft. Check against the real source, not memory:

- **Commands.** Confirm each flag and subcommand exists with the tool's own `--help` or man page. Run commands that are read-only and safe (`--version`, `--help`, `status`, `--dry-run`, queries). Never run commands that install, delete, push or change system state just to check a post; read the docs for those instead.
- **Config snippets.** Check every key and section name against the tool's official documentation or the real config file the post describes. Make sure the snippet would parse (TOML, YAML, JSON).
- **Claims about behaviour.** For statements like "mise reads `.nvmrc`" or "Warp reloads the file automatically", find the documentation that says so, and note any setting the claim depends on. If a claim depends on a setting the post doesn't mention, add it.
- **Numbers, versions and dates.** Match timings, counts and version numbers to where they came from. Don't round in a way that changes meaning.
- **Links.** Every URL must resolve (`curl -sIL -o /dev/null -w '%{http_code}' <url>`). Internal links must match a real post slug under `src/content/blog` (slugs are the lowercased filename without `.md`).
- **Paths and names.** File paths, package names and product names must be spelled exactly as they exist.

List anything that could not be verified, and say why, rather than leaving it in silently.

### 2. Structure and length

- Does the opening say what the post is about?
- Does the middle follow the order things happened?
- Cut repeated points, asides that don't serve the post, and any section that exists only for symmetry.
- Check heading hierarchy (`##` for sections, `###` under them) and that code blocks have a language.

### 3. Line edit in Ed's voice

Run the `blog-voice-edit` skill (`.claude/skills/blog-voice-edit/`). It goes sentence by sentence against the reference posts and the "What to avoid" list above, without changing facts or structure.

### 4. Report

After editing, tell Ed what changed in three short groups: technical fixes, cuts, and voice edits. Call out any claim that is still unverified.
