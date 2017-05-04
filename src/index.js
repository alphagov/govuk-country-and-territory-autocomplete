import {enhanceSelectElement} from 'accessible-typeahead'
import openregisterPickerEngine from 'openregister-picker-engine'

function inputValueTemplate (result) {
  return result && result.name
}

function suggestionTemplate (result) {
  const path = result && result.path
    ? ' (' + result.path + ')'
    : ''
  return result && '<strong>' + result.name + '</strong>' + path
}

function openregisterLocationPicker (opts) {
  // Set defaults.
  opts.autoselect = opts.autoselect || true

  opts.fallback = opts.fallback || ((query, syncResults) => {
    const availableOptions = Array.prototype.map.call(opts.selectElement.options, o => o.innerHTML)
    const filteredResults = query
      ? availableOptions.filter(r => r.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      : []
    const templatedResults = filteredResults.map(r => ({ name: r }))
    syncResults(templatedResults)
  })

  opts.minLength = opts.minLength || 2

  opts.onSelect = opts.onSelect || ((result) => {
    var requestedOption = Array.prototype.filter.call(opts.selectElement.options, o => o.innerHTML === result && result.name)[0]
    if (requestedOption) { requestedOption.selected = true }
  })

  opts.source = opts.source || openregisterPickerEngine({ url: opts.url, fallback: opts.fallback })

  opts.templates = opts.templates || {
    inputValue: inputValueTemplate,
    suggestion: suggestionTemplate
  }

  enhanceSelectElement(opts)
}

module.exports = openregisterLocationPicker
