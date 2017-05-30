# Location picker - what it is and how to use it

[![Build Status](https://travis-ci.org/alphagov/openregister-location-picker.svg?branch=master)](https://travis-ci.org/alphagov/openregister-location-picker)

The location picker is a simple UI widget that allows end users to find and select a location. It includes auto-complete functionality to make it faster and easier for users to find a location. For example, to select their country of birth or their current location.

The picker uses data from the UK government's country and territory registers. To configure the data used in the picker to suit the specific needs of your product or service, please [contact the registers team](https://registers.cloudapps.digital/support).

The picker itself follows the common look and feel of GOV.UK in line with the [design principles](https://www.gov.uk/design-principles).

![A screenshot of the new country and territory picker](docs/location-picker-general.gif)

This guide will show you how to:
* populate the picker's autocomplete field
* use the picker's data file

[Contact the registers team](https://registers.cloudapps.digital/support) if you have any problems or questions that are not covered in this guide.

[Try out the example.](https://alphagov.github.io/openregister-location-picker/examples/)

## Before you start

This guide assumes you have a service that outputs HTML. It makes some choices for you with respect to which data is passed back and persisted to your service. Please [contact the registers team](https://registers.cloudapps.digital/support) to discuss your requirements.

## Integration process

To integrate an application with the picker, you'll need to:
* use the data from the country and territory registers
* create an accessible autocomplete widget

### Add location data from country and territory registers

To use register data in the picker, you will need two files:
* [location-picker-canonical-list.json](dist/location-picker-canonical-list.json) - a list of every canonical country and territory
* [location-picker-graph.json](dist/location-picker-graph.json) - a directed acyclic graph mapping canonical locations to abbreviations, synonyms, endonyms, and typos

The `location-picker-graph.json` file only contains examples of synonyms, abbreviations, endonyms and typos you might want to consider. It is not a comprehensive list. You may wish to add or remove items based on your own user research.

Copy both files to your application. The `location-picker-graph.json` file must be exposed as a public asset.

You can also install the location picker using `npm`:

```bash
$ npm install openregister-location-picker
$ ls node_modules/openregister-location-picker/dist/
location-picker-canonical-list.json
location-picker-graph.json
location-picker.min.css
location-picker.min.js
location-picker.min.js.map
```

The `location-picker-canonical-list.json` file contains an array of arrays containing the location names and ISO codes:

```js
> JSON.parse(fs.readFileSync('data/location-picker-canonical-list.json', 'utf8'))
[["Abu Dhabi", "territory:AE-AZ"], ["Afghanistan", "country:AF"], …]
```

You should parse this file on your application's server or as part of the build process to produce a plain HTML `<select>` dropdown. This is your progressive enhancement fallback. You should render something that looks like this:

```html
<select id="location-picker">
  <option value="territory:AE-AZ">Abu Dhabi</option>
  <option value="country:AF">Afghanistan</option>
  …
</select>
```

### Create accessible typeahead widget

To make it easier for users to find a location using the picker, you should progressively enhance the front-end to add auto-complete functionality. As a user types, the picker will suggest a list of possible locations for the user to choose from.

On the page where you're rendering the previous `<select>` dropdown, include the following HTML, updating the `/assets/` URLs as needed for your application:

```html
<!-- In your <head> -->
<link rel="stylesheet" href="/assets/location-picker.min.css" />

<!-- At the end of your <body> -->
<script type="text/javascript" src="/assets/location-picker.min.js"></script>
<script type="text/javascript">
  openregisterLocationPicker({
    selectElement: document.getElementById('location-picker'),
    url: '/assets/location-picker-graph.json'
  })
</script>
```

This will render the same `<select>` menu as before on the server, but hides it and progressively enhances to a typeahead when JavaScript kicks in. When the user selects something in the typeahead, the hidden `<select>` menu is still updated, so everything works as before.

[If you prefer to learn by reading the source, try out the example.](https://alphagov.github.io/openregister-location-picker/examples/)

## Support and troubleshooting

Government Digital Service (GDS) maintains the platform behind registers and creates widgets such as the location picker to make it easier for service teams to use register data.

Contact GDS if you want to use the picker, but your needs differ from what is covered in this guide.

[Contact the GDS registers team](https://registers.cloudapps.digital/support) if you have any problems or questions that are not covered in this guide. Please include screenshots if useful. GDS provides operational support from 09:00 - 17:00 Monday-Friday.

You can also raise an issue against this repository if you prefer.

## Glossary

country register - A list of British English-language names and descriptive terms for countries.

location - A country or territory.

picker - A widget that allows you to choose from items in a register.

register - A list of information designed to be an accurate and up-to-date source of data from government. Once entered into a register, the contents can only be added to, they cannot be deleted or rewritten.

territory - An administrative or geographical entity that isn't recognised as a country by the UK.

territory register - A list of British English-language names and descriptive terms for political, administrative and geographical entities that aren’t recognised as countries by the UK.
