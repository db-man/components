//- @ts-nocheck

import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Input, Row, Col, Spin, Popover, Alert, message } from 'antd';
import { RightSquareFilled } from '@ant-design/icons';
// @ts-ignore TODO: fix types for lodash
import debounce from 'lodash.debounce';
import PageContext from '../../contexts/page';
import { getColumnRender } from '../../ddRender/ddRender';
import { findDuplicates, getFilteredData, getSortedData, getInitialFilter, updateUrl, getColumnSortOrder, getInitialSorter } from './helpers';
import RefTableLinks from '../RefTableLinks';
import * as constants from '../../constants';
const defaultPage = 1;
const defaultPageSize = 10;
const debouncedUpdateUrl = debounce(updateUrl, 500);
const filterCols = columns => {
  return columns.filter(col => col.filter);
};
const ListPage = props => {
  const {
    columns,
    tableName,
    primaryKey,
    dbName,
    githubDb
  } = useContext(PageContext);
  const [filter, setFilter] = useState({}); // getInitialFilter(filterCols()), cannot get context in constructor
  const [sorter, setSorter] = useState({
    columnKey: '',
    // e.g. "url"
    order: '' //  "ascend" or "descend" or undefined
  });

  const [loading, setLoading] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [rows, setRows] = useState(null);
  const [contentTableName, setContentTableName] = useState(''); // the current table name of data this.state.rows
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.href);
    return Number(url.searchParams.get('page')) || defaultPage;
  });
  const [pageSize, setPageSize] = useState(() => {
    const url = new URL(window.location.href);
    return Number(url.searchParams.get('pageSize')) || defaultPageSize;
  });
  const controllerRef = useRef(new AbortController());
  useEffect(() => {
    getData(tableName);
    setFilter(getInitialFilter(filterCols(columns)));
    setSorter(getInitialSorter());
    return () => {
      // When your component unmounts

      // Cancel all HTTP requests in this page
      controllerRef.current.abort();
    };
  }, []);
  const filteredSortedData = () => {
    const filteredData = getFilteredData(filterCols(columns), filter, rows);
    if (sorter.columnKey && sorter.order !== undefined) {
      return getSortedData(filteredData, sorter);
    }
    return filteredData;
  };
  const handleKeyDown = e => {
    if (e.key === 'ArrowRight') {
      setPage(prevPage => {
        if (prevPage < filteredSortedData().length / pageSize) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          debouncedUpdateUrl({
            page: prevPage + 1
          });
          return prevPage + 1;
        } else {
          message.info('This is the last page!');
          return prevPage;
        }
      });
    } else if (e.key === 'ArrowLeft') {
      setPage(prevPage => {
        if (prevPage > 1) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          debouncedUpdateUrl({
            page: prevPage - 1
          });
          return prevPage - 1;
        } else {
          message.info('This is the first page!');
          return prevPage;
        }
      });
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, false);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [rows]);
  useEffect(() => {
    getData(props.tableName);
  }, [props.tableName]);
  const handleFilterChange = key => event => {
    setFilter(prevFilter => {
      const newFilter = {
        ...prevFilter,
        [key]: event.target.value
      };
      debouncedUpdateUrl({
        filter: newFilter
      });
      return newFilter;
    });
  };
  const handleTableChange = (pagination, filters, newSorter /* , extra */) => {
    setPage(pagination.current || defaultPage);
    setPageSize(pagination.pageSize || defaultPageSize);
    setSorter({
      // @ts-ignore TODO: fix types for antd
      columnKey: newSorter.columnKey,
      // @ts-ignore TODO: fix types for antd
      order: newSorter.order // order could be undefined
    });

    debouncedUpdateUrl({
      page: pagination.current,
      pageSize: pagination.pageSize,
      sorter: {
        // @ts-ignore TODO: fix types for antd
        columnKey: newSorter.columnKey,
        // @ts-ignore TODO: fix types for antd
        order: newSorter.order // order could be undefined
      }
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const getData = async tableName => {
    setLoading(`Loading ${dbName}/${tableName} ...`);
    try {
      const {
        content
      } = await githubDb.getTableRows(dbName, tableName, controllerRef.current.signal);
      setRows(content);
      setContentTableName(tableName);
    } catch (error) {
      console.error('Failed to get JSON file in List component, error:', error); // eslint-disable-line no-console
      setErrMsg(`Failed to get data: ${error.message}`);
    }
    setLoading('');
  };
  const alertDuplicatedRowKey = () => {
    if (!rows) return null;
    const duplicatedRowKeys = findDuplicates(rows.map(item => item[primaryKey]));
    if (duplicatedRowKeys.length === 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'red'
      }
    }, "Duplicated row keys(", duplicatedRowKeys.length, "): ", duplicatedRowKeys.join(', '));
  };
  const alertTableDataInvalid = () => {
    const invalidRows = [];
    if (!rows) return null;
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
  };
  const alertValidations = () => /*#__PURE__*/React.createElement("div", {
    className: "dm-alert-validations"
  }, alertDuplicatedRowKey(), alertTableDataInvalid());
  const getTableColumns = () => {
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
        antdCol.render = (...args) => /*#__PURE__*/React.createElement("div", null, lastRender(...args), ' ', hasVal(args[0]) && /*#__PURE__*/React.createElement(Popover, {
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
  };
  const renderTable = () => {
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
    return /*#__PURE__*/React.createElement("div", null, alertValidations(), /*#__PURE__*/React.createElement(Table, {
      size: "small",
      showSorterTooltip: false,
      rowKey: primaryKey,
      columns: getTableColumns(),
      dataSource: filteredSortedData(),
      pagination: {
        current: page,
        pageSize,
        // total: filteredSortedData().length,
        showQuickJumper: true,
        showTotal: total => `Total ${total} items`
      },
      onChange: handleTableChange
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "dm-list-page list-component"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-filter"
  }, /*#__PURE__*/React.createElement(Row, {
    gutter: 10
  }, filterCols(columns).map(f => /*#__PURE__*/React.createElement(Col, {
    key: f.id,
    span: 6
  }, f.name, ":", /*#__PURE__*/React.createElement(Input, {
    size: "small",
    value: filter[f.id],
    onChange: handleFilterChange(f.id)
  }))))), renderTable());
};
export default ListPage;
ListPage.propTypes = {
  // Even tableName is now passing from context,
  // but we need to pass props.tableName to get new data from backend API
  tableName: PropTypes.string.isRequired
};
//# sourceMappingURL=index.js.map