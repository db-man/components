import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import PageContext from '../contexts/page';
import { columnType } from './types';
import { useAppContext } from '../contexts/AppContext';
export default function RefTableLinks({
  value,
  column
}) {
  const {
    dbs
  } = useAppContext();
  const {
    dbName
  } = useContext(PageContext);
  // val can be "123" or ["123", "456"]
  let ids = [];
  if (Array.isArray(value)) {
    ids = value;
  } else {
    ids = value === null ? [] : [value];
  }
  const foundRefTable = dbs[dbName].find(tb => tb.name === column.referenceTable);
  if (!foundRefTable) {
    return /*#__PURE__*/React.createElement("div", null, "Ref table not found");
  }
  const foundRefTableColumn = foundRefTable.columns.find(col => col.primary);
  if (!foundRefTableColumn) {
    return /*#__PURE__*/React.createElement("div", null, "Ref table primary column not found");
  }
  const refTablePrimaryKey = foundRefTableColumn.id;
  return /*#__PURE__*/React.createElement("span", {
    className: "ref-table"
  }, /*#__PURE__*/React.createElement(List, {
    size: "small",
    dataSource: ids,
    renderItem: id => /*#__PURE__*/React.createElement(List.Item, null, /*#__PURE__*/React.createElement(Link, {
      to: `/${dbName}/${column.referenceTable}/get?${refTablePrimaryKey}=${id}`
    }, id))
  }));
}
RefTableLinks.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  column: columnType.isRequired
};
//# sourceMappingURL=RefTableLinks.js.map