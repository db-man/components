function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { GithubDbV2 } from '@db-man/github';
import * as constants from '../constants';
import reloadDbsSchemaAsync from '../pages/helpers';
import EditableTable from './EditableTable';

/**
 * To save online db tables schema in the local db, then pages could load faster
 */
export default class DbConnections extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "handleLoadDbsClick", () => {
      const {
        storage
      } = this.props;
      const githubDb = new GithubDbV2({
        personalAccessToken: storage.get(constants.LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN),
        repoPath: storage.get(constants.LS_KEY_GITHUB_REPO_PATH),
        owner: storage.get(constants.LS_KEY_GITHUB_OWNER),
        repoName: storage.get(constants.LS_KEY_GITHUB_REPO_NAME),
        dbsSchema: storage.get(constants.LS_KEY_DBS_SCHEMA)
      });
      const {
        github
      } = githubDb;
      reloadDbsSchemaAsync(github, githubDb).then(() => {});
    });
    _defineProperty(this, "handleDbConnectionEnable", () => {
      this.handleLoadDbsClick();
    });
  }
  render() {
    const {
      storage
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "dm-db-connections"
    }, /*#__PURE__*/React.createElement("h2", null, "Database Connections"), /*#__PURE__*/React.createElement(EditableTable, {
      storage: storage,
      onEnable: this.handleDbConnectionEnable
    }));
  }
}