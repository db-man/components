import { ColumnType as AntdColumnType } from 'antd/es/table';
import {
  GetPageUiType,
  ListPageUiType,
  RadioGroupUiTypeEnum,
  RandomPageUiType,
  UiType,
} from './UiType';

// Only used in CreatePage or UpdatePage, only used in Input component (of type=STRING).
type ColumnPlaceholder = string;

// DEPRECATED: Use types.ColumnType from @db-man/github instead
export type ColumnType = 'STRING' | 'STRING_ARRAY' | 'NUMBER' | 'BOOL';

export default interface Column extends AntdColumnType<Record<string, any>> {
  // TODO these 4 fields are already defined in types.Column, remove them
  id: string;
  name: string;
  type: ColumnType;
  primary?: boolean;

  'type:createUpdatePage'?: UiType;
  'type:getPage'?: GetPageUiType;
  'type:listPage'?: ListPageUiType;
  'type:randomPage'?: RandomPageUiType;
  /**
   * - Only used on create/update page.
   *   - When `type="STRING_ARRAY"`, and default UI component `Select` is used.
   *     - To render some buttons on top of the dropdown, click button to quick input a new tag into dropdown.
   *   - When `type="STRING"`, and default UI component `Input` is used.
   *     - To render some buttons on top of the input box, click button to quick input a new text into input box.
   */
  'ui:presets'?: string[];
  placeholder?: ColumnPlaceholder;
  /**
   * If true, on the list page, the column will be shown in the filter section.
   */
  filter?: boolean;
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
