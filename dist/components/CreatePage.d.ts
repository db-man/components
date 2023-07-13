import React from 'react';
export default class CreatePage extends React.Component {
    constructor(props: any);
    componentDidMount(): void;
    handleFormSubmit: (formValues: any) => void;
    get loading(): any;
    get isSplitTable(): boolean;
    updateTableFileAsync: (formValues: any) => Promise<void>;
    createRecordFileAsync: (formValues: any) => Promise<void>;
    getData: () => void;
    getTableFileAsync: () => Promise<void>;
    getInitialFormFields: () => {};
    formValidation: (rows: any, formValues: any) => boolean;
    warnPrimaryKeyInvalid: (value: any) => import("antd/es/message/interface").MessageType;
    render(): import("react/jsx-runtime").JSX.Element | null;
}
//# sourceMappingURL=CreatePage.d.ts.map