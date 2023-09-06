/**
 * Search "oo"(keyword) in "foobar200"(text)
 * @param {string} keyword
 * @param {string} text
 */
export declare const searchKeywordInText: (keyword: any, text: any) => boolean;
/**
 * Search "234"(keyword) in `123456`(text)
 * @param {string} keyword
 * @param {number} number
 */
export declare const searchNumberKeywordInText: (keyword: any, number: any) => boolean;
/**
 * Search keyword 'do' in string array ['dog', 'cat']
 * @param {string|undefined} keyword Search keyword
 * @param {string[]} tags The table cell value
 * @return {boolean}
 */
export declare const searchStringInArray: (keyword: any, tags: any) => boolean;
/**
 * Search keyword in string array, e.g. find "ap" in ["apple","banana"]
 * @param {string|undefined} keyword Search keyword
 * @param {string[]} tags The table cell value
 * @return {boolean}
 */
export declare const searchKeywordInTags: (keyword: any, tags: any) => any;
export declare const searchKeywordsInTagsWithLogicAnd: (keywords: any, tags: any) => any;
export declare const searchKeywordsInTagsWithLogicOr: (keywords: any, tags: any) => any;
/**
 * Search filterKeyword in cellValue
 * @param {string} filterKeyword Search keyword
 * - AND: "a+b" to search ["a","b"]
 * - OR : "a b" to search ["a"]
 * @param {string[]} [cellValue] The table cell value
 */
export declare const stringArrayFilter: (filterKeyword: any, cellValue?: never[]) => any;
export declare const isAllFilterInvalid: (filter: any, filterColumnIds: any) => boolean;
/**
 * @param {Object} filterKeyVals
 * @param {Array} originalRows
 * @param {Column[]} filterColumns The table columns definitions,
 * but only the col which is filterable
 * @returns {Array}
 */
export declare const getFilteredData: (filterColumns: any, filterKeyVals: any, originalRows: any) => any;
export declare const getSortedData: (originalData: any, sorter: any) => any[];
export declare const findDuplicates: (arr: any) => any[];
/**
 * @returns {object} e.g. `{"name":"foo"}`
 */
export declare const getInitialFilter: (filterProp: any) => {};
export declare const getInitialSorter: () => {
    columnKey: string;
    order: string;
};
export declare const updateUrl: (states: any) => void;
export declare const getColumnSortOrder: (columnId: any, sorter: any) => any;
//# sourceMappingURL=helpers.d.ts.map