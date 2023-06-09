// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'; // eslint-disable-line import/no-extraneous-dependencies

const localStorageMock = (function mock() {
  let store = {
    dm_github_repo_path: 'dbs',
    dm_github_owner: 'db-man',
    dm_github_repo_name: 'db',
    dm_dbs_schema: '{"iam":[{"name":"users","columns":[{"id":"userId","name":"User ID","primary":true},{"id":"name","name":"Name"},{"id":"age","name":"Age","type":"NUMBER"},{"id":"active","name":"Active","type":"BOOL"},{"id":"tags","name":"Tags","type":"STRING_ARRAY"}]}]}',
    dm_db_connections: '[{"key":"1","owner":"db-man","token":"123","repo":"db","path":"dbs","modes":""}]',
  };

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
}());

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
