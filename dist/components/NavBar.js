import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { utils } from '@db-man/github';
import * as constants from '../constants';
import { getUrlParams } from '../utils';
import PageContext from '../contexts/page';

/**
 * This component depends on page context, so only used in Application/Page
 * TODO `id` in URL is used in this component, so not all pages could use this component
 */
const NavBar = () => {
  const {
    dbName,
    tableName,
    action,
    primaryKey,
    githubDb,
    columns
  } = useContext(PageContext);
  const renderReferenceTableLink = () => {
    return columns.filter(column => column.referenceTable).map(column => [`${column.referenceTable}(`, /*#__PURE__*/React.createElement("a", {
      key: "create-link",
      href: `/${dbName}/${column.referenceTable}/create`
    }, "Create"), ',', /*#__PURE__*/React.createElement("a", {
      key: "list-link",
      href: `/${dbName}/${column.referenceTable}/list`
    }, "List"), ') | ']);
  };
  const id = getUrlParams()[primaryKey];
  const filter = encodeURIComponent(JSON.stringify({
    [primaryKey]: id
  }));

  // Only when appModes have "split-table"
  const aaa = id ? /*#__PURE__*/React.createElement("a", {
    title: "GitHub File Path",
    href: githubDb?.getGitHubFullPath(`${localStorage.getItem(constants.LS_KEY_GITHUB_REPO_PATH)}/${dbName}/${tableName}/${utils.validFilename(id)}.json`),
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
  }, "NavBar:", /*#__PURE__*/React.createElement("span", null, " "), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, "github"), /*#__PURE__*/React.createElement("span", null, "("), /*#__PURE__*/React.createElement("span", null, aaa), /*#__PURE__*/React.createElement("span", null, ")")), /*#__PURE__*/React.createElement("span", null, " "), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, tableName), /*#__PURE__*/React.createElement("span", null, "( "), /*#__PURE__*/React.createElement("span", null, createLink), /*#__PURE__*/React.createElement("span", null, ","), /*#__PURE__*/React.createElement("span", null, updateOrGetLink), /*#__PURE__*/React.createElement("span", null, ","), /*#__PURE__*/React.createElement("span", null, listLink), /*#__PURE__*/React.createElement("span", null, ")")), /*#__PURE__*/React.createElement("span", null, " | "), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, "Ref tables"), /*#__PURE__*/React.createElement("span", null, ": "), /*#__PURE__*/React.createElement("span", null, "("), /*#__PURE__*/React.createElement("span", null, renderReferenceTableLink()), /*#__PURE__*/React.createElement("span", null, ")")), /*#__PURE__*/React.createElement("span", null, " | "), /*#__PURE__*/React.createElement("a", {
    title: "GitHub File Path",
    href: githubDb?.getDataUrl(dbName, tableName),
    target: "_blank",
    rel: "noreferrer"
  }, githubDb?.getDataPath(dbName, tableName)));
};
export default NavBar;
//# sourceMappingURL=NavBar.js.map