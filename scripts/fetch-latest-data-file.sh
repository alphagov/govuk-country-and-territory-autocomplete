#!/bin/sh

wget -O tmp/location-autocomplete-graph.json https://5cq56v9u9f.execute-api.eu-west-2.amazonaws.com/prod/fetch
node ./scripts/generate-canonical-list.js > dist/location-autocomplete-canonical-list.json
node ./scripts/prettify-autocomplete-graph.js > dist/location-autocomplete-graph.json
