# Develop

## Install

```
npm i
```

Dev

```
npm start
```

## Publish

```
CI=true npm test
npm run build
git add . && git commit -m 'Build'
npm version patch
git push && git push origin v0.1.2
npm publish --access=public
```

## Preview demos

- http://localhost:3000/ - The whole App example
- http://localhost:3000/demos - Other examples
- http://localhost:3000/?example=dbconnections - Access example one by one

## FAQ

* Why `lib` dir should be pushed to repo?
  * Because in github.com/db-man/db-man.github.io, it depends current package from direct GitHub repo like this: `... "dependencies": { "@db-man/components": "github:db-man/components", ...`