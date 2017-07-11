# Contributing

Contributions welcome, please raise a pull request.

To develop locally:

```bash
yarn
yarn dev
```

## Updating data

```bash
./scripts/fetch-latest-data-file.sh
git add dist/location-picker-graph.json
git commit -am "Update data file"
git push
```

## Cutting a new release

```bash
npm version <major|minor|patch>
vim CHANGELOG.md # Update changelog, put all unreleased changes under new heading.
vim README.md # Update readme, bump all hard-coded version numbers, file size if necessary.
git commit -am "Update readme and changelog"
git push && git push --tags
npm publish
```
