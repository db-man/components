import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Input, message, Table,
} from 'antd';

import * as constants from '../constants';
import reloadDbsSchemaAsync from './helpers';

const columns = [
  {
    key: 'owner', dataIndex: 'owner', title: 'Owner',
  },
  {
    key: 'token', dataIndex: 'token', title: 'Token',
  },
  {
    key: 'repoName', dataIndex: 'repoName', title: 'Repo Name',
  },
  {
    key: 'repoPath', dataIndex: 'repoPath', title: 'Repo Path',
  },

];
const dbs = JSON.parse(localStorage.getItem(constants.LS_KEY_DBS_SCHEMA));
const handleClick = () => {
  message.info('Start loading DBs schema...');
  reloadDbsSchemaAsync().then(() => {
    message.info('Finish loading DBs schema!');
  });
};

function DbActions() {
  if (!localStorage.getItem(constants.LS_KEY_GITHUB_REPO_PATH)) {
    return null;
  }
  return (
    <div>
      Load dbs schema from github to local db
      {' '}
      <Button onClick={handleClick}>Load DBs</Button>
    </div>
  );
}

/**
 * To save online db tables schema in the local db, then pages could load faster
 */
export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: '',
      repo: '',
      personalToken: '',
      path: '',
      dbConnections: [],
    };
  }

  componentDidMount() {
    this.setState({
      owner: localStorage.getItem(constants.LS_KEY_GITHUB_OWNER),
      repo: localStorage.getItem(constants.LS_KEY_GITHUB_REPO_NAME),
      personalToken: localStorage.getItem(
        constants.LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN,
      ),
      path: localStorage.getItem(constants.LS_KEY_GITHUB_REPO_PATH),
      dbConnections: localStorage.getItem(constants.LS_KEY_DB_CONNECTIONS) || [],
    });
  }

  handleSavePath = () => {
    const {
      owner, repo, personalToken, path,
    } = this.state;
    localStorage.setItem(constants.LS_KEY_GITHUB_OWNER, owner);
    localStorage.setItem(constants.LS_KEY_GITHUB_REPO_NAME, repo);
    localStorage.setItem(
      constants.LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN,
      personalToken,
    );
    localStorage.setItem(constants.LS_KEY_GITHUB_REPO_PATH, path);
  };

  handleChange = (key) => (event) => this.setState({ [key]: event.target.value });

  // handleLoadDbs = () => {
  //   reloadDbsSchemaAsync();
  // };

  render() {
    const { children } = this.props;
    const {
      owner, personalToken, repo, path, dbConnections,
    } = this.state;
    if (dbs && children) return children;

    return (
      <div>
        Settings
        <Table dataSource={dbConnections} column={columns} />
        <div>
          Owner:
          {' '}
          <Input
            placeholder="e.g. user_name"
            value={owner}
            onChange={this.handleChange('owner')}
          />
          {' '}
          <br />
          Personal token:
          {' '}
          <Input
            placeholder="e.g. 123"
            value={personalToken}
            onChange={this.handleChange('personalToken')}
          />
          {' '}
          <br />
          Repo:
          {' '}
          <Input
            placeholder="e.g. repo_name"
            value={repo}
            onChange={this.handleChange('repo')}
          />
          {' '}
          <br />
          Path:
          {' '}
          <Input
            placeholder="e.g. dbs_path"
            value={path}
            onChange={this.handleChange('path')}
          />
          {' '}
          (A path in a github repo)
          <br />
          <Button onClick={this.handleSavePath}>Save</Button>
        </div>
        <DbActions />
      </div>
    );
  }
}

Settings.propTypes = {
  children: PropTypes.node,
};
Settings.defaultProps = {
  children: null,
};
