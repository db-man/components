import React from 'react';
export default class ListPage extends React.Component {
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    handleKeyDown: (e: any) => void;
    handleFilterChange: (key: any) => (event: any) => void;
    handleTableChange: (pagination: any, filters: any, sorter: any) => void;
    get filteredSortedData(): any;
    get filterCols(): any;
    getData: (tableName: any) => Promise<void>;
    updateState: (states: any) => void;
    alertDuplicatedRowKey: () => import("react/jsx-runtime").JSX.Element | null;
    alertTableDataInvalid: () => import("react/jsx-runtime").JSX.Element | null;
    alertValidations: () => import("react/jsx-runtime").JSX.Element;
    getTableColumns: () => any;
    renderTable: () => import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
//# sourceMappingURL=index.d.ts.map