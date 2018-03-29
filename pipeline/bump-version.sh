#!/usr/bin/env bash

npm version patch
git commit -a -m "Bumped version"
version=$(cat ./package.json | jq '.version')
git tag -a ${version} -m ${version}
git push