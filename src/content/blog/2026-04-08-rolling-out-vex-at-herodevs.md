---
pubDate: 2026-04-08
title: 'Rolling Out a VEX Endpoint at HeroDevs'
description: 'What I learned building a live VEX feed across thousands of packages'
tags: ['security', 'vex', 'herodevs', 'psirt']
---

I recently led the effort to roll out a [VEX](https://docs.herodevs.com/guide/vex) endpoint at HeroDevs. The output is a JSON document conforming to a spec, which is pretty straightforward to generate. The hard part was keeping it accurate and up to date across a catalog of thousands of packages.

This post covers what OpenVEX is, how it compares to CSAF, and what I found to be the harder parts of the project.

## What Is OpenVEX?

VEX stands for Vulnerability Exploitability eXchange. It's a [CISA-recognized](https://www.cisa.gov/sites/default/files/2023-04/minimum-requirements-for-vex-508c.pdf) standard for communicating whether a known vulnerability actually affects a specific product version.

[OpenVEX](https://github.com/openvex/spec) is one implementation of VEX. It produces JSON documents where each statement maps a CVE to a product and declares a status: `not_affected`, `fixed`, `under_investigation`, or `affected`. When a vulnerability scanner ingests an OpenVEX document, it can automatically suppress alerts for CVEs that don't apply. That means less manual triage for your team.

The [OpenVEX spec](https://github.com/openvex/spec/blob/main/OPENVEX-SPEC.md) is worth reading directly. It's concise and well-structured.

## OpenVEX vs. CSAF

The other major VEX format is [CSAF](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html) (Common Security Advisory Framework). At a high level:

- **CSAF** is a broader standard for security advisories. VEX is one of several CSAF profile types. A CSAF document can include vulnerability details, remediation guidance, threat information, and more. It's comprehensive but heavier.

- **OpenVEX** is narrowly scoped to vulnerability applicability statements. It doesn't try to be a full advisory. It just answers the question "does this CVE affect this product version?" That focus makes it simpler to produce, consume, and integrate with scanners.

For my use case (generating machine-readable vulnerability status across a large package catalog), OpenVEX's simplicity was a better fit.

## The Easy Part: Generating Documents

Generating a VEX document that conforms to the spec is straightforward. There are CLIs like [vexctl](https://github.com/openvex/vexctl) and several libraries that handle document creation. If you have a known CVE, a product identifier, and a status, you can produce a valid OpenVEX document in a few lines.

The tooling ecosystem is solid. This was not the hard part.

## The Hard Part: Catalog-Scale Input

The harder part of this project was building a system that keeps a nearly live VEX feed up to date with the status of vulnerability fixes across thousands of packages. One VEX document is easy. A continuously accurate feed reflecting the current state of an entire product catalog is a different kind of problem. It touches multiple teams and systems.

Here are a few of the things I worked through:

### Mapping forked packages to upstream vulnerabilities

One challenge that's somewhat unique to HeroDevs: our NES packages are forks of the upstream open-source projects. That means the [purls](https://github.com/package-url/purl-spec) (package URLs) for our fixed packages don't match the purls used in public advisories. For example, a fix for an Angular vulnerability might ship as `@neverendingsupport/angular-core@19.2.20-angular-19.2.21` (see [Angular NES release notes](https://docs.herodevs.com/angular/release-notes/angular-19)), but the advisory references `@angular/core`.

So the VEX system needs to map our forked packages back to the upstream vulnerabilities they address. I built APIs around that mapping to ensure data quality, allow for self-service changes, and make sure the generated VEX documents properly handle the translation.

### Cross-team coordination

The VEX feed is only as good as the vulnerability data behind it. I needed to work with security analysts, product engineers, and the teams managing individual NES packages to make sure fix statuses were flowing into the system accurately and promptly.

### A simple API for product engineers

The people closest to the vulnerability fixes aren't necessarily the people who know or care about VEX. I built an internal API that made it easy for engineers to report fix statuses as part of their existing workflow, without needing to understand the VEX spec itself.

### Supporting tooling

Beyond the API, I built VEX management screens so our security team could review, audit, and correct statements before they hit the public feed. When you're publishing machine-readable security data, accuracy matters. You need humans in the loop with good visibility.

## What I Took Away

Conforming to a spec and producing valid documents is table stakes. The real challenge is the data pipeline and the organizational coordination behind it.

It was tempting to build a custom solution for vulnerability status, but using OpenVEX means compatibility with Trivy, Grype, and any other scanner that supports the format. I'm glad I went with the standard.

I also spent a lot of time on the output side, testing the feed end-to-end with Trivy and Grype to make sure it actually delivered on reducing false positives. A valid document that doesn't suppress the right alerts isn't useful. Getting both sides of the pipeline right (ergonomic input for engineers, accurate output for scanners) was what made this project interesting.

If you want to dig into OpenVEX, start with the [spec](https://github.com/openvex/spec) and [vexctl](https://github.com/openvex/vexctl). If you want to chat about product security, I'm on [Bluesky](https://bsky.app/profile/edezekiel.bsky.social).
