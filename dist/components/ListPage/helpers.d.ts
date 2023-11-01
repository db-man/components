import { SortOrder } from 'antd/es/table/interface';
import DbColumn from '../../types/DbColumn';
import { RowType } from '../../types/Data';
/**
 * Search "oo"(keyword) in "foobar200"(text)
 * @param {string} keyword
 * @param {string} text
 */
export declare const searchKeywordInText: (keyword: string, text: string) => boolean;
/**
 * Search "234"(keyword) in `123456`(text)
 * @param {string} keyword
 * @param {number} number
 */
export declare const searchNumberKeywordInText: (keyword: string, number: number) => boolean;
/**
 * Search keyword 'do' in string array ['dog', 'cat']
 * @param {string|undefined} keyword Search keyword
 * @param {string[]} tags The table cell value
 * @return {boolean}
 */
export declare const searchStringInArray: (keyword: string, tags: string[]) => boolean;
/**
 * Search keyword in string array, e.g. find "ap" in ["apple","banana"]
 * @param {string|undefined} keyword Search keyword
 * @param {string[]} tags The table cell value
 * @return {boolean}
 */
export declare const searchKeywordInTags: (keyword: string, tags: string[]) => boolean;
export declare const searchKeywordsInTagsWithLogicAnd: (keywords: string[], tags: string[]) => boolean;
export declare const searchKeywordsInTagsWithLogicOr: (keywords: string[], tags: string[]) => boolean;
/**
 * Search filterKeyword in cellValue
 * @param {string} filterKeyword Search keyword
 * - AND: "a+b" to search ["a","b"]
 * - OR : "a b" to search ["a"]
 * @param {string[]} [cellValue] The table cell value
 */
export declare const stringArrayFilter: (filterKeyword: string, cellValue?: string[]) => boolean;
export declare const isAllFilterInvalid: (filter: {
    [key: string]: string;
}, filterColumnIds: string[]) => boolean;
/**
 * @param {Object} filterKeyVals
 * @param {Array} originalRows
 * @param {Column[]} filterColumns The table columns definitions,
 * but only the col which is filterable
 * @returns {Array}
 */
export declare const getFilteredData: (filterColumns: DbColumn[], filterKeyVals: {
    [key: string]: string;
}, originalRows: RowType[]) => RowType[];
export declare const getSortedData: (originalData: RowType[], sorter: {
    columnKey: string;
    order: string;
}) => RowType[];
export declare const findDuplicates: (arr: string[]) => string[];
/**
 * @returns {object} e.g. `{"name":"foo"}`
 */
export declare const getInitialFilter: (filterProp: DbColumn[]) => {
    [key: string]: string;
};
export declare const getInitialSorter: () => {
    columnKey: string;
    order: string;
};
export declare const updateUrl: (states: {
    [key: string]: string;
}) => void;
export declare const getColumnSortOrder: (columnId: string, sorter: {
    columnKey: string;
    order: string;
}) => SortOrder;
//# sourceMappingURL=helpers.d.ts.map