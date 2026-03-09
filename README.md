# breischl.github.io

## To Do

- Verify custom domain name
- Re-enable custom CName by reverting changes in `deploy.yml`
- Re-enable demos & projects

## Local Testing

Run `hugo server -D --disableFastRender`, then go to [http://localhost:1313](http://localhost:1313)

## New Blog Post

```
hugo new content blog/my-post-title.md
```

Edit generated file. Add to `git` as normal.
When ready to publish, set `draft: false`.

## Comments

Comments are powered by [Giscus](https://giscus.app), which stores comments in GitHub Discussions.

**Configuration** is in `hugo.toml` under `[params.giscus]`. The `repoId` and `categoryId` values come from [giscus.app](https://giscus.app) — enter the repo name, select the Discussions category, and copy the generated IDs.

**Disable comments on a specific post** by adding `comments: false` to the post's frontmatter.

**Moderate comments** via GitHub Discussions at `github.com/breischl/breischl.github.io/discussions` — threads can be deleted, hidden, or locked there.
