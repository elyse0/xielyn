#!/bin/bash

ZIP_FILENAME=gcp-function-hanzi-pinyin-captions

rm -rfv dist/
rm $ZIP_FILENAME.zip 2> /dev/null

npm run build

npx pnpm-bundle-workspace-package .

cd bundled
rm -rfv src/
rm build-gcp-function.sh
mv dist/* .

zip -r ../$ZIP_FILENAME *
