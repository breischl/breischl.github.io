# breischl.github.io

Static site & blog for [breischl.dev](http://breischl.dev)

## Local Testing

```shell
hugo server -D --disableFastRender
```

## New Blog Post

```shell
hugo new content blog/my-post-title.md
```

Edit generated file. Add to `git` as normal.
When ready to publish, set `draft: false`.

## Comments

Comments are powered by [Giscus](https://giscus.app), which stores comments in GitHub Discussions.

**Configuration** is in `hugo.toml` under `[params.giscus]`. The `repoId` and `categoryId` values come from [giscus.app](https://giscus.app) — enter the repo name, select the Discussions category, and copy the generated IDs.

**Disable comments on a specific post** by adding `comments: false` to the post's frontmatter.

**Moderate comments** via GitHub Discussions at `github.com/breischl/breischl.github.io/discussions` — threads can be deleted, hidden, or locked there.

## KENETH Demos

Interactive demos of the [KENETH](https://github.com/breischl/KENETH) EnergyNet Protocol library live under `/demos/keneth/`. 
To create a new demo, copy [content/demos/_template.md](content/demos/_template.md) and modify appropriately.

**How it works:**
- The KENETH repo's `web` module compiles Kotlin to a JavaScript bundle (`web.js`) via Kotlin/JS + webpack
- The bundle is committed to `static/demos/keneth/web.js` in this repo by KENETH's release workflow that runs on version tags (see `RELEASING.md` in that repo)
- Demo pages use the `{{< keneth-demo demoId="demo-name" >}}` Hugo shortcode, which renders a container `<div>` and a `<script>` tag
- The Kotlin/JS code creates all UI elements programmatically inside the container, based on the demoId given

## Custom CSS

Some custom CSS classes are applied in `/assets/css/extended/`.