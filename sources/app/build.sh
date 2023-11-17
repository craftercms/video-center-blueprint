#!/usr/bin/env bash

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
echo ">>> Starting app build"
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
echo ""

echo "Deleting prior build"
rm -rf ../../static-assets/app/*

# Build the app
yarn build-vite

echo "Restoring .gitkeep"
touch ../../static-assets/app/.gitkeep

git add ../../static-assets/app

echo ""
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
echo "<<< Build completed successfully :)"
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
