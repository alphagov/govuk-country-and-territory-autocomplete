const graph = require('../tmp/location-picker-graph.json')
const stringify = require('json-stable-stringify')

console.log(stringify(graph, { space: '  ' }))
