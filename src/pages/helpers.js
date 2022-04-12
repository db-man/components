import { message } from "antd";
import { constants, github, githubDb } from "db-man";

const _loadDbsSchemaAsync = async (path) => {
  // Get all db names in root dir
  const files = await github.getFile(path);

  const dbsSchema = {
    /**
     * key must be:
     * - Top Nav title name
     * - Folder name in https://github.com/{user_name}/{repo_name}/tree/main/{path}
     */
    // dbName: []
  };

  await Promise.all(
    files
      .map(({ name }) => name)
      .map((dbName) =>
        githubDb.getDbTablesSchemaAsync(dbName).then((tables) => {
          dbsSchema[dbName] = tables;
        })
      )
  );

  return dbsSchema;
};

export const reloadDbsSchemaAsync = async () => {
  const path = localStorage.getItem(constants.LS_KEY_GITHUB_REPO_PATH);
  if (!path) {
    message.error("Repo path not found in localStorage!");
    return;
  }

  message.info("Start loading DBs schema...");
  const dbsSchema = await _loadDbsSchemaAsync(path);
  localStorage.setItem(constants.LS_KEY_DBS_SCHEMA, JSON.stringify(dbsSchema));
  message.info("Finish loading DBs schema!");
};
