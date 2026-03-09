# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Hugo static site for breischl.dev, using the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme (included as a git submodule at `themes/PaperMod`). The site is automatically deployed to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`.

## Common Commands

```bash
# Start local dev server (includes drafts, disables fast render for accuracy)
hugo server -D --disableFastRender

# Create a new blog post
hugo new content blog/my-post-title.md

# Build for production
hugo --minify
```

## Blog Post Editing

When asked to edit posts in `content/blog/`:
- ensure posts are committed to Git before beginning editing. Then make suggested changes directly in the document, and explain your reasoning in the user chat. 
- Fix grammar, clarity, flow, and consistency — but preserve the author's voice and tone.
- Don't homogenize the writing; it should still sound like him.
  - Don't replace "ie" with "i.e.", or "eg" with "e.g."
- Avoid formatting and styles that are commonly taken to be markers of AI-generated content, such as:
  - emdashes excessive emojis
  - excessive hyperbole
- Feel free to suggest new, different, or expanded content to the user, but do not write it directly in the post without explicit approval. 


## Content Workflow

- Blog posts go in `content/blog/`
- Posts are drafts by default (`draft: true` in frontmatter); set `draft: false` to publish
- The `projects/` and `demos/` sections exist in `content/` but are currently disabled in the nav menu (`hugo.toml`)

## Architecture

- `hugo.toml` — site config (base URL, theme, nav menu, PaperMod params)
- `content/` — all Markdown content; `_index.md` files define section landing pages
- `themes/PaperMod/` — theme submodule; don't edit files here
- `.github/workflows/deploy.yml` — builds with Hugo extended and pushes to `gh-pages` branch with CNAME `breischl.dev`

## Deployment

Pushing to `main` triggers the GitHub Actions workflow which builds the site and publishes to the `gh-pages` branch. The custom domain `breischl.dev` is set via the `cname` field in `deploy.yml`.
