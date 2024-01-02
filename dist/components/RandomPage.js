/* eslint-disable react/destructuring-assignment, no-console, max-len */

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Card } from 'antd';

// import { contexts as PageContext, ddRender } from '@db-man/components';
import PageContext from '../contexts/page';
import * as ddRender from '../ddRender/ddRender';
const listGrid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 4,
  xxl: 3
};
const getAny = arr => arr[Math.floor(Math.random() * arr.length)];
const getRandomItems = rows => {
  const randomItems = [];
  for (let i = 0; i < 8; i += 1) {
    randomItems.push(getAny(rows));
  }
  return randomItems;
};
export default function RandomPage() {
  const {
    githubDb,
    dbName,
    tableName,
    primaryKey,
    columns
  } = useContext(PageContext);
  const [content, setContent] = useState(null);
  useEffect(() => {
    getDataAsync();
  }, []);
  const getDataAsync = async () => {
    try {
      const contentAndSha = await githubDb.getTableRows(dbName, tableName);
      setContent(contentAndSha.content);
    } catch (error) {
      console.error('Failed to get JSON file in RandomPage component, error:', error);
    }
  };
  const renderItem = item => {
    const column = columns.find(col => col.id === primaryKey);
    if (!column) return /*#__PURE__*/React.createElement("div", null, "No primary column found");
    // TODO move `type:randomPage` out of the primary column, it should be in the table level.
    const args = column['type:randomPage'] || '';
    const fn = ddRender.getRender(args) || (val => val);
    return /*#__PURE__*/React.createElement(List.Item, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", null, fn(item[primaryKey], item, 0)), /*#__PURE__*/React.createElement(Link, {
      to: {
        pathname: `/${dbName}/${tableName}/update`,
        search: `?${primaryKey}=${item[primaryKey]}`
      }
    }, "Update")));
  };
  const renderList = () => {
    if (!content) return null;
    return /*#__PURE__*/React.createElement(List, {
      grid: listGrid,
      dataSource: getRandomItems(content),
      renderItem: renderItem
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "random-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "random-page-body-component"
  }, renderList()));
}
//# sourceMappingURL=RandomPage.js.map