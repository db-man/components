import React from 'react';
export default class UpdatePage extends React.Component {
    constructor(props: any);
    componentDidMount(): void;
    /**
     * `updateTableFileAsync`
     *   to update the whole table file, it's too big, and take more time to get the response from server
     * `updateRecordFileAsync`
     *   to only update record file, file is small, so get response quickly,
     *   but backend (github action) need to merge several record files into big table file after this update
     */
    handleFormSubmit: (formValues: any) => void;
    handleDelete: (formValues: any) => void;
    /**
     * If primary key is "itemId", and this field value is "foo", then return "foo"
     */
    get currentId(): string;
    get isSplitTable(): boolean;
    get record(): any;
    get tips(): any[];
    updateTableFileAsync: (formValues: any) => Promise<void>;
    updateRecordFileAsync: (formValues: any) => Promise<void>;
    deleteRecordFileAsync: (formValues: any) => Promise<void>;
    getData: () => void;
    getTableFileAsync: () => Promise<void>;
    getRecordFileAsync: () => Promise<void>;
    renderAlert: () => import("react/jsx-runtime").JSX.Element | null;
    renderForm: () => import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
