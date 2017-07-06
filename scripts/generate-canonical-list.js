const graph = require('../dist/location-picker-graph.json')

const result = Object.keys(graph)
  .filter((key) => {
    return graph[key].meta.canonical
  })
  .map((key) => {
    return [graph[key].names['en-GB'], key]
  })
  .sort((left, right) => {
    const isLowerThan = left[0] < right[0]
    const isGreaterThan = left[0] > right[0]
    if (isLowerThan) {
      return -1
    } else if (isGreaterThan) {
      return 1
    } else {
      return 0
    }
  })

console.log(JSON.stringify(result))
