/**
 * ```json
 * {
 *   "iam": [
 *     {"name": "users", "large": true},
 *     {"name": "roles"}
 *   ]
 * }
 * ```
 */
export declare const dbs: any;
export declare const getDbs: () => any;
export declare const getTablesByDbName: (dbName: any) => any;
export declare const setDbs: (val: any) => void;
export declare const getTable: (dbName: any, tableName: any) => any;
export declare const isLargeTable: (dbName: any, tableName: any) => any;
