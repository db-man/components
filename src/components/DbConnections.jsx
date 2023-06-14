import React from 'react';

import { GithubDbV2 } from '@db-man/github';
import * as constants from '../constants';
import reloadDbsSchemaAsync from '../pages/helpers';
import EditableTable from './EditableTable';

/**
 * To save online db tables schema in the local db, then pages could load faster
 */
export default class DbConnections extends React.Component {
  handleLoadDbsClick = () => {
    const { storage } = this.props;
    const githubDb = new GithubDbV2({
      personalAccessToken: storage.get(constants.LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN),
      repoPath: storage.get(constants.LS_KEY_GITHUB_REPO_PATH),
      owner: storage.get(constants.LS_KEY_GITHUB_OWNER),
      repoName: storage.get(constants.LS_KEY_GITHUB_REPO_NAME),
      dbsSchema: storage.get(constants.LS_KEY_DBS_SCHEMA),
    });
    const { github } = githubDb;
    reloadDbsSchemaAsync(github, githubDb).then(() => {
    });
  };

  handleDbConnectionEnable = () => {
    this.handleLoadDbsClick();
  };

  render() {
    const { storage } = this.props;
    return (
      <div className="dm-db-connections">
        <h2>Database Connections</h2>
        <EditableTable
          storage={storage}
          onEnable={this.handleDbConnectionEnable}
        />
      </div>
    );
  }
}
