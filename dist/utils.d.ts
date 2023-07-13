import { types } from '@db-man/github';
export declare const getUrlParams: () => {
    [k: string]: string;
};
/**
 *
 * @param {*} columns
 * @returns {string|null}
 */
export declare const getPrimaryKey: (columns: types.Column[]) => string | null;
export declare const getTablePrimaryKey: (tables: types.Table[], tableName: string) => string | null;
export declare const errMsg: (msg: string, err: Error) => void;
//# sourceMappingURL=utils.d.ts.map