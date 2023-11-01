export declare function TableList({ dbName }: {
    dbName: string;
}): import("react/jsx-runtime").JSX.Element | null;
export declare function ActionList({ dbName, tableName, }: {
    dbName: string;
    tableName: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * To render list/create/update page for `/db_name/table_name.json`
 */
declare const PageWrapper: (props: {
    dbName?: string | undefined;
    tableName?: string | undefined;
    action?: string | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export default PageWrapper;
//# sourceMappingURL=PageWrapper.d.ts.map