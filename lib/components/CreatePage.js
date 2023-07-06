function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable react/destructuring-assignment, no-console, max-len, react/no-unused-class-component-methods */

import React from 'react';
import { message, Spin, Alert } from 'antd';
import { utils as githubUtils } from '@db-man/github';
import { validatePrimaryKey } from './Form/helpers';
import SuccessMessage from './SuccessMessage';
import * as utils from '../utils';
import Form from './Form';
import PageContext from '../contexts/page';
import * as constants from '../constants';
export default class CreatePage extends React.Component {
  constructor(props) {
    super(props);
    // `updateTableFileAsync` to update the whole table file, it's too big, and take more time to get the response from server
    // `createRecordFileAsync` to only create record file, file is small, so get response quickly, but backend (github action) need to merge records into big table file
    _defineProperty(this, "handleFormSubmit", formValues => {
      if (!this.isSplitTable) {
        this.updateTableFileAsync(formValues);
      } else {
        this.createRecordFileAsync(formValues);
      }
    });
    _defineProperty(this, "updateTableFileAsync", async formValues => {
      const newContent = [...this.state.rows];
      if (!this.formValidation(this.state.rows, formValues)) {
        return;
      }
      const time = githubUtils.formatDate(new Date());
      newContent.push({
        ...formValues,
        createdAt: time,
        updatedAt: time
      });
      this.setState({
        saveLoading: true
      });
      try {
        const {
          commit
        } = await this.context.githubDb.updateTableFile(this.context.dbName, this.context.tableName, newContent, this.state.tableFileSha);
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
        saveLoading: false
      });
    });
    _defineProperty(this, "createRecordFileAsync", async formValues => {
      const {
        dbName,
        tableName,
        primaryKey
      } = this.context;
      const {
        recordFileSha
      } = this.state;
      const time = githubUtils.formatDate(new Date());
      const record = {
        ...formValues,
        createdAt: time,
        updatedAt: time
      };
      this.setState({
        saveLoading: true
      });
      try {
        const {
          commit
        } = await this.context.githubDb.updateRecordFile(dbName, tableName, primaryKey, record, recordFileSha);
        message.success( /*#__PURE__*/React.createElement(SuccessMessage, {
          url: commit.html_url
        }), 10);
      } catch (err) {
        console.error('updateRecordFile, err:', err);
        this.setState({
          errorMessage: 'Failed to create record file on server!'
        });
      }
      this.setState({
        saveLoading: false
      });
    });
    // Get single record file, the whole table file will be used to de-dup
    _defineProperty(this, "getData", () => {
      const ps = [];
      // Whole table file is too big, so only get it when it's not split table
      if (!this.isSplitTable) {
        ps.push(this.getTableFileAsync());
      }
      Promise.all(ps);
    });
    _defineProperty(this, "getTableFileAsync", async () => {
      this.setState({
        tableFileLoading: true
      });
      try {
        const {
          content: rows,
          sha: tableFileSha
        } = await this.context.githubDb.getTableRows(this.context.dbName, this.context.tableName);
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
        tableFileLoading: false
      });
    });
    // Create the initial form fields
    _defineProperty(this, "getInitialFormFields", () => {
      const fields = {};

      // Fill the form field with URL params
      this.context.columns.filter(col => utils.getUrlParams()[col.id]).forEach(col => {
        if (col.type === constants.STRING_ARRAY) {
          fields[col.id] = [utils.getUrlParams()[col.id]];
        } else {
          fields[col.id] = utils.getUrlParams()[col.id];
        }
      });
      return fields;
    });
    _defineProperty(this, "formValidation", (rows, formValues) => {
      if (!validatePrimaryKey(formValues[this.context.primaryKey], rows, this.context.primaryKey)) {
        this.warnPrimaryKeyInvalid(formValues[this.context.primaryKey]);
        return false;
      }
      return true;
    });
    _defineProperty(this, "warnPrimaryKeyInvalid", value => message.warning( /*#__PURE__*/React.createElement("div", null, "Found duplicated item in db", ' ', /*#__PURE__*/React.createElement("a", {
      href: `/${this.context.dbName}/${this.context.tableName}/update?${this.context.primaryKey}=${value}`
    }, value)), 10));
    this.state = {
      errorMessage: '',
      // all rows in table file
      tableFileLoading: false,
      // all rows in whole table, in split table mode, it's empty
      rows: [],
      tableFileSha: null,
      defaultFormValues: null,
      saveLoading: false
    };
  }
  componentDidMount() {
    this.getData();
    const fields = this.getInitialFormFields();
    this.setState({
      defaultFormValues: {
        ...fields
      }
    });
  }
  get loading() {
    return this.state.tableFileLoading;
  }
  get isSplitTable() {
    const {
      appModes
    } = this.context;
    return appModes.indexOf('split-table') !== -1;
  }
  render() {
    const {
      dbName,
      tableName
    } = this.context;
    if (this.state.defaultFormValues === null) {
      return null;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "dm-page"
    }, /*#__PURE__*/React.createElement("h1", null, "Create ", dbName, " ", tableName), /*#__PURE__*/React.createElement("div", {
      className: "create-page-body-component"
    }, /*#__PURE__*/React.createElement(Spin, {
      spinning: this.loading,
      tip: /*#__PURE__*/React.createElement("div", null, "Loading file:", ' ', /*#__PURE__*/React.createElement("a", {
        href: this.context.githubDb.getDataUrl(dbName, tableName),
        target: "_blank",
        rel: "noreferrer"
      }, dbName, "/", tableName))
    }, this.state.errorMessage && /*#__PURE__*/React.createElement(Alert, {
      message: this.state.errorMessage,
      type: "error"
    }), /*#__PURE__*/React.createElement(Form, {
      defaultValues: this.state.defaultFormValues,
      rows: this.state.rows,
      loading: this.state.saveLoading,
      onSubmit: this.handleFormSubmit
    }))));
  }
}
CreatePage.contextType = PageContext;