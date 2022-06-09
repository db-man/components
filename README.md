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

Add below 2 lines to top of `src/App.css`.

```css
@import '~db-man/components/layout/App.css';
@import '~antd/dist/antd.css';
```

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

### `type:listPage`

#### Hide this column

Set `HIDE` will hide this column in table.

```json
{
  "id": "product_id",
  "type:listPage": "HIDE"
}
```

#### Custom UI component

On list page, choose the UI component to use for this column.

Below is an example of using `ImageLink` component. The string after "ImageLink" is a template (Handlebars).
It will transform the `record` which passing from antd `Table` component, into a props object like `{url:'',imgSrc:''}`.
This props will pass to `ImageLink` component.

```json
{
  "id": "product_id",
  "type:listPage": [
    "ImageLink",
    "{\"url\":\"https://brickset.com/{{record.product_id}}-1\",\"imgSrc\":\"https://img.brickset.com/{{record.product_id}}-1.jpg\"}"
  ]
}
```

## Split table

* .github/workflows/merge.yml - https://github.com/db-man/split-table-db/blob/main/.github/workflows/merge.yml
* .github/workflows/split.yml - https://github.com/db-man/split-table-db/blob/main/.github/workflows/split.yml
* merge.mjs - https://github.com/db-man/split-table-db/blob/main/merge.mjs
* split.mjs - https://github.com/db-man/split-table-db/blob/main/split.mjs
* cli/utils.mjs - https://github.com/db-man/split-table-db/blob/main/cli/utils.mjs