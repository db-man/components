/* eslint-disable import/prefer-default-export */
export const getUrlParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
};
/**
 *
 * @param {*} columns
 * @returns {string|null}
 */

export const getPrimaryKey = columns => {
  const foundCol = columns.find(col => col.primary);
  return foundCol ? foundCol.id : null;
};
export const getTablePrimaryKey = (tables, tableName) => {
  const foundTable = tables.find(table => table.name === tableName);

  if (!foundTable) {
    return null;
  }

  return getPrimaryKey(foundTable.columns);
};