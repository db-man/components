import React from 'react';
export default class Form extends React.Component {
    constructor(props: any);
    componentDidMount(): void;
    handleChange: (key: any) => (value: any) => void;
    handleInputChange: (key: any) => (val: any) => void;
    /**
     * @param {string} id Column name
     * @param {string[]} value Cell value
     */
    handleStringArrayChange: (id: any) => (value: any) => void;
    handleJsonEditorChange: (formValues: any) => void;
    handleKeyDown: (event: any) => void;
    handleFormSubmit: () => void;
    handleDelete: () => void;
    get isSplitTable(): boolean;
    warnPrimaryKeyInvalid: (value: any) => import("antd/es/message/interface").MessageType;
    renderStringFormField: (column: any) => import("react/jsx-runtime").JSX.Element;
    renderStringArrayFormField: (column: any) => import("react/jsx-runtime").JSX.Element | null;
    renderNumberFormField: (column: any) => import("react/jsx-runtime").JSX.Element;
    renderBoolFormField: (column: any) => import("react/jsx-runtime").JSX.Element;
    fieldRender: (column: any) => import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
