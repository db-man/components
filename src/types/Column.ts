import { ColumnType as AntdColumnType } from 'antd/es/table';

// Only used in CreatePage or UpdatePage, only used in Input component (of type=STRING).
type ColumnPlaceholder = string;

/**
 * One of "STRING", "STRING_ARRAY", "NUMBER" or "BOOL". Default is "STRING".

| type         | Default UI Component |
| ------------ | -------------------- |
| STRING       | Input                |
| STRING_ARRAY | Select mode="tags"   |
| NUMBER       | InputNumber          |
| BOOL         | Switch               |

`{"type": "STRING_ARRAY"}` is the same as `{"type": "STRING_ARRAY","type:createUpdatePage":"Select"}`
 */
type ColumnType = 'STRING' | 'STRING_ARRAY' | 'NUMBER' | 'BOOL';

export default interface Column extends AntdColumnType<Record<string, any>> {
  id: string;
  name: string;
  type: ColumnType;
  'type:createUpdatePage': string;
  'type:getPage': string;
  placeholder: ColumnPlaceholder;
  /**
   * If true, on the list page, the column will be shown in the filter section.
   */
  filter: boolean;
  enum?: string[];
  /**
   * If is 'HIDE', the column will not be shown on the list page.
   */
  'type:listPage'?: string | 'HIDE';
  /**
   * Pass to the Column of Ant Design Table.
   */
  tableProps?: any;
  /**
   * The value in this column is a reference to another table.
   * For example
   *
   * `users` table:
   * | id | name | role_code |
   * | -- | ---- | --------- |
   * | 1  | John | ADMIN     |
   *
   * `roles` table:
   * | code   | name |
   * | ------ | ---- |
   * | ADMIN  | Administrator |
   *
   * `users.role_code` is a reference to `roles.code`.
   * So the column definition of `users.role_code` is:
   * ```json
   * {
   *   "id": "role_code",
   *   "name": "Role",
   *   "referenceTable": "roles"
   * }
   */
  referenceTable?: string;
}
