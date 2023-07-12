rm -rf lib
./node_modules/.bin/babel src --out-dir lib --extensions '.ts,.tsx,.js,.jsx,.snap' --copy-files --ignore 'src/**/*.js.snap' --no-copy-ignored
