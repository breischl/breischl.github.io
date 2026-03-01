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
