import { types } from '@db-man/github';
import { message } from 'antd';
import DbColumn from './types/DbColumn';

export const getUrlParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
};

/**
 *
 * @param {*} columns
 * @returns {string}
 */
export const getPrimaryKey = (columns: DbColumn[]) => {
  const foundCol = columns.find((col) => col.primary);
  return foundCol ? foundCol.id : '';
};

export const getTablePrimaryKey = (
  tables: types.DbTable[],
  tableName: string
) => {
  const foundTable = tables.find((table) => table.name === tableName);
  if (!foundTable) {
    return '';
  }

  return getPrimaryKey(foundTable.columns);
};

export const errMsg = (msg: string, err?: Error) => {
  console.error(`[db-man] ${msg}`, err); // eslint-disable-line no-console
  message.error(msg);
};
