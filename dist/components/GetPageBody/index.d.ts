import React from 'react';
export default class GetPageBody extends React.Component {
    constructor(props: any);
    componentDidMount(): void;
    get isSplitTable(): boolean;
    /**
     * If primary key is "itemId", and this field value is "foo", then return "foo"
     */
    get currentId(): string;
    getTableRowsAsync: ({ dbName, tableName }: {
        dbName: any;
        tableName: any;
    }) => Promise<any>;
    getSingleRecordAsync: ({ dbName, tableName }: {
        dbName: any;
        tableName: any;
    }) => Promise<any>;
    fetchData: (dbName: any, tableName: any) => void;
    getInitialFormFields: (tableRows: any) => any;
    renderAlert: () => any;
    renderDetail: () => import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
