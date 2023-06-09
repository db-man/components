function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { Link } from 'react-router-dom';
import { utils } from '@db-man/github';
import * as constants from '../constants';
import { getUrlParams } from '../utils';
import PageContext from '../contexts/page';

/**
 * This component depends on page context, so only used in Application/Page
 * TODO `id` in URL is used in this component, so not all pages could use this component
 */
export default class NavBar extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "renderReferenceTableLink", () => {
      const {
        columns,
        dbName
      } = this.context;
      return columns.filter(column => column.referenceTable).map(column => [`${column.referenceTable}(`, /*#__PURE__*/React.createElement("a", {
        key: "create-link",
        href: `/${dbName}/${column.referenceTable}/create`
      }, "Create"), ',', /*#__PURE__*/React.createElement("a", {
        key: "list-link",
        href: `/${dbName}/${column.referenceTable}/list`
      }, "List"), ') | ']);
    });
  }
  render() {
    const {
      dbName,
      tableName,
      action,
      primaryKey
    } = this.context;
    const id = getUrlParams()[primaryKey];
    const filter = encodeURIComponent(JSON.stringify({
      [primaryKey]: id
    }));

    // Only when appModes have "split-table"
    const aaa = id ? /*#__PURE__*/React.createElement("a", {
      title: "GitHub File Path",
      href: this.context.githubDb.getGitHubFullPath(`${localStorage.getItem(constants.LS_KEY_GITHUB_REPO_PATH)}/${dbName}/${tableName}/${utils.validFilename(id)}.json`),
      target: "_blank",
      rel: "noreferrer"
    }, "GitHub Path") : null;
    const createLink = /*#__PURE__*/React.createElement(Link, {
      to: {
        pathname: `/${dbName}/${tableName}/create`
      }
    }, "Create");
    const updateOrGetLink = /*#__PURE__*/React.createElement(Link, {
      to: {
        pathname: `/${dbName}/${tableName}/${action === 'get' ? 'update' : 'get'}`,
        search: `?${primaryKey}=${id}`
      }
    }, action === 'get' ? 'Update' : 'Get');
    const listLink = /*#__PURE__*/React.createElement(Link, {
      to: {
        pathname: `/${dbName}/${tableName}/list`,
        search: `?filter=${filter}`
      }
    }, "List");
    return /*#__PURE__*/React.createElement("div", {
      className: "dm-nav-bar"
    }, "NavBar:", /*#__PURE__*/React.createElement("span", null, " "), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, "github"), /*#__PURE__*/React.createElement("span", null, "("), /*#__PURE__*/React.createElement("span", null, aaa), /*#__PURE__*/React.createElement("span", null, ")")), /*#__PURE__*/React.createElement("span", null, " "), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, tableName), /*#__PURE__*/React.createElement("span", null, "( "), /*#__PURE__*/React.createElement("span", null, createLink), /*#__PURE__*/React.createElement("span", null, ","), /*#__PURE__*/React.createElement("span", null, updateOrGetLink), /*#__PURE__*/React.createElement("span", null, ","), /*#__PURE__*/React.createElement("span", null, listLink), /*#__PURE__*/React.createElement("span", null, ")")), /*#__PURE__*/React.createElement("span", null, " | "), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, "Ref tables"), /*#__PURE__*/React.createElement("span", null, ": "), /*#__PURE__*/React.createElement("span", null, "("), /*#__PURE__*/React.createElement("span", null, this.renderReferenceTableLink()), /*#__PURE__*/React.createElement("span", null, ")")), /*#__PURE__*/React.createElement("span", null, " | "), /*#__PURE__*/React.createElement("a", {
      title: "GitHub File Path",
      href: this.context.githubDb.getDataUrl(dbName, tableName),
      target: "_blank",
      rel: "noreferrer"
    }, this.context.githubDb.getDataPath(dbName, tableName)));
  }
}
NavBar.contextType = PageContext;