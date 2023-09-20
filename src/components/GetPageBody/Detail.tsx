/* eslint-disable react/destructuring-assignment, no-console, max-len */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Collapse, CollapseProps } from 'antd';

import PageContext from '../../contexts/page';
import * as constants from '../../constants';
import * as ddRender from '../../ddRender/ddRender';
import FieldWrapperForDetailPage from '../FieldWrapperForDetailPage';
import StringFormFieldValue from '../StringFormFieldValue';
import Column from '../../types/Column';
import { ValueType } from '../Form';

interface DetailProps {
  defaultValues: ValueType;
  refTables: Record<string, any>;
}

const Detail = (props: DetailProps) => {
  const { columns, tables } = React.useContext(PageContext);

  const renderWithDdRender = (column: Column, value: any) => {
    const renderFn = ddRender.getColumnRender('type:getPage', column, {
      column,
      tables: tables,
      rows: props.refTables[`ref:${column.referenceTable}:rows`], // eslint-disable-line react/prop-types
    });
    if (renderFn) {
      const el = renderFn(value, props.defaultValues);
      if (el) {
        return el;
      }
    }
    return <div>No render fn: {value}</div>;
  };

  const renderStringFieldValue = (column: Column) => {
    const value = props.defaultValues[column.id];

    if (column['type:getPage']) {
      return renderWithDdRender(column, value);
    }

    let preview = false;
    if (column['type:getPage'] === 'WithPreview') {
      preview = true;
    }
    return (
      <StringFormFieldValue
        key={column.id}
        inputProps={{
          readOnly: true,
        }}
        preview={preview}
        value={value}
      />
    );
  };

  const renderFieldValue = (column: Column) => {
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
    const items: CollapseProps['items'] = [
      {
        key: 'debug-json',
        label: 'Debug JSON',
        children: (
          <Input.TextArea
            style={{ fontSize: '10px' }}
            rows={debugJson.split('\n').length}
            value={debugJson}
          />
        ),
      },
    ];
    return <Collapse size='small' items={items} />;
  };

  return (
    <div className='get-page-body-detail-component'>
      <div>
        {columns.map((column) => (
          <FieldWrapperForDetailPage
            key={column.id}
            column={column}
            value={props.defaultValues[column.id]}
          >
            {renderFieldValue(column)}
          </FieldWrapperForDetailPage>
        ))}
      </div>
      {renderDebugJson()}
    </div>
  );
};

Detail.propTypes = {
  defaultValues: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

Detail.defaultProps = {};

export default Detail;
