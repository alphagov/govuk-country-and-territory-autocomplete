# Contributing

Contributions welcome, please raise a pull request.

To develop locally:

```bash
npm install
npm run dev
```

## Updating data
See [updating](./docs/updating.md)

## Cutting a new release

`git pull --rebase` on `main` and then run:

```bash
git checkout -b "v1.2.3"
vim CHANGELOG.md # Update CHANGELOG, put all unreleased changes under new heading.
git commit -am "Update CHANGELOG"
npm version <major|minor|patch> -m "## 1.2.3 - 2017-01-13

- Change included in this release
- Another change included in this release"
git push --tags --set-upstream origin refs/heads/v1.2.3:refs/heads/v1.2.3
```

To actually publish, you will need access to an `npm` account that owns `govuk-country-and-territory-autocomplete`. Merge the version PR and then run:

```bash
git checkout main
git pull --rebase
npm publish
```
