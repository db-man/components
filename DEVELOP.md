## dev

Publish

```
yarn test --watchAll=false
yarn build
git add . && git commit
npm version patch
git push && git push origin v0.1.2
npm publish --access=public
```