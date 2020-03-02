#!/usr/bin/env bash

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
echo ">>> Starting app build"
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
echo ""

# Build the app
react-scripts build

echo "Deleting prior build"
rm -rf ../../static-assets/app/*

echo "Restoring .gitkeep"
touch ../../static-assets/app/.gitkeep

echo "Copying app build to static assets"
cp -rf ./build/* ../../static-assets/app/

git add ../../static-assets/app

echo "Delete react build output directory"
rm -rf ./build

echo ""
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
echo "<<< Build completed successfully :)"
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
