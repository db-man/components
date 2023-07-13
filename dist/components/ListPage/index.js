function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Input, Row, Col, Spin, Popover, Alert } from 'antd';
import { RightSquareFilled } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import PageContext from '../../contexts/page';
import { getColumnRender } from '../../ddRender/ddRender';
import { findDuplicates, getFilteredData, getSortedData, getInitialFilter, updateUrl, getColumnSortOrder, getInitialSorter } from './helpers';
import RefTableLinks from '../RefTableLinks';
import * as constants from '../../constants';
const defaultPage = 1;
const defaultPageSize = 10;
const debouncedUpdateUrl = debounce(updateUrl, 500);
export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleKeyDown", e => {
      const currentPage = this.state.page;
      if (e.key === 'ArrowRight' && currentPage < this.filteredSortedData.length / this.state.pageSize) {
        this.updateState({
          page: this.state.page + 1
        });
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        this.updateState({
          page: this.state.page - 1
        });
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    _defineProperty(this, "handleFilterChange", key => event => {
      const {
        filter
      } = this.state;
      this.updateState({
        filter: {
          ...filter,
          [key]: event.target.value
        }
      });
    });
    _defineProperty(this, "handleTableChange", (pagination, filters, sorter /* , extra */) => {
      const {
        current,
        pageSize
      } = pagination;
      this.updateState({
        page: current,
        pageSize,
        sorter: {
          columnKey: sorter.columnKey,
          order: sorter.order // order could be undefined
        }
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    _defineProperty(this, "getData", async tableName => {
      const {
        dbName
      } = this.context;
      this.setState({
        loading: `Loading ${dbName}/${tableName} ...`
      });
      try {
        const {
          content
        } = await this.context.githubDb.getTableRows(dbName, tableName, this.controller.signal);
        this.setState({
          rows: content,
          contentTableName: tableName
        });
      } catch (error) {
        console.error('Failed to get JSON file in List component, error:', error); // eslint-disable-line no-console
        this.setState({
          errMsg: `Failed to get data: ${error.message}`
        });
      }
      this.setState({
        loading: ''
      });
    });
    // Update React states and URL states
    _defineProperty(this, "updateState", states => {
      this.setState({
        ...states
      });
      debouncedUpdateUrl(states);
    });
    _defineProperty(this, "alertDuplicatedRowKey", () => {
      const {
        rows
      } = this.state;
      const {
        primaryKey
      } = this.context;
      const duplicatedRowKeys = findDuplicates(rows.map(item => item[primaryKey]));
      if (duplicatedRowKeys.length === 0) return null;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          color: 'red'
        }
      }, "Duplicated row keys(", duplicatedRowKeys.length, "): ", duplicatedRowKeys.join(', '));
    });
    _defineProperty(this, "alertTableDataInvalid", () => {
      const {
        rows
      } = this.state;
      const {
        primaryKey
      } = this.context;
      const invalidRows = [];
      rows.forEach((row, idx) => {
        if (row[primaryKey] === undefined || row[primaryKey] === null) {
          invalidRows.push({
            rowIdx: idx,
            rowData: row
          });
        }
      });
      if (invalidRows.length === 0) return null;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          color: 'red'
        }
      }, "Invalid rows(", invalidRows.length, "):", ' ', invalidRows.map(row => /*#__PURE__*/React.createElement("div", null, `idx:${row.rowIdx}`, " ", JSON.stringify(row.rowData))));
    });
    _defineProperty(this, "alertValidations", () => /*#__PURE__*/React.createElement("div", {
      className: "dm-alert-validations"
    }, this.alertDuplicatedRowKey(), this.alertTableDataInvalid()));
    _defineProperty(this, "getTableColumns", () => {
      const {
        sorter
      } = this.state;
      const {
        columns,
        primaryKey,
        dbName,
        tableName
      } = this.context;
      const cols = columns.filter(column => column['type:listPage'] !== 'HIDE').map(column => {
        // Table component of antd
        const antdCol = {
          key: column.id,
          title: column.name,
          dataIndex: column.id,
          // Order of sorted values: 'ascend', 'descend', false
          sortOrder: getColumnSortOrder(column.id, sorter),
          sorter: true,
          ...column.tableProps
        };
        const renderFn = getColumnRender('type:listPage', column);
        if (renderFn) {
          antdCol.render = renderFn;
        }
        if (column.referenceTable) {
          const lastRender = antdCol.render || (val => val);
          const hasVal = val => {
            if (column.type === constants.STRING_ARRAY) {
              if (!val || val.length === 0) return false;
              return true;
            }
            return !!val;
          };
          // If this column has ref table, then render links to ref table item
          antdCol.render = (...args /* value, record, index */) => /*#__PURE__*/React.createElement("div", null, lastRender(...args), ' ', hasVal(args[0]) && /*#__PURE__*/React.createElement(Popover, {
            title: "Ref Table Links",
            trigger: "click",
            content: /*#__PURE__*/React.createElement(RefTableLinks, {
              value: args[0],
              column: column
            })
          }, /*#__PURE__*/React.createElement(RightSquareFilled, null)));
        }
        return antdCol;
      });

      // common columns
      cols.push({
        key: 'createdAt',
        title: 'createdAt',
        dataIndex: 'createdAt',
        sortOrder: getColumnSortOrder('createdAt', sorter),
        sorter: true
      });
      cols.push({
        key: 'updatedAt',
        title: 'updatedAt',
        dataIndex: 'updatedAt',
        sortOrder: getColumnSortOrder('updatedAt', sorter),
        sorter: true
      });
      cols.push({
        key: 'actions',
        dataIndex: primaryKey,
        title: 'Actions',
        render: id => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Link, {
          to: {
            pathname: `/${dbName}/${tableName}/update`,
            search: `?${primaryKey}=${id}`
          }
        }, "Update"), ' ', "|", ' ', /*#__PURE__*/React.createElement(Link, {
          to: {
            pathname: `/${dbName}/${tableName}/get`,
            search: `?${primaryKey}=${id}`
          }
        }, "Detail"))
      });
      return cols;
    });
    _defineProperty(this, "renderTable", () => {
      const {
        loading,
        rows,
        contentTableName
      } = this.state;
      const {
        page,
        pageSize,
        errMsg
      } = this.state;
      const {
        tableName,
        primaryKey
      } = this.context;
      if (loading) return /*#__PURE__*/React.createElement(Spin, {
        tip: loading
      }, "Loading...");
      if (errMsg) return /*#__PURE__*/React.createElement(Alert, {
        message: errMsg,
        type: "error"
      });
      if (!rows) return null;
      // When router changed, before loading next table rows,
      // contentTableName is old table, but this.props.tableName is new table.
      if (contentTableName !== tableName) return null;
      return /*#__PURE__*/React.createElement("div", null, this.alertValidations(), /*#__PURE__*/React.createElement(Table, {
        size: "small",
        showSorterTooltip: false,
        rowKey: primaryKey,
        columns: this.getTableColumns(),
        dataSource: this.filteredSortedData,
        pagination: {
          current: page,
          pageSize,
          // total: this.filteredSortedData.length,
          showQuickJumper: true,
          showTotal: total => `Total ${total} items`
        },
        onChange: this.handleTableChange
      }));
    });
    const url = new URL(window.location);
    this.state = {
      filter: {},
      // getInitialFilter(this.filterCols), cannot get context in constructor
      sorter: {
        columnKey: '',
        // e.g. "url"
        order: '' //  "ascend" or "descend" or undefined
      },

      loading: '',
      errMsg: '',
      rows: null,
      contentTableName: '',
      // the current table name of data this.state.rows
      page: Number(url.searchParams.get('page')) || defaultPage,
      pageSize: Number(url.searchParams.get('pageSize')) || defaultPageSize
    };
    this.controller = new AbortController();
  }
  componentDidMount() {
    const {
      tableName
    } = this.context;
    this.getData(tableName);
    this.setState({
      filter: getInitialFilter(this.filterCols),
      sorter: getInitialSorter()
    });
    window.addEventListener('keydown', this.handleKeyDown, false);
  }
  componentDidUpdate(prevProps) {
    const {
      tableName
    } = this.props;
    if (tableName !== prevProps.tableName) {
      this.getData(tableName);
    }
  }
  componentWillUnmount() {
    // Cancel all HTTP requests in this page
    this.controller.abort();
    window.removeEventListener('keydown', this.handleKeyDown, false);
  }
  get filteredSortedData() {
    const {
      filter,
      sorter,
      rows
    } = this.state;
    const filteredData = getFilteredData(this.filterCols, filter, rows);
    if (sorter.columnKey && sorter.order !== undefined) {
      return getSortedData(filteredData, sorter);
    }
    return filteredData;
  }
  get filterCols() {
    const {
      columns
    } = this.context;
    return columns.filter(col => col.filter);
  }
  render() {
    const {
      filter
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "dm-list-page list-component"
    }, /*#__PURE__*/React.createElement("div", {
      className: "table-filter"
    }, /*#__PURE__*/React.createElement(Row, {
      gutter: 10
    }, this.filterCols.map(f => /*#__PURE__*/React.createElement(Col, {
      key: f.id,
      span: 6
    }, f.name, ":", /*#__PURE__*/React.createElement(Input, {
      size: "small",
      value: filter[f.id],
      onChange: this.handleFilterChange(f.id)
    }))))), this.renderTable());
  }
}
ListPage.propTypes = {
  // Even tableName is now passing from context,
  // but we need to pass props.tableName to get new data from backend API
  tableName: PropTypes.string.isRequired
};
ListPage.contextType = PageContext;
//# sourceMappingURL=index.js.map