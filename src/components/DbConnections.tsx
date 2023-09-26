import React from 'react';

import { GithubDb } from '@db-man/github';
import * as constants from '../constants';
import reloadDbsSchemaAsync from '../pages/helpers';
import EditableTable from './EditableTable';

export type StorageType = {
  set: (k: string, v: string) => void;
  get: (k: string) => string | null;
};

/**
 * To save online db tables schema in the local db, then pages could load faster
 */
const DbConnections = ({ storage }: { storage: StorageType }) => {
  const handleLoadDbsClick = () => {
    const githubDb = new GithubDb({
      personalAccessToken: storage.get(
        constants.LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN
      ),
      repoPath: storage.get(constants.LS_KEY_GITHUB_REPO_PATH),
      owner: storage.get(constants.LS_KEY_GITHUB_OWNER),
      repoName: storage.get(constants.LS_KEY_GITHUB_REPO_NAME),
      dbsSchema: storage.get(constants.LS_KEY_DBS_SCHEMA),
    });
    const { github } = githubDb;
    reloadDbsSchemaAsync(github, githubDb).then(() => {});
  };

  const handleDbConnectionEnable = () => {
    handleLoadDbsClick();
  };

  return (
    <div className='dm-db-connections'>
      <h2>Database Connections</h2>
      <EditableTable storage={storage} onEnable={handleDbConnectionEnable} />
    </div>
  );
};

export default DbConnections;
