/* eslint-disable react/destructuring-assignment, no-console, max-len, react/no-unused-class-component-methods */

import React from 'react';
import {
  message, Spin, Skeleton, Alert,
} from 'antd';
import { githubDb } from '@db-man/github';
import { utils as dbManUtils } from 'db-man';

import { validatePrimaryKey } from './Form/helpers';
import SuccessMessage from './SuccessMessage';
import * as utils from '../utils';
import Form from './Form';
import PageContext from '../contexts/page';
import * as constants from '../constants';

export default class CreatePageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      // all rows in table file
      tableFileLoading: false,
      rows: null,
      tableFileSha: null,

      defaultFormValues: {},

      saveLoading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  // `updateTableFileAsync` to update the whole table file, it's too big, and take more time to get the response from server
  // `createRecordFileAsync` to only create record file, file is small, so get response quickly, but backend (github action) need to merge records into big table file
  handleFormSubmit = (formValues) => {
    // this.updateTableFileAsync(formValues);
    this.createRecordFileAsync(formValues);
  };

  get loading() {
    return this.state.tableFileLoading || this.state.recordFileLoading;
  }

  updateTableFileAsync = async (formValues) => {
    let newContent = [...this.state.rows];

    if (!this.formValidation(this.state.rows, formValues)) {
      return;
    }

    newContent = this.getNewContent(formValues, newContent);

    this.setState({ saveLoading: true });
    try {
      const { commit } = await githubDb.updateTableFile(
        this.context.dbName,
        this.context.tableName,
        newContent,
        this.state.tableFileSha,
      );

      message.success(<SuccessMessage url={commit.html_url} />, 10);
    } catch (err) {
      console.error('updateTableFile, err:', err);
      this.setState({
        errorMessage: 'Failed to update table file on server!',
      });
    }

    this.setState({ saveLoading: false });
  };

  createRecordFileAsync = async (formValues) => {
    const { dbName, tableName, primaryKey } = this.context;
    const { recordFileSha } = this.state;

    this.setState({ saveLoading: true });
    try {
      const { commit } = await githubDb.updateRecordFile(
        dbName,
        tableName,
        primaryKey,
        formValues,
        recordFileSha,
      );

      message.success(<SuccessMessage url={commit.html_url} />, 10);
    } catch (err) {
      console.error('updateRecordFile, err:', err);
      this.setState({
        errorMessage: 'Failed to update record file on server!',
      });
    }

    this.setState({ saveLoading: false });
  };

  // Get single record file, the whole table file will be used to de-dup
  getData = () => {
    Promise.all([this.getTableFileAsync()]);
  };

  getTableFileAsync = async () => {
    this.setState({ tableFileLoading: true });
    try {
      const { content: rows, sha: tableFileSha } = await githubDb.getTableRows(
        this.context.dbName,
        this.context.tableName,
      );
      this.setState({
        rows,
        tableFileSha,
      });
      const fields = this.getInitialFormFields();
      this.setState({
        defaultFormValues: {
          ...this.state.defaultFormValues, // eslint-disable-line react/no-access-state-in-setstate
          ...fields,
        },
      });
    } catch (err) {
      console.error('getTableRows, error:', err);
      this.setState({ errorMessage: 'Failed to get table file from server!' });
    }
    this.setState({ tableFileLoading: false });
  };

  // Create the initial form fields
  getInitialFormFields = () => {
    const fields = {};

    // Fill the form field with URL params
    this.context.columns
      .filter((col) => utils.getUrlParams()[col.id])
      .forEach((col) => {
        if (col.type === constants.STRING_ARRAY) {
          fields[col.id] = [utils.getUrlParams()[col.id]];
        } else {
          fields[col.id] = utils.getUrlParams()[col.id];
        }
      });

    return fields;
  };

  // eslint-disable-next-line class-methods-use-this
  getNewContent = (formValues, newContent) => {
    newContent.push({
      ...formValues,
      createdAt: dbManUtils.formatDate(new Date()),
      updatedAt: dbManUtils.formatDate(new Date()),
    });

    return newContent; // eslint-disable-line consistent-return
  };

  formValidation = (rows, formValues) => {
    if (
      !validatePrimaryKey(
        formValues[this.context.primaryKey],
        rows,
        this.context.primaryKey,
      )
    ) {
      this.warnPrimaryKeyInvalid(formValues[this.context.primaryKey]);
      return false;
    }
    return true;
  };

  warnPrimaryKeyInvalid = (value) => message.warn(
    <div>
      Found duplicated item in db
      {' '}
      <a
        href={`/${this.context.dbName}/${this.context.tableName}/update?${this.context.primaryKey}=${value}`}
      >
        {value}
      </a>
    </div>,
    10,
  );

  renderAlert = () => this.state.errorMessage && (
    <Alert message={this.state.errorMessage} type="error" />
  );

  renderForm = () => {
    if (this.loading) {
      return (
        <Spin
          tip={`Loading file: ${this.context.dbName}/${this.context.tableName}`}
        />
      );
    }
    return (
      <Form
        defaultValues={this.state.defaultFormValues}
        rows={this.state.rows}
        saveLoading={this.state.saveLoading}
        onSubmit={this.handleFormSubmit}
      />
    );
  };

  render() {
    return (
      <div className="create-page-body-component">
        <Skeleton loading={this.loading}>
          {this.renderAlert()}
          {this.renderForm()}
        </Skeleton>
      </div>
    );
  }
}

CreatePageBody.contextType = PageContext;
