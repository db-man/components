import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import * as constants from 'constants.js';

import reloadDbsSchemaAsync from './helpers';

const dbs = JSON.parse(localStorage.getItem(constants.LS_KEY_DBS_SCHEMA));

function DbActions() {
  if (!localStorage.getItem(constants.LS_KEY_GITHUB_REPO_PATH)) {
    return null;
  }
  return (
    <div>
      Load dbs schema from github to local db
      {' '}
      <Button onClick={reloadDbsSchemaAsync}>Load DBs</Button>
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
      owner, personalToken, repo, path,
    } = this.state;
    if (dbs && children) return children;

    return (
      <div>
        Settings
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
  children: PropTypes.node.isRequired,
};
