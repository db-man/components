/**
 * @param {string|string[]} args
 * @param {Object} tplExtra
 */
export declare const getRender: (args: any, tplExtra: any) => any;
/**
 * column def:
 * {
 *   "type:listPage": ["Link", "{{record.url}}"]
 * }
 */
export declare const getColumnRender: (renderKey: any, column: any, tplExtra: any) => any;
export declare const getRenderResultByColumn: (value: any, record: any, index: any, args: any, column: any) => any;
