# DOC

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

One of "STRING", "STRING_ARRAY", "NUMBER" or "BOOL". Default is "STRING".

| type         | Default UI Component |
| ------------ | -------------------- |
| STRING       | Input                |
| STRING_ARRAY | Select mode="tags"   |
| NUMBER       | InputNumber          |
| BOOL         | Switch               |

`{"type": "STRING_ARRAY"}` is the same as `{"type": "STRING_ARRAY","type:createUpdatePage":"Select"}`

### `primary`

Only one column in table should have this field.
`true` to indicate this column is an uniq key of this table.

### `placeholder`

Only used in CreatePage or UpdatePage, only used in Input component (of type=STRING).

### `enum`

Used when `type="STRING"`, and `type:createUpdatePage="RadioGroup"`.
Only used on create/update page.
To render some Radio components with given text, click one of the Radio to fill the text in input box.

```json
{
  "id": "vehicleType",
  "name": "Vehicle Type",
  "type": "STRING",
  "enum": ["car", "bike"]
}
```

### `quickOptions`

Used when `type="STRING_ARRAY"`, and default UI component `Select` is used.
Only used on create/update page.
To render some buttons on top of the dropdown, click button to quick input a new tag into dropdown.

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

- .github/workflows/merge.yml - https://github.com/db-man/split-table-db/blob/main/.github/workflows/merge.yml
- .github/workflows/split.yml - https://github.com/db-man/split-table-db/blob/main/.github/workflows/split.yml
- merge.mjs - https://github.com/db-man/split-table-db/blob/main/merge.mjs
- split.mjs - https://github.com/db-man/split-table-db/blob/main/split.mjs
- cli/utils.mjs - https://github.com/db-man/split-table-db/blob/main/cli/utils.mjs

## Database examples

- [https://github.com/db-man/db](https://github.com/db-man/db)
- [https://github.com/db-man/split-table-db](https://github.com/db-man/split-table-db)

## Glossary

```json
{
  "id": "product_id",
  "type:listPage": [
    "ImageLink",
    "{\"url\":\"https://brickset.com/{{record.product_id}}-1\",\"imgSrc\":\"https://img.brickset.com/{{record.product_id}}-1.jpg\"}"
  ]
}
```

- `"type:listPage"` - render key
- `["ImageLink","{\"url\":\"http://a.com/{{record.id}}\",\"imgSrc\":\"http://b.com/{{record.name}}.jpg\"}"]` - render expression
  - `ImageLink` - render expression built-in function name
  - `"{\"url\":\"http://a.com/{{record.id}}\",\"imgSrc\":\"http://b.com/{{record.name}}.jpg\"}"]` - render expression function template
