# Openregister Location Picker

The location picker is a simple UI widget that allows end users to find and select a location. It includes auto-complete functionality, to make it faster and easier for users to find a location. For example, to select their country of birth or their current location.

The picker uses data from the UK government's Country and Territory registers. To configure the data used in the picker to suit the specific needs of your product or service, please contact the registers team at [registerteam@digital.cabinet-office.gov.uk](registerteam@digital.cabinet-office.gov.uk).

The picker itself follows the common look and feel of GOV.UK in line with the [design principles](https://www.gov.uk/design-principles).

![A screenshot of the new country and territory picker](docs/location-picker-general.gif)

This guide will show you how to:
* populate the picker's autocomplete field
* use and the picker's data file

Contact the registers team at [registerteam@digital.cabinet-office.gov.uk](registerteam@digital.cabinet-office.gov.uk) if you have any problems or questions that are not covered in this guide.

[Try out the example!](https://alphagov.github.io/openregister-location-picker/examples/)

## Before you start

This guide assumes you have a service that outputs HTML. It makes some choices for you with respect to which data is passed back and persisted to your service. Please [contact the registers team](registerteam@digital.cabinet-office.gov.uk) to discuss your requirements.

## Integration process

To integrate an application with the picker, you will need to:
* use the data from the country and territory registers
* create an accessible autocomplete widget

### Add location data from country and territory registers

To use register data in the picker, you will need two files:
* [location-picker-canonical-list.json](dist/location-picker-canonical-list.json) - a list of every canonical country and territory
* [location-picker-graph.json](dist/location-picker-graph.json) - a directed acyclic graph mapping canonical locations to abbreviations, synonyms, endonyms, and typos

Copy both files to your application. The `location-picker-graph.json` file must be exposed as a public asset.

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

On the page where you're rendering the previous `<select>` dropdown, include the following HTML:

```html
<!-- In your <head> -->
<link rel="stylesheet" href="https://unpkg.com/accessible-typeahead@0.4.2/examples/styled.css" />

<!-- At the end of your <body> -->
<script type="text/javascript" src="https://unpkg.com/openregister-picker-engine@1.0.0"></script>
<script type="text/javascript" src="https://unpkg.com/accessible-typeahead@0.4.2"></script>
<script type="text/javascript">
  var selectElement = document.getElementById('location-picker')
  var dataFilePath = 'data/location-picker-graph.json'

  function onSelect (result) {
    var requestedOption = Array.prototype.filter.call(selectElement.options, function (o) { return o.innerHTML === result.name })[0]
    if (requestedOption) { requestedOption.selected = true }
  }

  function inputValueTemplate (result) {
    return result && result.name
  }

  function suggestionTemplate (result) {
    var path = result && result.path
      ? ' (' + result.path + ')'
      : ''
    return result && '<strong>' + result.name + '</strong>' + path
  }

  AccessibleTypeahead.enhanceSelectElement({
    autoselect: true,
    selectElement: selectElement,
    minLength: 2,
    onSelect: onSelect,
    source: openregisterPickerEngine(dataFilePath),
    templates: {
      inputValue: inputValueTemplate,
      suggestion: suggestionTemplate
    }
  })
</script>
```

This will render the same `<select>` menu as before on the server, but hides it and progressively enhances to a typeahead when JavaScript kicks in. When the user selects something in the typeahead, the hidden `<select>` menu is still updated, so everything works as before.

[Try out the index.html example!](https://alphagov.github.io/openregister-location-picker/examples/)

## Support and troubleshooting

GDS maintains the platform behind registers and creates widgets such as the location picker to make it easier for service teams to use register data.

Contact GDS if you want to use the picker, but your needs differ from what is covered in this guide.

GDS provides operational support from 09:00 - 17:00 Monday-Friday.

Contact the GDS registers team at [registerteam@digital.cabinet-office.gov.uk](registerteam@digital.cabinet-office.gov.uk) if you have any problems or questions that are not covered in this guide. Please include screenshots if useful.

You can also raise an issue against this repository if you prefer.

## Glossary

country -

country register - A list of British English-language names and descriptive terms for countries.

location - A country or territory.

picker - A widget that allows you to choose from items in a register.

register - A list of information designed to be an accurate and up-to-date source of data from government. Once entered into a register, the contents can only be added to, they cannot be deleted or rewritten.

territory - An administrative or geographical entity that isn't recognised as a country by the UK.

territory register - A list of British English-language names and descriptive terms for political, administrative and geographical entities that aren’t recognised as countries by the UK.
