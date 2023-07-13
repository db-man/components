# DOC

## Table of content

<!-- toc -->

## Database connections

| key | owner | token | repo | path | modes |
| --- | --- | --- | --- | --- | --- |
|1|db-man|...|db|dbs||
|2|db-man|...|split-table-db|dbs|split-table|

When a database is set `split-table`, when update a table record, will only update the table record file, not the whole table file.

## Database structure

* dbs/iam/columns.json All tables in this database, and all columns in each table
* dbs/iam/users.data.json Table data file
* dbs/iam/users/*.json Table record files. These files are split from `users.data.json` file. (Only in `split-table` mode)

## Table definition

Table is defined in `columns.json` file.

```json
{
  "name": "users",
  "columns": [
    { "id": "userId", "name": "User ID", "primary": true },
    { "id": "name", "name": "Name" },
    { "id": "age", "name": "Age", "type": "NUMBER" },
    { "id": "active", "name": "Active", "type": "BOOL" },
    { "id": "tags", "name": "Tags", "type": "STRING_ARRAY" },
    {
      "id": "notes",
      "name": "Notes",
      "type": "STRING",
      "type:createUpdatePage": "TextArea"
    }
  ],
  "large": true
}
```

* table.name - Table name
* table.columns - Array of column definition
* table.large - Optional, default is false. Set to true for large table file which is more than 1MB.

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

### `ui:presets`

* Only used on create/update page.
  * When `type="STRING_ARRAY"`, and default UI component `Select` is used.
    * To render some buttons on top of the dropdown, click button to quick input a new tag into dropdown.
  * When `type="STRING"`, and default UI component `Input` is used.
    * To render some buttons on top of the input box, click button to quick input a new text into input box.

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
