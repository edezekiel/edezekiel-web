---
pubDate: 2026-10-17
title: 'Leaving Oh My Zsh'
description: 'Speeding up my terminal and rebuilding my Mac from one config file with mise bootstrap'
tags: ['shell', 'tooling', 'dotfiles']
---

This post is about finally removing Oh My Zsh from my terminal after several years, and the other changes I made to my dotfiles along the way. I'm mostly writing it for myself, so that the next time I set up a new computer I remember what I did and where everything lives.

Back in 2019 I wrote a [mac-setup](/blog/2019-08-13-mac-setup-cli) script that installed Homebrew, Oh My Zsh, nvm and a bunch of apps. Seven years later, I took Oh My Zsh and nvm back out.

My dotfiles are on GitHub at [edezekiel/dotfiles](https://github.com/edezekiel/dotfiles). I keep them in a bare git repo with my home directory as the work tree, and use a `dot` alias in place of `git`.

## Why Leave Oh My Zsh?

It started with Warp. Every time I opened a new tab, I had to wait about a second and a half before I could type. That doesn't sound like much, but I open a lot of tabs.

So, I timed it:

```sh
time zsh -i -c exit
```

Most of the 1.5 seconds was Oh My Zsh loading its plugins and nvm sourcing itself. I was only using one Oh My Zsh plugin (`git`), and when I checked my shell history I had never actually typed any of its git aliases.

## A Plain .zshrc

My old `.zshrc` was 142 lines long, and most of it was commented-out Oh My Zsh boilerplate. I rewrote it from scratch and ended up with about 50 lines and no framework.

Here's what I removed:

- Oh My Zsh itself.
- nvm. I switched to [mise](https://mise.jdx.dev) for Node and pnpm. mise reads each project's `.nvmrc`, so none of my repos had to change.
- Some leftover `PNPM_HOME` lines and duplicate PATH entries from old installers.

I also switched `compinit` to `compinit -C` so zsh reuses its completion cache instead of rescanning on every shell.

What's left is history settings, completion, PATH, a few aliases, and these tool hooks:

```zsh
eval "$(mise activate zsh)"
eval "$(direnv hook zsh)"
eval "$(starship init zsh)"
eval "$(zoxide init zsh --cmd cd)"
```

mise goes first so the other tools can find binaries that mise installs.

A new shell now starts in about 0.14 seconds. Warp runs this file every time it opens a tab, so all of this was really about making Warp feel faster. 🎉

## Setting Up a New Mac With mise bootstrap

This was my favorite part of the whole project.

Before this, setting up a new machine meant running `brew bundle` against a Brewfile, running `mise install` for CLI tools, and then trying to remember which macOS settings I had changed. Now it all lives in one file, `~/.config/mise/config.toml`, and [mise bootstrap](https://mise.jdx.dev/bootstrap.html) applies it.

Homebrew packages go in a `[bootstrap.packages]` section:

```toml
[bootstrap.packages]
"brew:starship" = "latest"
"brew:zoxide" = "latest"
"brew-cask:warp" = "latest"
"brew-cask:font-hack-nerd-font" = "latest"
```

mise bootstrap can also write files. I use that for a pre-commit hook in the dotfiles repo. Since it's a bare repo, the hook lives inside `~/dotfiles/hooks`, which git can't track itself:

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

2. Clone the dotfiles and check them out into the home directory

```sh
git clone --bare git@github.com:edezekiel/dotfiles.git $HOME/dotfiles
/usr/bin/git --git-dir=$HOME/dotfiles --work-tree=$HOME checkout
```

3. Preview, then run bootstrap

```sh
mise bootstrap --dry-run
mise bootstrap
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

I didn't expect this, but mise bootstrap can also set macOS preferences. These are the kinds of settings I change once in System Settings and then completely forget about until I'm staring at a new laptop wondering why the Dock won't hide:

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

The big numbers are key codes (`0x700000039` is Caps Lock and `0x7000000E4` is Control). The remaps take effect after logging out or unplugging the keyboard. To find the current values on a machine, I ran:

```sh
defaults -currentHost read -g | grep -A12 modifiermapping
```

## New Terminal Tools

With the shell cleaned up, I added a few tools I'd been meaning to try.

[starship](https://starship.rs) replaced the Oh My Zsh prompt theme. I kept the defaults and only turned off two modules that showed up on every single prompt without telling me anything useful.

[lazygit](https://github.com/jesseduffield/lazygit) handles staging, branching and rebasing. I added an `lg` function that opens it and then moves my shell to whatever directory lazygit was in when I quit.

[yazi](https://yazi-rs.github.io) is a file browser for the terminal. Similar to `lg`, typing `y` opens it and changes directory when I exit. Inside yazi, `Ctrl+G` opens lazygit in the current folder.

[delta](https://github.com/dandavison/delta) makes git diffs much easier to read. At first I wondered if I still needed it now that I had lazygit, but they do different things: lazygit is the interface, and delta controls how the diffs look. I hooked them together so lazygit's diff panel uses delta too:

```yaml
# ~/.config/lazygit/config.yml
git:
  diffRenderers:
    - colorArg: always
      command: delta --dark --paging=never --side-by-side=false
```

One gotcha: on macOS, lazygit looks for its config in `~/Library/Application Support` unless `XDG_CONFIG_HOME` is set, so I export that in `.zshrc`.

[zoxide](https://github.com/ajeetdsouza/zoxide) replaces `cd`. Normal paths work exactly like before, but I can also type part of a directory name I've visited before and jump straight there from anywhere. zoxide learns as you use it, so on the first day I seeded it with all of my repos:

```sh
find ~/dev -maxdepth 3 -name .git | sed 's|/\.git$||' | xargs -n1 zoxide add
```

I also added a few aliases based on what I actually type the most. `g` for `git` was the obvious one, since git was by far my most used command. I also added `h`, which just prints out all my aliases, because I knew I would forget them.

## Trying Out Ghostty

While I was rethinking my terminal setup, I spent a day using [Ghostty](https://ghostty.org). It's fast and the config file is nice to work with. I even set up the Catppuccin theme across Ghostty, tmux, starship, lazygit and yazi so everything matched.

By the end of the day I had switched back to Warp. The biggest reason was tabs. Ghostty uses the normal macOS tabs across the top of the window, and I've gotten used to Warp's vertical tab sidebar. I also just liked Warp's dark theme and font better than what I had put together.

Matching themes across five tools also turned out to be a lot of config for not much benefit. So, when Ghostty went, I removed all of the theming too and went back to each tool's default colors.

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

I'm really happy with how this turned out. My terminal feels noticeably faster, and for the first time I have a setup I could rebuild on a new machine without digging through old notes. If startup time ever creeps back up, `time zsh -i -c exit` is the first thing I'll check.

Thank you for reading!
