# components

[![CI status][github-action-badge]][github-action-url] [![codecov][codecov-badge]][codecov-url]

[github-action-badge]: https://github.com/db-man/components/actions/workflows/test.yml/badge.svg
[github-action-url]: https://github.com/db-man/components/actions/workflows/test.yml
[codecov-badge]: https://codecov.io/gh/db-man/components/branch/main/graph/badge.svg
[codecov-url]: https://app.codecov.io/gh/db-man/components

## How to use

```
npx create-react-app my-app
cd my-app
yarn add @db-man/components antd
```

Modify `src/App.jsx`

```jsx
import { App } from '@db-man/components'
import './App.css'
export default function () {
  return <App />
}
```

Add `@import '~antd/dist/antd.css';` to top of `src/App.css`.

## Column definition

```json
{
  "id": "userId",
  "name": "User ID",
  "type": "string",
  "primary": true
}
```

### `id` (Required)
### `name` (Required)
### `type` (Optional)

Fill "STRING" or "STRING_ARRAY".

### `primary`

Only one column in table should have this field.
`true` to indicate this column is an uniq key of this table.

### `enum`

```json
{
  "id": "vehicleType",
  "name": "Vehicle Type",
  "type": "string",
  "enum": ["car", "bike"]
}
```