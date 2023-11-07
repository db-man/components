import { types } from '@db-man/github';
import DbColumn from './types/DbColumn';
export declare const getUrlParams: () => {
    [k: string]: string;
};
/**
 *
 * @param {*} columns
 * @returns {string}
 */
export declare const getPrimaryKey: (columns: DbColumn[]) => string;
export declare const getTablePrimaryKey: (tables: types.DbTable[], tableName: string) => string;
export declare const errMsg: (msg: string, err?: Error) => void;
export declare const downloadImage: (imgUrl: string) => void;
//# sourceMappingURL=utils.d.ts.map