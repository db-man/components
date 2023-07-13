/**
 * Check duplicated primary key
 * For example, if `id` is primary key, then there should not be two id=1 record in table
 */
export declare const validatePrimaryKey: (value: any, content: any, primaryKey: any) => boolean;
/**
 * @param {*} column
 * @param {string} uiType e.g. "MultiLineInputBox"
 * @returns {is:bool,preview:bool}
 */
export declare const isType: (column: any, uiType: any) => {
    is: boolean;
    preview: boolean;
};
