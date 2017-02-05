#!/usr/bin/env bash

echo 'Cleaning up...'
rm -rf dist
mkdir dist

echo 'Moving assets...'
cp -r public/* dist/
rm -f dist/vendor.js
rm -f dist/vendor.*.js
rm -f dist/app.js
rm -f dist/app.*.js

echo 'Bundling...'
NODE_ENV=production webpack

echo 'Modifying index file...'
node hash-html

echo 'Deploying to firebase...'
firebase deploy