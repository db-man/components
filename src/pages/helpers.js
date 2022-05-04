import { github, githubDb } from '@db-man/github';
import { message } from 'antd';
import * as constants from '../constants';

const loadDbsSchemaAsync = async (path) => {
  // Get all db names in root dir
  const files = await github.getFile(path);

  const dbsSchema = {
    /**
     * key must be:
     * - Top Nav title name
     * - Folder name in https://github.com/{user_name}/{repo_name}/tree/main/{path}
     */
    // dbName: [{ name: "table_name", columns: [] }]
  };

  await Promise.all(
    files
      .map(({ name }) => name)
      .map((dbName) => githubDb.getDbTablesSchemaAsync(dbName).then((tables) => {
        dbsSchema[dbName] = tables;
      })),
  );

  return dbsSchema;
};

const validateDbsSchame = (dbsSchema) => {
  Object.keys(dbsSchema).forEach((dbName) => {
    const tables = dbsSchema[dbName];
    tables.forEach((table, index) => {
      if (!table.name) {
        message.warn(`Missing table name, dbName:${dbName}, index:${index}`, 10);
      }
      if (!table.columns) {
        message.warn(`Missing table columns, tableName: ${table.name}, dbName:${dbName}`, 10);
      }
    });
  });
};

const reloadDbsSchemaAsync = async () => {
  const path = localStorage.getItem(constants.LS_KEY_GITHUB_REPO_PATH);
  if (!path) {
    console.error('Repo path not found in localStorage!'); // eslint-disable-line no-console
    return;
  }

  const dbsSchema = await loadDbsSchemaAsync(path);

  validateDbsSchame(dbsSchema);

  localStorage.setItem(constants.LS_KEY_DBS_SCHEMA, JSON.stringify(dbsSchema));
};

export default reloadDbsSchemaAsync;
