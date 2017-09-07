const graph = require('../tmp/location-autocomplete-graph.json')
const stringify = require('json-stable-stringify')

console.log(stringify(graph, { space: '  ' }))
