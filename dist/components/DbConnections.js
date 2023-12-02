import React, { useRef } from 'react';
import { Button } from 'antd';
import { GithubDb } from '@db-man/github';
import * as constants from '../constants';
import reloadDbsSchemaAsync from '../pages/helpers';
import EditableTable from './EditableTable';
const saveToFile = (data, filename) => {
  const blob = new Blob([data], {
    type: 'application/json'
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

/**
 * To save online db tables schema in the local db, then pages could load faster
 */
const DbConnections = ({
  storage
}) => {
  const fileInputRef = useRef(null);
  const handleDbConnectionEnable = () => {
    const githubDb = new GithubDb({
      personalAccessToken: storage.get(constants.LS_KEY_GITHUB_PERSONAL_ACCESS_TOKEN) || '',
      repoPath: storage.get(constants.LS_KEY_GITHUB_REPO_PATH) || '',
      owner: storage.get(constants.LS_KEY_GITHUB_OWNER) || '',
      repoName: storage.get(constants.LS_KEY_GITHUB_REPO_NAME) || '',
      dbsSchema: storage.get(constants.LS_KEY_DBS_SCHEMA) || ''
    });
    const {
      github
    } = githubDb;
    reloadDbsSchemaAsync(github, githubDb).then(() => {});
  };
  const handleExport = () => {
    const jsonStrData = JSON.stringify({
      [constants.LS_KEY_DBS_SCHEMA]: storage.get(constants.LS_KEY_DBS_SCHEMA),
      [constants.LS_KEY_DB_CONNECTIONS]: storage.get(constants.LS_KEY_DB_CONNECTIONS)
    });
    saveToFile(jsonStrData, 'DbManExportData.json');
  };
  const handleImport = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const jsonString = e.target?.result;
      const parsedData = JSON.parse(jsonString);
      storage.set(constants.LS_KEY_DBS_SCHEMA, parsedData[constants.LS_KEY_DBS_SCHEMA]);
      storage.set(constants.LS_KEY_DB_CONNECTIONS, parsedData[constants.LS_KEY_DB_CONNECTIONS]);
      alert('Finish importing, refresh and enable one connection.');
    };
    reader.readAsText(file);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "dm-db-connections"
  }, /*#__PURE__*/React.createElement("h2", null, "Database Connections 2"), /*#__PURE__*/React.createElement(EditableTable, {
    storage: storage,
    onEnable: handleDbConnectionEnable
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: handleExport
  }, "Export"), ' ', /*#__PURE__*/React.createElement(Button, {
    onClick: handleImport
  }, "Import"), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    style: {
      display: 'none'
    },
    type: "file",
    onChange: handleFileChange
  }));
};
export default DbConnections;
//# sourceMappingURL=DbConnections.js.map