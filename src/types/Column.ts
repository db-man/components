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

export default interface Column {
  id: string;
  name: string;
  type: ColumnType;
  'type:createUpdatePage': string;
  placeholder: ColumnPlaceholder;
  enum?: string[];
}
