---
pubDate: 2026-10-17
title: 'Rebuilding My Dev Setup for Agentic Coding'
description: 'Moving from an IDE to a terminal built around coding agents: a faster shell, new CLI tools, and rebuilding my Mac with mise bootstrap'
tags: ['shell', 'tooling', 'dotfiles', 'ai']
---

This post is about updating my day-to-day developer setup to work better now that most of my coding happens through AI agents.

## How My Setup Got Here

Before AI, my daily driver for programming was VSCode. I used the terminal for git operations, file management, running local dev servers, ssh'ing into remote servers, and some light coding with vim. I stored my developer configuration in a [dotfiles](https://github.com/edezekiel/dotfiles) repo because I wanted a smooth experience whether I was working in VSCode or the terminal.

ChatGPT changed this a bit. I still used VSCode as my IDE, but I had a chat window open a lot of the time and basically used it as a StackOverflow replacement.

In March 2025, I switched from VSCode to Cursor, and it fundamentally shifted how I code. Instead of chatting with an AI and implementing the code changes myself, I prompted Cursor to update files for me. Watching Cursor implement features across a codebase was magical. There were still lots of scenarios where coding it myself was more precise, but it felt like a big advancement over chatting and AI-assisted autocomplete.

As I learned how to build harnesses around agents to improve code quality, I was able to offload more work to AI. That meant I had less need for an IDE. So, in February 2026 I cancelled my Cursor subscription and went all in on Claude Code and Codex. Now the majority of my coding time is spent either chatting with agents or hopping into a file with vim to make quick edits. I also started learning tmux to organize my terminal sessions better.

Ironically, dropping Cursor brought VSCode back as a quick way to view staged code changes across multiple projects in the same workspace.

This week I decided to see what it would take to rip VSCode fully out of my developer workflow.

I started by eliminating some rough edges in my terminal: opening a new tab took about 1.5 seconds, I was missing some CLI tools for git operations and browsing files, and setting up a new computer still meant a Brewfile, a separate install step for CLI tools, and a lot of remembering. The rest of this post covers what I changed.

## A Faster Shell

Every time I opened a new tab in Warp, I had to wait about a second and a half before I could type. When most of your work happens in the terminal, that adds up quickly.

So, I timed it:

```sh
time zsh -i -c exit
```

Most of the 1.5 seconds was Oh My Zsh loading its plugins and nvm sourcing itself. I'd been using both since 2019, when my [mac-setup](/blog/2019-08-13-mac-setup-cli) script installed them. But I was only using one Oh My Zsh plugin (`git`), and when I checked my shell history I had never actually typed any of its git aliases.

My old `.zshrc` was 142 lines long, and most of it was commented-out Oh My Zsh boilerplate. I rewrote it from scratch and ended up with about 60 lines and no framework.

Here's what I removed:

- Oh My Zsh itself.
- nvm. I switched to [mise](https://mise.jdx.dev) for Node and pnpm. With `idiomatic_version_file_enable_tools = ["node"]` in mise's settings, it reads each project's `.nvmrc`, so none of my repos had to change.
- Some leftover `PNPM_HOME` lines and duplicate PATH entries from old installers.

I also switched `compinit` to `compinit -C`, which skips checking for new completion functions and reuses the cached completion file.

What's left is history settings, completion, PATH, a few aliases, and these tool hooks:

```zsh
eval "$(mise activate zsh)"
eval "$(direnv hook zsh)"
eval "$(starship init zsh)"
eval "$(zoxide init zsh --cmd cd)"
```

mise goes first so the other tools can find binaries that mise installs.

A new shell now starts in about 0.14 seconds. Warp runs this file every time it opens a tab, so all of this was really about making Warp feel faster. 🎉

## Replacing What I Used VSCode For

With the shell cleaned up, I added a few tools to cover the things I was still opening VSCode for.

### Reviewing Changes: lazygit and delta

The main thing VSCode was still doing for me was showing staged changes. [lazygit](https://github.com/jesseduffield/lazygit) now covers that, along with staging, branching and rebasing. I added an `lg` function that opens it and then moves my shell to whatever directory lazygit was in when I quit.

[delta](https://github.com/dandavison/delta) makes git diffs much easier to read. At first I wondered if I still needed it now that I had lazygit, but they do different things: lazygit is the interface, and delta controls how the diffs look. I hooked them together so lazygit's diff panel uses delta too:

```yaml
# ~/.config/lazygit/config.yml
git:
  diffRenderers:
    - colorArg: always
      command: delta --dark --paging=never --side-by-side=false
```

One gotcha: on macOS, lazygit's default config folder is `~/Library/Application Support/lazygit`. I export `XDG_CONFIG_HOME` in `.zshrc` so it uses `~/.config/lazygit` instead, which is where my dotfiles keep it.

### Browsing Files: yazi

[yazi](https://yazi-rs.github.io) is a file browser for the terminal, and it fills in for VSCode's file explorer. Similar to `lg`, typing `y` opens it and changes directory when I exit. Inside yazi, `Ctrl+G` opens lazygit in the current folder. To get yazi's image previews working inside tmux, I had to add `set -g allow-passthrough on` to my `.tmux.conf`.

### Moving Between Projects: zoxide

Since I jump between a lot of repos, [zoxide](https://github.com/ajeetdsouza/zoxide) was a big one. It replaces `cd`. Normal paths work exactly like before, but I can also type part of a directory name I've visited before and jump straight there from anywhere. zoxide learns as you use it, so on the first day I seeded it with all of my repos:

```sh
find ~/dev -maxdepth 3 -name .git | sed 's|/\.git$||' | xargs -n1 zoxide add
```

### The Prompt and Aliases

[starship](https://starship.rs) replaced the Oh My Zsh prompt theme. I kept the defaults and only turned off two modules that showed up on every single prompt without telling me anything useful.

I also added a few aliases based on what I actually type the most. `g` for `git` was the obvious one, since git was by far my most used command. I also added `h`, which just prints out all my aliases, because I knew I would forget them.

## Setting Up a New Mac With mise bootstrap

My favorite part of this project was moving my machine setup into mise bootstrap.

Before this, setting up a new machine meant running `brew bundle` against a Brewfile, running `mise install` for CLI tools, and then trying to remember which macOS settings I had changed. Now it all lives in one file, `~/.config/mise/config.toml`, and [mise bootstrap](https://mise.jdx.dev/bootstrap.html) applies it.

Homebrew packages go in a `[bootstrap.packages]` section:

```toml
[bootstrap.packages]
"brew:starship" = "latest"
"brew:zoxide" = "latest"
"brew-cask:warp" = "latest"
"brew-cask:font-hack-nerd-font" = "latest"
```

My dotfiles live in a bare git repo with my home directory as the work tree, and I use a `dot` alias in place of `git` for them. mise bootstrap can also write files, and I use that for a pre-commit hook in that repo. Since it's a bare repo, the hook lives inside `~/dotfiles/hooks`, which git can't track itself:

```toml
[bootstrap.files."~/dotfiles/hooks/pre-commit"]
mode = "0755"
content = """
#!/bin/sh
exec betterleaks git --pre-commit --staged --redact --no-banner --verbose
"""
```

The hook runs [betterleaks](https://github.com/betterleaks/betterleaks) (the successor to gitleaks, from the same author) on every commit to make sure I don't push a secret to a public repo. It actually caught something on its first day, although it was a false positive. The line `"brew-cask:1password" = "latest"` looks a lot like `password = "..."`.

With all of that in place, setting up a new Mac comes down to these steps:

1. Install Homebrew and mise

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install mise
```

2. Clone the dotfiles and check them out into the home directory. A brand new Mac doesn't have an SSH key yet, so I clone over HTTPS (the repo is public)

```sh
git clone --bare https://github.com/edezekiel/dotfiles.git $HOME/dotfiles
/usr/bin/git --git-dir=$HOME/dotfiles --work-tree=$HOME checkout
```

3. Preview, then run bootstrap

```sh
mise bootstrap --dry-run
mise bootstrap
```

4. Once I've set up an SSH key and added it to GitHub, switch the dotfiles remote to SSH so I can push

```sh
/usr/bin/git --git-dir=$HOME/dotfiles remote set-url origin git@github.com:edezekiel/dotfiles.git
```

Bootstrap is safe to run again at any time, and `mise bootstrap status` shows what's already in place.

### Local Overrides

Some config only makes sense on one machine. For those, I keep an untracked "local" file next to each tracked one, and the tracked file pulls it in:

- `.zshrc` sources `~/.zshrc.local` at the end.
- `.gitconfig` includes `~/.gitconfig.local`.
- `.ssh/config` includes `~/.ssh/config.local`.
- mise merges any `~/.config/mise/conf.d/*.toml` files with the main config, so a machine can have extra packages.

Bootstrap creates these as empty files if they don't exist, and the dotfiles repo is set to ignore them.

### macOS Settings and Keyboard Remaps

mise bootstrap can also set macOS preferences. These are settings I change once in System Settings and then forget about, so having them in a file means I won't have to remember them on my next computer:

```toml
[bootstrap.macos.defaults]
"NSGlobalDomain" = { AppleInterfaceStyle = "Dark" }
"com.apple.finder" = { FXPreferredViewStyle = "Nlsv" }
"com.apple.dock" = { autohide = true }
"com.apple.screencapture" = { location = "~/Screenshots" }
```

It even handles my keyboard remaps. I swap Caps Lock and Control on every keyboard, and Command and Option on my external keyboards. macOS saves these separately for each keyboard, so each one gets its own entry:

```toml
[[bootstrap.macos.defaults_entries]]
domain = "NSGlobalDomain"
key = "com.apple.keyboard.modifiermapping.13364-1809-0"  # Keychron B1 Pro
host = "current"
value = [
  { HIDKeyboardModifierMappingSrc = 30064771129, HIDKeyboardModifierMappingDst = 30064771300 },
]
```

The big numbers are key codes (`0x700000039` is Caps Lock and `0x7000000E4` is Control). After bootstrap writes them, the remaps may not kick in until you log out or reconnect the keyboard. To find the current values on a machine, I ran:

```sh
defaults -currentHost read -g | grep -A12 modifiermapping
```

## Trying Out Ghostty

While I was rethinking my terminal setup, I spent a day using [Ghostty](https://ghostty.org). It's fast and the config file is nice to work with. I even set up the Catppuccin theme across Ghostty, tmux, starship, lazygit and yazi so everything matched.

By the end of the day I had switched back to Warp. The biggest reason was tabs. Ghostty uses the normal macOS tabs across the top of the window, and I've gotten used to Warp's vertical tab sidebar. I also just liked Warp's dark theme and font better than what I had put together.

Matching themes across five tools also turned out to be a lot of config for not much benefit. So, when I removed Ghostty, I also removed all of the theming and went back to each tool's default colors.

## Adding Warp to My Dotfiles

Warp keeps its settings in `~/.warp/settings.toml` and reloads the file automatically when it changes, so I added it to my dotfiles:

```toml
[appearance.text]
font_name = "Hack Nerd Font Mono"

[terminal.input]
honor_ps1 = true
```

`honor_ps1` tells Warp to show my starship prompt instead of its own. The Nerd Font was needed because starship uses icons for things like the git branch, and Warp's default font doesn't have them. Without it, the icons just showed up as blank space.

## Conclusion

My terminal now opens a new tab almost instantly, lazygit and delta cover reviewing changes, yazi and zoxide cover moving around files and projects, and I can rebuild the whole setup on a new machine from my dotfiles. Those were the things I was still opening VSCode for. If startup time ever creeps back up, `time zsh -i -c exit` is the first thing I'll check.
