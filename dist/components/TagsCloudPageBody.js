function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// @ts-nocheck

/* eslint-disable react/destructuring-assignment, no-console, max-len */

import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import PageContext from '../contexts/page';
export default class TagsCloudPageBody extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "getDataAsync", async () => {
      try {
        this.setState({
          loading: true
        });
        const {
          content
        } = await this.context.githubDb.getTableRows(this.context.dbName, this.context.tableName);
        this.setState({
          loading: false,
          content
        });
      } catch (error) {
        this.setState({
          loading: false
        });
        console.error('Failed to get JSON file in TagsCloudPageBody component, error:', error);
      }
    });
    _defineProperty(this, "renderList", () => {
      const {
        content
      } = this.state;
      if (!content) return null;

      // tag name <=> tag count
      const tagNameCount = {};
      content.forEach(item => {
        if (!item.tags) return;
        item.tags.forEach(name => {
          if (!tagNameCount[name]) {
            tagNameCount[name] = 0;
          }
          tagNameCount[name] += 1;
        });
      });
      const dataSource = Object.keys(tagNameCount).map(name => ({
        name,
        count: tagNameCount[name]
      })).sort((a, b) => b.count - a.count);
      return /*#__PURE__*/React.createElement(List, {
        loading: this.state.loading,
        grid: {
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 8,
          xxl: 3
        },
        dataSource: dataSource,
        renderItem: item => {
          const filter = encodeURIComponent(JSON.stringify({
            tags: item.name
          }));
          return /*#__PURE__*/React.createElement(List.Item, null, /*#__PURE__*/React.createElement("div", {
            className: "tags-cloud-item"
          }, /*#__PURE__*/React.createElement(Link, {
            to: {
              pathname: `/${this.context.dbName}/${this.context.tableName}/list`,
              search: `?filter=${filter}`
            }
          }, item.name), ' ', ":", ' ', item.count));
        }
      });
    });
    this.state = {
      loading: false,
      content: []
    };
  }
  componentDidMount() {
    this.getDataAsync();
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "tags-cloud-page-body-component"
    }, this.renderList());
  }
}
TagsCloudPageBody.contextType = PageContext;
//# sourceMappingURL=TagsCloudPageBody.js.map