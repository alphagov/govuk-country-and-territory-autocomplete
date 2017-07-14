import {enhanceSelectElement} from 'accessible-autocomplete'
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
  opts.fallback = opts.fallback || ((query, syncResults) => {
    const availableOptions = Array.prototype.map.call(opts.selectElement.options, o => o.innerText)
    const filteredResults = query
      ? availableOptions.filter(r => r.toLowerCase().indexOf(query.toLowerCase()) !== -1)
      : []
    const templatedResults = filteredResults.map(r => ({ name: r }))
    syncResults(templatedResults)
  })

  opts.minLength = opts.minLength || 2

  opts.onConfirm = opts.onConfirm || ((result) => {
    var requestedOption = Array.prototype.filter.call(opts.selectElement.options, o => o.innerText === (result && result.name))[0]
    if (requestedOption) { requestedOption.selected = true }
  })
  
  const optionsWithAdditionalSynonyms = Array.prototype
    .filter.call(opts.selectElement.options, option => option.dataset && option.dataset.additionalSynonyms)
  const htmlAdditionalSynonyms = optionsWithAdditionalSynonyms
    .map(option => ({ code: option.value, synonyms: option.dataset.additionalSynonyms }))
    .reduce((allSynonyms, currentSet) => {
      const moreSynonyms = JSON.parse(currentSet.synonyms)
        .map(synonymName => ({ name: synonymName, code: currentSet.code }))
      return allSynonyms.concat(moreSynonyms)
    }, [])

  opts.additionalSynonyms = (opts.additionalSynonyms || []).concat(htmlAdditionalSynonyms)

  opts.source = opts.source || openregisterPickerEngine({
    additionalSynonyms: opts.additionalSynonyms,
    url: opts.url,
    fallback: opts.fallback
  })

  opts.templates = opts.templates || {
    inputValue: inputValueTemplate,
    suggestion: suggestionTemplate
  }

  enhanceSelectElement(opts)
}

module.exports = openregisterLocationPicker
