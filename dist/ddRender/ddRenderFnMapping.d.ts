/**
 * Data Driving Render Function Mapping
 */
declare const ddRenderFnMapping: {
    /**
     * @param {number|string} val e.g. "docs"
     * @param {Object} record e.g. `{"org":"github","repo":"docs"}`
     * @param {number} index e.g. 9, it's the 10th row
     * @param {Object|undefined} args e.g `["Link", "{\"href\":\"https://github.com/{{record.org}}/{{record.repo}}\",\"text\":\"{{record.repo}}\"}"]`
     *                                args could be undefined when column is {"type:listPage": "Link"}
     *  Usage:
     * 1. "type:getPage": ["Link", "{\"href\":\"https://github.com/{{record.org}}/{{record.repo}}\",\"text\":\"{{record.repo}}\"}"],
     * 2. "type:listPage": ["Link", "{\"href\":\"https://github.com/{{record.org}}/{{record.repo}}\",\"text\":\"{{record.repo}}\"}"]
     * 3. "type:listPage": "Link"
     */
    Link: (val: any, record: any, index: any, args: any, tplExtra: any) => import("react/jsx-runtime").JSX.Element;
    /**
     * Usage:
     * ```json
     * {"type:listPage": ["ImageLink",
     *   "{\"url\":\"{{record.url}}\",\"imgSrc\":\"{{record.url}}_th.jpg\",
     *     \"tags\":\"{{record.tags}}\"}"
     * ]}
     * ```
     * Issues:
     *   When record.url="https://foo.com/get?foo=bar".
     *   By using `{{record.url}}` will generate "https://foo.com/get?foo&#x3D;bar".
     *   To prevent this issue, `{{{record.url}}}` could be used. (https://handlebarsjs.com/guide/expressions.html#html-escaping)
     */
    ImageLink: (val: any, record: any, index: any, args: any, tplExtra: any) => import("react/jsx-runtime").JSX.Element;
    ImageLinks: (val: any, record: any, index: any, args: any, tplExtra: any) => import("react/jsx-runtime").JSX.Element;
    /**
     * Usage:
     * ```json
     * {"type:listPage": ["Fragment", "{{join record.tags \", \"}}"]}
     * ```
     */
    Fragment: (val: any, record: any, index: any, args: any, tplExtra: any) => import("react/jsx-runtime").JSX.Element;
    Links: (val: any, record: any, index: any, args: any, tplExtra: any) => import("react/jsx-runtime").JSX.Element;
    /**
     * Usage:
     * ```json
     * {
     *   "type:getPage": [
     *     "PhotoList",
     *     "[{{#each record.photoUrls}}{{#if @index}},{{/if}}{\"url\":\"{{this}}\",\"imgSrc\":\"{{this}}_th.jpg\",\"description\":\"{{#with (getTableRecordByKey tables=../extra.tables tableName=\"rates\" primaryKeyVal=this rows=../extra.rows)}}{{join tags \", \"}}{{/with}}\"}{{/each}}]"
     *   ]
     * }
     * ```
     */
    PhotoList: (val: any, record: any, index: any, args: any, tplExtra: any) => import("react/jsx-runtime").JSX.Element;
    TextAreaFormFieldValue: (val: any, record: any, index: any, args: any, tplExtra: any) => import("react/jsx-runtime").JSX.Element;
};
export default ddRenderFnMapping;
//# sourceMappingURL=ddRenderFnMapping.d.ts.map