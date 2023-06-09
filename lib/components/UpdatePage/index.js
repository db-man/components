function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable react/destructuring-assignment, no-console, max-len, react/no-unused-class-component-methods */

import React from 'react';
import { message, Alert, Spin, Skeleton } from 'antd';
import { utils as githubUtils } from '@db-man/github';
import SuccessMessage from '../SuccessMessage';
import * as utils from '../../utils';
import Form from '../Form';
import PageContext from '../../contexts/page';
import { getNewRows } from './helpers';
export default class UpdatePage extends React.Component {
  constructor(props) {
    super(props);
    /**
     * `updateTableFileAsync`
     *   to update the whole table file, it's too big, and take more time to get the response from server
     * `updateRecordFileAsync`
     *   to only update record file, file is small, so get response quickly,
     *   but backend (github action) need to merge several record files into big table file after this update
     */
    _defineProperty(this, "handleFormSubmit", formValues => {
      if (this.isSplitTable) {
        this.updateRecordFileAsync(formValues);
      } else {
        this.updateTableFileAsync(formValues);
      }
    });
    _defineProperty(this, "handleDelete", formValues => {
      if (this.isSplitTable) {
        this.deleteRecordFileAsync(formValues);
      } else {
        message.info('Only supported in split-table mode!');
      }
    });
    _defineProperty(this, "updateTableFileAsync", async formValues => {
      const {
        dbName,
        tableName,
        primaryKey
      } = this.context;
      const {
        rows,
        tableFileSha
      } = this.state;
      const newRows = getNewRows(formValues, [...rows], primaryKey, this.currentId);
      this.setState({
        loading: 'Updating table file...'
      });
      try {
        const {
          commit
        } = await this.context.githubDb.updateTableFile(dbName, tableName, newRows, tableFileSha);
        message.success( /*#__PURE__*/React.createElement(SuccessMessage, {
          url: commit.html_url
        }), 10);
      } catch (err) {
        console.error('updateTableFile, err:', err);
        this.setState({
          errorMessage: 'Failed to update table file on server!'
        });
      }
      this.setState({
        loading: ''
      });
    });
    _defineProperty(this, "updateRecordFileAsync", async formValues => {
      const {
        dbName,
        tableName,
        primaryKey
      } = this.context;
      const {
        recordFileSha
      } = this.state;
      this.setState({
        loading: 'Updating record file...'
      });
      try {
        const record = {
          ...formValues,
          updatedAt: githubUtils.formatDate(new Date())
        };
        const {
          commit
        } = await this.context.githubDb.updateRecordFile(dbName, tableName, primaryKey, record, recordFileSha);
        message.success( /*#__PURE__*/React.createElement(SuccessMessage, {
          url: commit.html_url
        }), 10);
      } catch (err) {
        console.error('updateRecordFile, err:', err);
        this.setState({
          errorMessage: 'Failed to update record file on server!'
        });
      }
      this.setState({
        loading: ''
      });
    });
    _defineProperty(this, "deleteRecordFileAsync", async formValues => {
      const {
        dbName,
        tableName,
        primaryKey
      } = this.context;
      const {
        recordFileSha
      } = this.state;
      this.setState({
        loading: 'Deleting record file...'
      });
      try {
        const {
          commit
        } = await this.context.githubDb.deleteRecordFile(dbName, tableName, formValues[primaryKey], recordFileSha);
        message.success( /*#__PURE__*/React.createElement(SuccessMessage, {
          url: commit.html_url
        }), 10);
      } catch (err) {
        console.error('deleteRecordFile, err:', err);
        this.setState({
          errorMessage: 'Failed to delete record file on server!'
        });
      }
      this.setState({
        loading: ''
      });
    });
    // Get single record file or whole table file
    _defineProperty(this, "getData", () => {
      const ps = [];
      if (this.isSplitTable) {
        // When in split-table mode, whole table file is too big to download and cost a lot of time to download
        ps.push(this.getRecordFileAsync());
      } else {
        ps.push(this.getTableFileAsync());
      }
      Promise.all(ps);
    });
    _defineProperty(this, "getTableFileAsync", async () => {
      const {
        dbName,
        tableName
      } = this.context;
      this.setState({
        tableFileLoading: `Loading ${dbName}/${tableName} ...`
      });
      try {
        const {
          content: rows,
          sha: tableFileSha
        } = await this.context.githubDb.getTableRows(dbName, tableName);
        this.setState({
          rows,
          tableFileSha
        });
      } catch (err) {
        console.error('getTableRows, error:', err);
        this.setState({
          errorMessage: 'Failed to get table file from server!'
        });
      }
      this.setState({
        tableFileLoading: ''
      });
    });
    _defineProperty(this, "getRecordFileAsync", async () => {
      const {
        dbName,
        tableName
      } = this.context;
      this.setState({
        recordFileLoading: `Loading ${dbName}/${tableName}/${this.currentId}`
      });
      try {
        const {
          content,
          sha
        } = await this.context.githubDb.getRecordFileContentAndSha(dbName, tableName, this.currentId);
        this.setState({
          recordFileSha: sha,
          record: content
        });
      } catch (err) {
        console.error('getRecordFileContentAndSha, error:', err);
        this.setState({
          errorMessage: 'Failed to get file from server!'
        });
      }
      this.setState({
        recordFileLoading: ''
      });
    });
    _defineProperty(this, "renderAlert", () => {
      if (!this.state.errorMessage) {
        return null;
      }
      return /*#__PURE__*/React.createElement(Alert, {
        message: this.state.errorMessage,
        type: "error"
      });
    });
    _defineProperty(this, "renderForm", () => {
      if (this.tips.length) {
        return /*#__PURE__*/React.createElement(Spin, {
          tip: this.tips.join(',')
        }, "Loading...");
      }
      if (!this.record[this.context.primaryKey]) {
        return null;
      }
      return /*#__PURE__*/React.createElement(Form, {
        defaultValues: this.record,
        rows: this.state.rows,
        loading: !!this.state.loading,
        onSubmit: this.handleFormSubmit,
        onDelete: this.handleDelete
      });
    });
    this.state = {
      errorMessage: '',
      // all rows in table data file
      tableFileLoading: '',
      rows: [],
      tableFileSha: null,
      recordFileLoading: '',
      record: {},
      recordFileSha: null,
      loading: ''
    };
  }
  componentDidMount() {
    this.getData();
  }
  /**
   * If primary key is "itemId", and this field value is "foo", then return "foo"
   */
  get currentId() {
    return utils.getUrlParams()[this.context.primaryKey];
  }
  get isSplitTable() {
    const {
      appModes
    } = this.context;
    return appModes.indexOf('split-table') !== -1;
  }
  get record() {
    if (this.isSplitTable) {
      return this.state.record;
    }
    return this.state.rows.find(row => row[this.context.primaryKey] === this.currentId) || {};
  }
  get tips() {
    const {
      tableFileLoading,
      recordFileLoading
    } = this.state;
    const tips = [];
    if (tableFileLoading) tips.push(tableFileLoading);
    if (recordFileLoading) tips.push(recordFileLoading);
    return tips;
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "dm-page update-page-body-component"
    }, /*#__PURE__*/React.createElement(Skeleton, {
      loading: this.tips.length > 0
    }, this.renderAlert(), this.renderForm()));
  }
}
UpdatePage.contextType = PageContext;