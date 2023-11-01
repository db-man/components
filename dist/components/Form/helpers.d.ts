import { ValueType } from '.';
import DbColumn from '../../types/DbColumn';
import { UiType } from '../../types/UiType';
/**
 * Check duplicated primary key
 * For example, if `id` is primary key, then there should not be two id=1 record in table
 */
export declare const validatePrimaryKey: (value: string, content: ValueType[], primaryKey: string) => boolean;
/**
 * @param {*} column
 * @param {string} uiType e.g. "MultiLineInputBox"
 * @returns {is:bool,preview:bool}
 */
export declare const isType: (column: DbColumn, uiType: UiType) => {
    is: boolean;
    preview: boolean;
};
export declare const obj2str: (obj: ValueType) => string;
export declare const str2obj: (str: string) => import("../../types/Data").RowType;
export declare const getFormInitialValues: (columns: DbColumn[], formValues: ValueType) => {
    [key: string]: any;
};
//# sourceMappingURL=helpers.d.ts.map