rm -rf dist
./node_modules/.bin/babel src --out-dir dist --extensions '.ts,.tsx,.js,.jsx,.snap' --copy-files --ignore 'src/**/*.js.snap' --no-copy-ignored --source-maps
tsc