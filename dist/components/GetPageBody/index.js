function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// @ts-nocheck

/* eslint-disable react/destructuring-assignment, no-console, max-len */

import React from 'react';
import { message, Alert, Spin } from 'antd';
import * as utils from '../../utils';
import PageContext from '../../contexts/page';
import Detail from './Detail';
export default class GetPageBody extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "getTableRowsAsync", async ({
      dbName,
      tableName
    }) => {
      return this.context.githubDb.getTableRows(dbName, tableName).then(({
        content
      }) => {
        return content;
      }).then(tableRows => {
        this.setState({
          contentLoaded: true,
          record: this.getInitialFormFields(tableRows)
        });
      }).catch(err => {
        console.error('getTableRows failed, err:', err);
        message.error('something wrong in getTableRows');
      });
    });
    _defineProperty(this, "getSingleRecordAsync", async ({
      dbName,
      tableName
    }) => {
      return this.context.githubDb.getRecordFileContentAndSha(dbName, tableName, this.currentId).then(({
        content
      }) => {
        this.setState({
          contentLoaded: true,
          record: content
        });
      }).catch(err => {
        console.error('githubDb.getRecordFileContentAndSha failed, err:', err);
        message.error('something wrong in githubDb.getRecordFileContentAndSha');
      });
    });
    _defineProperty(this, "fetchData", (dbName, tableName) => {
      this.setState({
        contentLoading: true
      });
      const ps = [];
      if (this.isSplitTable) {
        ps.push(this.getSingleRecordAsync({
          dbName,
          tableName
        }));
      } else {
        ps.push(this.getTableRowsAsync({
          dbName,
          tableName
        }));
      }
      const getRefTablePromises = this.context.columns.filter(({
        referenceTable
      }) => referenceTable).map(({
        referenceTable
      }) => {
        return this.context.githubDb.getTableRows(dbName, referenceTable).then(({
          content
        }) => {
          const {
            refTables
          } = this.state;
          refTables[`ref:${referenceTable}:rows`] = content; // TODO
          this.setState({
            refTables
          });
        });
      });
      console.debug('Start getting all table data...');
      Promise.all([...ps, ...getRefTablePromises]).then(() => {
        console.debug('Finish getting all table data...');
      }).finally(() => {
        this.setState({
          contentLoading: false
        });
      });
    });
    // Create the initial form fields according to whether create/update.
    _defineProperty(this, "getInitialFormFields", tableRows => {
      const foundRows = tableRows.filter(item => item[this.context.primaryKey] === utils.getUrlParams()[this.context.primaryKey]);
      if (foundRows.length === 0) {
        this.setState({
          errorMessage: 'item not found in db'
        });
        return null;
      }
      if (foundRows.length > 1) {
        this.setState({
          errorMessage: 'more than 1 rows'
        });
        return null;
      }
      return {
        ...foundRows[0]
      };
    });
    _defineProperty(this, "renderAlert", () => this.state.errorMessage && /*#__PURE__*/React.createElement(Alert, {
      message: this.state.errorMessage,
      type: "error"
    }));
    _defineProperty(this, "renderDetail", () => {
      if (this.state.record === null) {
        return null;
      }
      return /*#__PURE__*/React.createElement(Detail, {
        defaultValues: this.state.record,
        tables: this.context.tables,
        refTables: this.state.refTables
      });
    });
    this.state = {
      contentLoading: false,
      contentLoaded: false,
      refTables: {},
      errorMessage: '',
      // One record in table rows
      record: {}
    };
  }
  componentDidMount() {
    const {
      dbName,
      tableName
    } = this.context;
    this.fetchData(dbName, tableName);
  }

  // componentDidUpdate(prevProps) {
  //   // When URL changed, dbName or tableName changed, then load data from backend
  //   if (
  //     this.context.dbName !== prevProps.dbName
  //     || this.context.tableName !== prevProps.tableName
  //   ) {
  //     this.fetchData(this.context.dbName, this.context.tableName);
  //   }
  // }

  get isSplitTable() {
    const {
      appModes
    } = this.context;
    return appModes.indexOf('split-table') !== -1;
  }

  /**
   * If primary key is "itemId", and this field value is "foo", then return "foo"
   */
  get currentId() {
    return utils.getUrlParams()[this.context.primaryKey];
  }
  render() {
    if (this.state.contentLoading) {
      return /*#__PURE__*/React.createElement(Spin, null);
    }
    if (!this.state.contentLoaded) {
      return null;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "get-body-component"
    }, this.renderAlert(), this.renderDetail());
  }
}
GetPageBody.contextType = PageContext;
//# sourceMappingURL=index.js.map