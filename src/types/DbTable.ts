import Column from './Column';

export default interface DbTable {
  /**
   * The name of the table.
   */
  name: string;
  /**
   * The columns of the table.
   * Array of column definition
   */
  columns: Column[];
  /**
   * If true, the table is large, e.g. `users` table.
   * Optional, default is false. Set to true for large table file which is more than 1MB.
   */
  large: boolean;
}
