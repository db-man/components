/// <reference types="react" />
import DbColumn, { RenderKeyType } from '../types/DbColumn';
import { RowType } from '../types/Data';
import { RenderArgs } from '../types/UiType';
/**
 * @param {string|string[]} args e.g. "Link" or ["Link", "{{record.url}}"]
 * @param {Object} tplExtra
 */
export declare const getRender: (args: RenderArgs, tplExtra?: any) => ((val: any, record: RowType, index?: number | undefined, args?: RenderArgs | undefined, tplExtra?: any) => JSX.Element) | undefined;
/**
 * column def:
 * {
 *   "type:listPage": ["Link", "{{record.url}}"]
 * }
 */
export declare const getColumnRender: (renderKey: RenderKeyType, column: DbColumn, tplExtra?: any) => ((val: any, record: RowType, index?: number | undefined, args?: RenderArgs | undefined, tplExtra?: any) => JSX.Element) | ((val: number) => number) | ((val: string) => string) | ((val: string[]) => string) | ((val: boolean) => string);
//# sourceMappingURL=ddRender.d.ts.map