import { formatDate } from '../../utils';

export const getNewRows = (formValues, oldRows, primaryKey, currentId) => oldRows.map((row) => {
  if (row[primaryKey] !== currentId) {
    return row;
  }
  // To update an existing item
  return {
    ...row,
    ...formValues,
    updatedAt: formatDate(new Date()),
  };
});
