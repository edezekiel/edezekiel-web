---
name: blog-voice-edit
description: Line-edit a blog post so it reads like Ed wrote it. Use after a draft exists, when Ed asks for a "voice edit" or "voice pass", or when a post reads like AI wrote it. Prose only; for technical checks use the editing pass in blog-voice.
---

# Voice line edit

This is a focused sentence-by-sentence pass over an existing post. It does not change what the post says, check technical facts, or restructure sections. The full description of Ed's voice, the reference posts, and the list of patterns to avoid live in `.claude/skills/blog-voice/SKILL.md`. Read that file first.

## Steps

1. Read two of the reference posts listed in blog-voice, then read the post being edited from top to bottom once without changing anything.
2. Go through the post one paragraph at a time. For each sentence, ask: would Ed have written this? Compare against the reference posts, not against general good writing.
3. Rewrite a sentence when it:
   - matches anything on the "What to avoid" list in blog-voice
   - is cleverer, tighter, or more quotable than anything in Ed's past posts
   - announces a reaction or a point instead of just making it
   - uses a word Ed doesn't use (check the reference posts if unsure)
4. Leave a sentence alone when it is plain and accurate, even if it could be "better". Keep Ed's casual habits: starting a sentence with "So,", contractions, a parenthetical aside, an occasional 🎉 after a win.
5. Fix typos and grammar mistakes, but don't polish phrasing that is merely informal.
6. Don't add or remove facts, commands, code blocks, links, or sections. If a sentence is both off-voice and technically wrong, flag it for the technical check rather than guessing.

## Report

List each changed sentence as before and after, grouped by reason (avoid-list pattern, too polished, announced instead of said, typo). Keep the list short; if a change is trivial, summarize it as a count.
