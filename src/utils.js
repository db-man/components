import { message } from 'antd';

export const getUrlParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
};

/**
 *
 * @param {*} columns
 * @returns {string|null}
 */
export const getPrimaryKey = (columns) => {
  const foundCol = columns.find((col) => col.primary);
  return foundCol ? foundCol.id : null;
};

export const getTablePrimaryKey = (tables, tableName) => {
  const foundTable = tables.find((table) => table.name === tableName);
  if (!foundTable) {
    return null;
  }

  return getPrimaryKey(foundTable.columns);
};

export const errMsg = (msg, err) => {
  console.error(`[db-man] ${msg}`, err); // eslint-disable-line no-console
  message.error(msg);
};

/**
 * @param {Date} d
 * @returns {string} "2021-07-04 01:16:01"
 */
export const formatDate = (d) => {
  const pad = (num) => num.toString().padStart(2, '0');
  return (
    `${d.getFullYear()
    }-${
      pad(d.getMonth() + 1)
    }-${
      pad(d.getDate())
    } ${
      pad(d.getHours())
    }:${
      pad(d.getMinutes())
    }:${
      pad(d.getSeconds())}`
  );
};
