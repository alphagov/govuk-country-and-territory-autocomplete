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

`git pull --rebase` on `master` and then run:

```bash
git checkout -b "v1.2.3"
vim CHANGELOG.md # Update CHANGELOG, put all unreleased changes under new heading.
git commit -am "Update CHANGELOG"
npm version <major|minor|patch> -m "## 1.2.3 - 2017-01-13

- Change included in this release
- Another change included in this release"
git push --tags --set-upstream origin refs/heads/v1.2.3:refs/heads/v1.2.3
```

To actually publish, you will need access to an `npm` account that owns `openregister-location-picker`. Merge the version PR and then run:

```bash
git checkout master
git pull --rebase
npm publish
```