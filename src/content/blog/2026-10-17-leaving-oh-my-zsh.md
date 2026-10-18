---
pubDate: 2026-10-17
title: 'Leaving Oh My Zsh, and Rebuilding My Mac From One Config File'
description: 'A plain zshrc, mise bootstrap, and a handful of terminal tools: notes for future me on the 2026 dotfiles rewrite'
tags: ['shell', 'tooling', 'dotfiles']
---

In 2019 I wrote [mac-setup](/blog/2019-08-13-mac-setup-cli), a script that installed Homebrew, Oh My Zsh, nvm and a pile of apps on a new Mac. Seven years later I finally took Oh My Zsh and nvm back out.

The trigger was small: every new Warp tab took about a second and a half before I could type. That adds up across a day. Most of it was Oh My Zsh loading plugins and nvm sourcing itself. A new shell now starts in about 0.14 seconds.

While I was in there, I rebuilt how the whole machine gets set up. This post is mostly a note to myself for the next time I get a new computer, so it leans toward "what did we do and where does it live" over "why you should do this too."

My dotfiles are public at [github.com/edezekiel/dotfiles](https://github.com/edezekiel/dotfiles). They live in a bare git repo with `$HOME` as the work tree, driven by a `dot` alias.

## The punchline: a plain .zshrc

The old `.zshrc` was 142 lines, most of them commented-out Oh My Zsh boilerplate. The new one is about 50, with no framework. The slow parts that went away:

- **Oh My Zsh.** I only ever used its `git` plugin, and my shell history showed I never typed any of its git aliases.
- **nvm.** Sourcing `nvm.sh` on every shell was the single biggest cost. [mise](https://mise.jdx.dev) now provides Node and pnpm, and it reads each repo's `.nvmrc`, so nothing in my projects had to change.
- **`PNPM_HOME` and duplicate PATH entries.** Leftovers from old installers. `typeset -U path` now drops duplicates.
- **A full `compinit` scan.** `compinit -C` reuses the completion cache.

What's left is history settings, completion, PATH, a few aliases, and four tool hooks:

```zsh
eval "$(mise activate zsh)"
eval "$(direnv hook zsh)"
eval "$(starship init zsh)"
eval "$(zoxide init zsh --cmd cd)"
```

mise goes first so direnv and starship see mise-managed binaries.

Warp runs this file for every new tab, so all of these were really Warp startup fixes. To measure:

```sh
time zsh -i -c exit
```

## mise bootstrap: one config file for the whole machine

This is the part I most want future me to remember.

I used to have a `~/.Brewfile` for apps, mise's config for CLI tools, and a vague memory of which macOS settings I'd changed. Now `~/.config/mise/config.toml` declares all of it, and [`mise bootstrap`](https://mise.jdx.dev/bootstrap.html) applies it:

```toml
[bootstrap.packages]
"brew:starship" = "latest"
"brew:zoxide" = "latest"
"brew-cask:warp" = "latest"
"brew-cask:font-hack-nerd-font" = "latest"
# ...and the rest of the formulae and casks
```

The bare dotfiles repo keeps its pre-commit hook and exclude list inside `~/dotfiles`, which git can't track. Bootstrap writes those too:

```toml
[bootstrap.files."~/dotfiles/hooks/pre-commit"]
mode = "0755"
content = """
#!/bin/sh
exec betterleaks git --pre-commit --staged --redact --no-banner --verbose
"""
```

That hook runs [betterleaks](https://github.com/betterleaks/betterleaks), the successor to gitleaks, on every `dot commit`. It already caught a false positive: the line `"brew-cask:1password" = "latest"` looks a lot like `password = "..."`.

A new Mac is now four steps:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install mise
git clone --bare git@github.com:edezekiel/dotfiles.git $HOME/dotfiles
/usr/bin/git --git-dir=$HOME/dotfiles --work-tree=$HOME checkout
mise bootstrap --dry-run && mise bootstrap
```

`mise bootstrap status` shows drift on an existing machine, and the whole thing is safe to rerun.

### Local overrides

Anything machine-specific sits next to a tracked file, gets included by it, and never gets committed. Bootstrap creates each one empty if it's missing, and the bare repo's `info/exclude` ignores them:

| Untracked file | Pulled in by |
|---|---|
| `~/.zshrc.local` | the end of `.zshrc` |
| `~/.gitconfig.local` | an `[include]` in `.gitconfig` |
| `~/.ssh/config.local` | an `Include` at the top of `.ssh/config` |
| `~/.config/mise/conf.d/*.toml` | mise merges these with the global config |

The last one means a machine can have extra Homebrew packages without touching the public config.

## macOS preferences and keyboard remaps

This one surprised me. mise bootstrap can write macOS defaults, which means preferences I set once in System Settings and would never remember on a new machine are now in a file:

```toml
[bootstrap.macos.defaults]
"NSGlobalDomain" = { AppleInterfaceStyle = "Dark" }
"com.apple.finder" = { FXPreferredViewStyle = "Nlsv" }
"com.apple.dock" = { autohide = true }
"com.apple.screencapture" = { location = "~/Screenshots" }
```

It even covers keyboard remaps. I swap Caps Lock and Control on every keyboard, and Command and Option on my external ones. macOS stores those per keyboard, keyed by vendor and product id, under the current-host global domain:

```toml
[[bootstrap.macos.defaults_entries]]
domain = "NSGlobalDomain"
key = "com.apple.keyboard.modifiermapping.13364-1809-0"  # Keychron B1 Pro
host = "current"
value = [
  { HIDKeyboardModifierMappingSrc = 30064771129, HIDKeyboardModifierMappingDst = 30064771300 },
  # ...
]
```

Those big numbers are HID usage codes: `0x700000039` is Caps Lock, `0x7000000E4` is Control. The remap applies after logging out or replugging the keyboard. The built-in keyboard's id may not match on a different Mac model, so that one might need setting by hand once.

To find them on a machine:

```sh
defaults -currentHost read -g | grep -A12 modifiermapping
```

## Tools that earned a spot

**[starship](https://starship.rs)** replaces the Oh My Zsh theme. It's fast and mostly default. I turned off two modules that added noise to every prompt: the cloud profile and the `package.json` version.

**[lazygit](https://github.com/jesseduffield/lazygit)** for staging, branching and rebasing. `lg` is a shell function that launches it and `cd`s to wherever lazygit was when it exited.

**[yazi](https://yazi-rs.github.io)** for browsing files. `y` opens it and changes directory on exit. Inside yazi, `Ctrl+G` opens lazygit in the current folder and `T` opens a new Warp tab there.

**[delta](https://github.com/dandavison/delta)** renders diffs. It and lazygit do different jobs: lazygit is the interface, delta is how diffs look. Wiring them together makes lazygit's diff pane use delta too. Single column, since lazygit panes are narrow:

```yaml
# ~/.config/lazygit/config.yml
git:
  diffRenderers:
    - colorArg: always
      command: delta --dark --paging=never --side-by-side=false
```

macOS hides lazygit's config under `~/Library/Application Support` unless `XDG_CONFIG_HOME` is set, so `.zshrc` exports it.

**[zoxide](https://github.com/ajeetdsouza/zoxide)** replaces `cd`. Real paths work exactly as before. A bare name jumps to the best match among directories I've visited, so `cd blog` works from anywhere. It learns as you go, so on day one I seeded it with my repos:

```sh
find ~/dev -maxdepth 3 -name .git | sed 's|/\.git$||' | xargs -n1 zoxide add
```

A few aliases came straight out of my shell history: `g` for git, which was by far my most typed command, plus `gsw`, `glo`, `..`, and `h` to print them all.

## Trying Ghostty, and staying with Warp

I spent a day on [Ghostty](https://ghostty.org). It's fast and the config file is pleasant. I set it up with Catppuccin across Ghostty, tmux, starship, lazygit and yazi.

I went back to Warp the same day:

- **Tabs.** Ghostty only has macOS native tabs across the top. I'm used to Warp's vertical tab sidebar, and that turned out to matter more than I expected.
- **Theme and font.** I liked Warp's dark theme and default look better than anything I put together.

Theming five tools to match also turned out to be a lot of config for very little. When Ghostty went, I removed all of it. Every tool is back to its default colors and Warp supplies the look.

## Warp config in dotfiles

Warp keeps its settings in `~/.warp/settings.toml` and reloads the file live, so it's tracked now:

```toml
[appearance.text]
font_name = "Hack Nerd Font Mono"

[terminal.input]
honor_ps1 = true
```

`honor_ps1` makes Warp show starship instead of its own prompt. The Nerd Font matters because Warp doesn't fall back to another font for icon glyphs. Without it, starship's branch and Node icons rendered as blank space.

## For future me

- Start from the dotfiles README, not from this post.
- Run `mise bootstrap --dry-run` before trusting anything.
- Startup time is the thing to watch. If `time zsh -i -c exit` creeps back over a few hundred milliseconds, find the hook that did it.
