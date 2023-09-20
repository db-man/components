import React from 'react';
export declare function TableList({ dbName }: {
    dbName: any;
}): import("react/jsx-runtime").JSX.Element | null;
export declare function ActionList({ dbName, tableName }: {
    dbName: any;
    tableName: any;
}): import("react/jsx-runtime").JSX.Element;
/**
 * To render list/create/update page for `/db_name/table_name.json`
 */
export default class PageWrapper extends React.Component {
    constructor(props: any);
    componentDidMount(): void;
    get columns(): any;
    get pageInfo(): {
        appModes: string[];
        dbName: any;
        tableName: any;
        action: any;
        columns: any;
        primaryKey: string | null;
        tables: any;
        githubDb: any;
    };
    getOnlineData: () => Promise<void>;
    getOfflineData: () => void;
    renderTableListInDb: () => import("react/jsx-runtime").JSX.Element;
    renderActionInTable: () => import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
//# sourceMappingURL=PageWrapper.d.ts.map