/* eslint-disable react/destructuring-assignment, no-console, max-len */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Collapse } from 'antd';
import PageContext from '../../contexts/page';
import * as constants from '../../constants';
import * as ddRender from '../../ddRender/ddRender';
import FieldWrapperForDetailPage from '../FieldWrapperForDetailPage';
import StringFormFieldValue from '../StringFormFieldValue';
const Detail = props => {
  const {
    columns,
    tables
  } = React.useContext(PageContext);
  const renderWithDdRender = (column, value) => {
    const renderFn = ddRender.getColumnRender(constants.TYPE_GET_PAGE, column, {
      column,
      tables: tables,
      rows: props.refTables[`ref:${column.referenceTable}:rows`] // eslint-disable-line react/prop-types
    });

    if (renderFn) {
      // @ts-ignore
      const el = renderFn(value, props.defaultValues);
      if (el) {
        return el;
      }
    }
    return /*#__PURE__*/React.createElement("div", null, "No render fn: ", value);
  };
  const renderStringFieldValue = column => {
    const value = props.defaultValues[column.id];
    if (column[constants.TYPE_GET_PAGE]) {
      return renderWithDdRender(column, value);
    }
    let preview = false;
    if (column[constants.TYPE_GET_PAGE] === 'WithPreview') {
      preview = true;
    }
    return /*#__PURE__*/React.createElement(StringFormFieldValue, {
      key: column.id,
      inputProps: {
        readOnly: true
      },
      preview: preview,
      value: value
    });
  };
  const renderFieldValue = column => {
    switch (column.type) {
      case constants.STRING:
        return renderStringFieldValue(column);
      case constants.BOOL:
      case constants.NUMBER:
      case constants.STRING_ARRAY:
      default:
        return renderWithDdRender(column, props.defaultValues[column.id]);
    }
  };
  const renderDebugJson = () => {
    const debugJson = JSON.stringify(props.defaultValues, null, '  ');
    const items = [{
      key: 'debug-json',
      label: 'Debug JSON',
      children: /*#__PURE__*/React.createElement(Input.TextArea, {
        style: {
          fontSize: '10px'
        },
        rows: debugJson.split('\n').length,
        value: debugJson
      })
    }];
    return /*#__PURE__*/React.createElement(Collapse, {
      size: "small",
      items: items
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "get-page-body-detail-component"
  }, /*#__PURE__*/React.createElement("div", null, columns.map(column => /*#__PURE__*/React.createElement(FieldWrapperForDetailPage, {
    key: column.id,
    column: column,
    value: props.defaultValues[column.id]
  }, renderFieldValue(column)))), renderDebugJson());
};
Detail.propTypes = {
  defaultValues: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

Detail.defaultProps = {};
export default Detail;
//# sourceMappingURL=Detail.js.map