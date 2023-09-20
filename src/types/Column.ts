import { ColumnType as AntdColumnType } from 'antd/es/table';
import {
  GetPageUiType,
  ListPageUiType,
  RadioGroupUiTypeEnum,
  UiType,
} from './UiType';

// Only used in CreatePage or UpdatePage, only used in Input component (of type=STRING).
type ColumnPlaceholder = string;

/**
 * One of "STRING", "STRING_ARRAY", "NUMBER" or "BOOL".

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
  /**
   * Required. The id of this column.
   */
  id: string;
  /**
   * Required. The name of this column.
   */
  name: string;
  /**
   * Required. The type of this column.
   */
  type: ColumnType;
  /**
   * Only one column in table should have this field.
   * `true` to indicate this column is an uniq key of this table.
   */
  primary: boolean;
  'type:createUpdatePage': UiType;
  'type:getPage': GetPageUiType;
  'type:listPage'?: ListPageUiType;
  placeholder: ColumnPlaceholder;
  /**
   * If true, on the list page, the column will be shown in the filter section.
   */
  filter: boolean;
  /**
   * In the Form page, e.g. to create a new user, use it to show a dropdown list with "Maintainer" and "Developer".
   */
  enum?: RadioGroupUiTypeEnum;
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
