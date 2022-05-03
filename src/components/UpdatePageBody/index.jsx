/* eslint-disable react/destructuring-assignment, no-console, max-len, react/no-unused-class-component-methods */

import React from 'react';
import {
  message, Alert, Spin, Skeleton,
} from 'antd';
import { utils as dbManUtils } from 'db-man';
import { githubDb } from '@db-man/github';

import SuccessMessage from '../SuccessMessage';
import * as utils from '../../utils';
import Form from '../Form';
import PageContext from '../../contexts/page';

import { getNewRows } from './helpers';

export default class UpdatePageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',

      // all rows in table data file
      tableFileLoading: '',
      rows: null,
      tableFileSha: null,

      recordFileLoading: '',
      record: {},
      recordFileSha: null,

      saveLoading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  // `updateTableFileAsync` to update the whole table file, it's too big, and take more time to get the response from server
  // `updateRecordFileAsync` to only update record file, file is small, so get response quickly, but backend (github action) need to merge several record files into big table file after this update
  handleFormSubmit = (formValues) => {
    // this.updateTableFileAsync(formValues);
    this.updateRecordFileAsync(formValues);
  };

  /**
   * If primary key is "itemId", and this field value is "foo", then return "foo"
   */
  get currentId() {
    return utils.getUrlParams()[this.context.primaryKey];
  }

  get tips() {
    const { tableFileLoading, recordFileLoading } = this.state;
    const tips = [];
    if (tableFileLoading) tips.push(tableFileLoading);
    if (recordFileLoading) tips.push(recordFileLoading);
    return tips;
  }

  updateTableFileAsync = async (formValues) => {
    const { dbName, tableName, primaryKey } = this.context;
    const { rows, tableFileSha } = this.state;

    const newRows = getNewRows(
      formValues,
      [...rows],
      primaryKey,
      this.currentId,
    );

    this.setState({ saveLoading: true });
    try {
      const { commit } = await githubDb.updateTableFile(
        dbName,
        tableName,
        newRows,
        tableFileSha,
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

  updateRecordFileAsync = async (formValues) => {
    const { dbName, tableName, primaryKey } = this.context;
    const { recordFileSha } = this.state;

    this.setState({ saveLoading: true });
    try {
      const record = {
        ...formValues,
        updatedAt: dbManUtils.formatDate(new Date()),
      };
      const { commit } = await githubDb.updateRecordFile(
        dbName,
        tableName,
        primaryKey,
        record,
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

  // Get both single record file and whole table file, the whole table file will be used to de-dup
  getData = () => {
    Promise.all([this.getTableFileAsync(), this.getRecordFileAsync()]);
  };

  getTableFileAsync = async () => {
    const { dbName, tableName } = this.context;
    this.setState({ tableFileLoading: `Loading ${dbName}/${tableName} ...` });
    try {
      const { content: rows, sha: tableFileSha } = await githubDb.getTableRows(
        dbName,
        tableName,
      );
      this.setState({
        rows,
        tableFileSha,
      });
    } catch (err) {
      console.error('getTableRows, error:', err);
      this.setState({ errorMessage: 'Failed to get table file from server!' });
    }
    this.setState({ tableFileLoading: '' });
  };

  getRecordFileAsync = async () => {
    const { dbName, tableName } = this.context;
    this.setState({ recordFileLoading: `Loading ${dbName}/${tableName}/${this.currentId}` });
    try {
      const { content, sha } = await githubDb.getRecordFileContentAndSha(
        dbName,
        tableName,
        this.currentId,
      );
      this.setState({
        recordFileSha: sha,
        record: content,
      });
    } catch (err) {
      console.error('getRecordFileContentAndSha, error:', err);
      this.setState({ errorMessage: 'Failed to get file from server!' });
    }
    this.setState({ recordFileLoading: '' });
  };

  renderAlert = () => this.state.errorMessage && (
  <Alert message={this.state.errorMessage} type="error" />
  );

  renderForm = () => {
    if (this.tips.length) {
      return <Spin tip={this.tips.join(',')} />;
    }
    if (!this.state.record[this.context.primaryKey]) {
      return null;
    }
    return (
      <Form
        defaultValues={this.state.record}
        rows={this.state.rows}
        saveLoading={this.state.saveLoading}
        onSubmit={this.handleFormSubmit}
      />
    );
  };

  render() {
    return (
      <div className="update-page-body-component">
        <Skeleton loading={this.tips.length > 0}>
          {this.renderAlert()}
          {this.renderForm()}
        </Skeleton>
      </div>
    );
  }
}

UpdatePageBody.contextType = PageContext;
