#!/bin/sh

# Copy content from build to build_copy, overwriting existing files
cp -rf /usr/src/app/build/* /usr/src/app/build_copy/

# Run the development server
# npm run dev:server
npm run dev