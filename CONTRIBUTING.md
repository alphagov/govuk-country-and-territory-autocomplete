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

Create a pull request for the release and merge once it has been approved, then run:

```bash
git checkout main
git pull --rebase
```

### Publish the release

  1. Sign in to npm (`npm login`) as `govuk-patterns-and-tools` using the credentials from BitWarden.
  2. Run `npm publish` to publish to npm.
  3. Open the ['create a new release' dialog](https://github.com/alphagov/govuk-country-and-territory-autocomplete/releases/new) on GitHub.
  4. Select the latest tag version.
  5. Set 'v[VERSION-NUMBER]' as the title.
  6. Add the release notes from the changelog.
  7. Add a summary of highlights.
  8. Select **Publish release**.

You do not need to manually attach source code files to the release on GitHub.
