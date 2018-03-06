#!/usr/bin/env bash

version=$(cat ./package.json | jq '.version')

echo Tagging Git Repo with version $version
git tag -a $version -m $version

echo Pushing $version tag up to repo
git push origin $version

echo Publishing @CandidPartners/tf-parse v$version
#npm publish --access public
