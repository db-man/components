/* eslint-disable react/destructuring-assignment, no-console, max-len */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Collapse } from 'antd';

import PageContext from '../../contexts/page';
import * as constants from '../../constants';
import * as ddRender from '../../ddRender/ddRender';
import FieldWrapper from '../FieldWrapper';
import StringFormFieldValue from '../StringFormFieldValue';

const { Panel } = Collapse;

export default class Detail extends React.Component {
  renderStringFieldValue = (column) => {
    const value = this.props.defaultValues[column.id];

    if (column['type:getPage']) {
      const renderFn = ddRender.getRender(column['type:getPage'], { column });
      if (!renderFn) {
        return value;
      }
      const el = renderFn(value, this.props.defaultValues);
      if (el) {
        return el;
      }
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

  renderStringArrayFormFieldValue = (column) => {
    let content = <span>No data</span>;

    const refTableRows = this.props.refTables[`ref:${column.referenceTable}:rows`]; // eslint-disable-line react/prop-types

    const args = column['type:getPage'];
    const renderFn = ddRender.getRender(args, {
      tables: this.context.tables,
      rows: refTableRows,
    }) || ((val) => val && val.join(', '));

    if (renderFn) {
      content = renderFn(
        this.props.defaultValues[column.id],
        this.props.defaultValues,
      );
    } else {
      content = (
        <div>
          No Render Fn:
          {' '}
          {this.props.defaultValues[column.id]}
        </div>
      );
    }

    return <div key={column.id}>{content}</div>;
  };

  renderFieldValue = (column) => {
    switch (column.type) {
      case constants.STRING_ARRAY:
        return this.renderStringArrayFormFieldValue(column);
      case constants.STRING:
      default:
        return this.renderStringFieldValue(column);
    }
  };

  renderDebugJson = () => {
    const debugJson = JSON.stringify(this.props.defaultValues, null, '  ');
    return (
      <Collapse>
        <Panel header="Debug JSON" key="1">
          <Input.TextArea
            style={{ fontSize: '10px' }}
            rows={debugJson.split('\n').length}
            value={debugJson}
          />
        </Panel>
      </Collapse>
    );
  };

  render() {
    const { columns } = this.context;

    return (
      <div className="get-page-body-detail-component">
        <div>
          {columns.map((column) => (
            <FieldWrapper
              key={column.id}
              column={column}
              value={this.props.defaultValues[column.id]}
            >
              {this.renderFieldValue(column)}
            </FieldWrapper>
          ))}
        </div>
        {this.renderDebugJson()}
      </div>
    );
  }
}

Detail.propTypes = {
  defaultValues: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

Detail.defaultProps = {};

Detail.contextType = PageContext;
