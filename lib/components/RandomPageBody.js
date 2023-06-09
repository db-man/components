function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable react/destructuring-assignment, no-console, max-len */

import React from 'react';
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
export default class RandomPageBody extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "getDataAsync", async () => {
      try {
        const {
          content
        } = await this.context.githubDb.getTableRows(this.context.dbName, this.context.tableName);
        this.setState({
          content
        });
      } catch (error) {
        console.error('Failed to get JSON file in RandomPageBody component, error:', error);
      }
    });
    _defineProperty(this, "renderItem", item => {
      const {
        primaryKey
      } = this.context;
      const column = this.context.columns.find(col => col.id === primaryKey);
      const args = column['type:randomPage'];
      const fn = ddRender.getRender(args) || (val => val);
      return /*#__PURE__*/React.createElement(List.Item, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", null, fn(item[primaryKey], item, 0)), /*#__PURE__*/React.createElement(Link, {
        to: {
          pathname: `/${this.context.dbName}/${this.context.tableName}/update`,
          search: `?${primaryKey}=${item[primaryKey]}`
        }
      }, "Update")));
    });
    _defineProperty(this, "renderList", () => {
      const {
        content
      } = this.state;
      if (!content) return null;
      return /*#__PURE__*/React.createElement(List, {
        grid: listGrid,
        dataSource: getRandomItems(content),
        renderItem: this.renderItem
      });
    });
    this.state = {
      content: null
    };
  }
  componentDidMount() {
    this.getDataAsync();
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "random-page-body-component"
    }, this.renderList());
  }
}
RandomPageBody.contextType = PageContext;