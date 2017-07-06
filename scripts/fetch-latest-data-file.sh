#!/bin/sh

wget -O dist/location-picker-graph.json https://5cq56v9u9f.execute-api.eu-west-2.amazonaws.com/prod/fetch
node ./scripts/generate-canonical-list.js > dist/location-picker-canonical-list.json
