import React from 'react';
import { GithubDb } from '@db-man/github';
import * as constants from '../constants';
import reloadDbsSchemaAsync from '../pages/helpers';
import EditableTable from './EditableTable';
/**
 * To save online db tables schema in the local db, then pages could load faster
 */
const DbConnections = ({
  storage
}) => {
  const handleLoadDbsClick = () => {
    const githubDb = new GithubDb({
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
  };
  const handleDbConnectionEnable = () => {
    handleLoadDbsClick();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "dm-db-connections"
  }, /*#__PURE__*/React.createElement("h2", null, "Database Connections"), /*#__PURE__*/React.createElement(EditableTable, {
    storage: storage,
    onEnable: handleDbConnectionEnable
  }));
};
export default DbConnections;
//# sourceMappingURL=DbConnections.js.map