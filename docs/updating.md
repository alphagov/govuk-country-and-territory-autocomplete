# Updating the data
_N.B. This documentation is intended for administrators of the repository and NPM package._

Changes to the Country and Territory registers need to be reflected in the data bundled with the autocomplete. This is currently a manual process.

* Currently there is no automated process for being notified of when updates to these registers take place. So you will need to co-ordinate to be made aware when updates take place.
* Update `dist/location-autocomplete-canonical-list.json` adding to or amending the array as appropriate.
* Update `dist/location-autocomplete-graph.json` adding to or amending the object with changes as appropriate. Note every record must have a key of the CURIE e.g. `country:GB`.

*You can see an example of a data update Pull Request in: https://github.com/alphagov/govuk-country-and-territory-autocomplete/pull/51*

## Testing changes
* `npm run dev`
* Go to: http://localhost:8080
* Check that your changes are reflected in the autocomplete

## Releasing changes
* Follow the steps in [Releasing](../README.md#releasing)

## Historic projects
Note: There are a couple of projects to generate the data files that are not currently supported. https://github.com/openregister/kibitz and https://github.com/openregister/generate-picker-data-file for context on this see https://github.com/alphagov/govuk-country-and-territory-autocomplete/issues/44
