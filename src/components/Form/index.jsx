/* eslint-disable react/destructuring-assignment, react/no-access-state-in-setstate, react/forbid-prop-types, max-len */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Select, Button, message, Row, Col, Tabs,
} from 'antd';

import StringFormField from '../StringFormField';
import RadioGroupFormField from '../RadioGroupFormField';
import JsonEditor from '../JsonEditor';
import RefTableLink from '../RefTableLink';
import PageContext from '../../contexts/page';
import MultipleInputs from '../MultipleInputs';
import { dbs } from '../../dbs';
import * as constants from '../../constants';
import TextAreaFormField from '../TextAreaFormField';
import { validatePrimaryKey, isType } from './helpers';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        ...this.props.defaultValues,
      },
    };
  }

  handleChange = (key) => (value) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [key]: value,
      },
    });
  };

  handleInputChange = (key) => (event) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [key]: event.target.value,
      },
    });
    // validate the primary field in form, e.g. duplication check
    // TODO maybe do this in antd Form component
    // TODO why do we assume the type of primary column in a table is always `string`?
    if (key === this.context.primaryKey) {
      if (
        !validatePrimaryKey(
          event.target.value,
          this.props.rows,
          this.context.primaryKey,
        )
      ) {
        this.warnPrimaryKeyInvalid(event.target.value);
      }
    }
  };

  /**
   * @param {string} id Column name
   * @param {string[]} value Cell value
   */
  handleStringArrayChange = (id) => (value) => this.setState({
    formValues: {
      ...this.state.formValues,
      [id]: value,
    },
  });

  handleJsonEditorChange = (formValues) => {
    this.setState({ formValues });
  };

  handleKeyDown = (event) => {
    if (event.code === 'KeyS' && event.metaKey) {
      event.preventDefault();
      this.handleFormSubmit();
    }
  };

  handleFormSubmit = () => {
    const { formValues } = this.state;
    this.props.onSubmit(formValues);
  };

  warnPrimaryKeyInvalid = (value) => message.warn(
    <div>
      Found duplicated item in db
      {' '}
      <a
        href={`/${this.context.dbName}/${this.context.tableName}/update?${this.context.primaryKey}=${value}`}
      >
        {value}
      </a>
    </div>,
    10,
  );

  renderStringFormField = (column) => {
    const { saveLoading } = this.props;
    const value = this.state.formValues[column.id];
    if (column['type:createUpdatePage'] === 'TextArea') {
      return (
        <TextAreaFormField
          key={column.id}
          label={column.name}
          rows={2}
          disabled={saveLoading}
          value={value}
          onChange={this.handleChange(column.id)}
        />
      );
    }
    if (column['type:createUpdatePage'] === 'RadioGroup') {
      return (
        <RadioGroupFormField
          key={column.id}
          label={column.name}
          column={column}
          disabled={saveLoading}
          value={value}
          onChange={this.handleChange(column.id)}
        />
      );
    }
    let preview = false;
    if (column['type:createUpdatePage'] === 'WithPreview') {
      preview = true;
    }
    return (
      <StringFormField
        key={column.id}
        inputProps={{
          disabled: saveLoading,
          autoFocus: column.id === this.context.primaryKey,
          onKeyDown: this.handleKeyDown,
        }}
        preview={preview}
        label={column.name}
        dbName={this.context.dbName}
        primaryKey={this.context.primaryKey}
        column={column}
        value={value}
        onChange={this.handleInputChange(column.id)}
      />
    );
  };

  renderStringArrayFormField = (column) => {
    const { formValues } = this.state;

    if (
      !column['type:createUpdatePage']
      || column['type:createUpdatePage'] === 'Select'
    ) {
      return (
        <div
          key={column.id}
          className="dm-form-field dm-string-array-form-field"
        >
          <b>{column.name}</b>
          :
          {' '}
          <Select
            size="small"
            mode="tags"
            style={{ width: '100%' }}
            disabled={this.props.saveLoading}
            value={formValues[column.id]}
            onChange={this.handleStringArrayChange(column.id)}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      );
    }

    const { is: isMultipleInputs, preview: isMultipleInputsWithPreview } = isType(column, 'MultipleInputs');
    if (isMultipleInputs) {
      if (isMultipleInputsWithPreview) {
        return (
          <div
            key={column.id}
            className="dm-form-field dm-string-array-form-field"
          >
            <b>{column.name}</b>
            :
            {' '}
            <Row>
              <Col span={12}>
                <MultipleInputs
                  rows={2}
                  disabled={this.props.saveLoading}
                  value={formValues[column.id]}
                  onChange={this.handleStringArrayChange(column.id)}
                />
              </Col>
              <Col span={12}>
                {formValues[column.id]
                  && formValues[column.id].map((img) => (
                    <a key={img} href={img} target="_blank" rel="noreferrer">
                      <img width="200px" src={img} alt="img" />
                    </a>
                  ))}
              </Col>
            </Row>
          </div>
        );
      }

      return (
        <div
          key={column.id}
          className="dm-form-field dm-string-array-form-field"
        >
          <b>{column.name}</b>
          :
          {' '}
          <RefTableLink
            dbName={this.context.dbName}
            tables={dbs[this.context.dbName]}
            value={this.props.value}
            column={column}
          />
          <MultipleInputs
            disabled={this.props.saveLoading}
            value={formValues[column.id]}
            onChange={this.handleStringArrayChange(column.id)}
          />
        </div>
      );
    }

    return null;
  };

  render() {
    return (
      <div className="create-update-component">
        <Tabs defaultActiveKey="form">
          <Tabs.TabPane tab="Form" key="form">
            <div className="dm-form">
              {this.context.columns.map((column) => {
                switch (column.type) {
                  case constants.STRING:
                    return this.renderStringFormField(column);
                  case constants.STRING_ARRAY:
                    return this.renderStringArrayFormField(column);
                  default:
                    // eslint-disable-next-line no-console
                    console.warn(
                      'no type field found in column, fallback using string type, column:',
                      column,
                    );
                    return this.renderStringFormField(column);
                }
              })}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="JSON" key="json">
            <JsonEditor
              value={this.state.formValues}
              onChange={this.handleJsonEditorChange}
            />
          </Tabs.TabPane>
        </Tabs>

        <div className="dm-action-buttons">
          <Button
            type="primary"
            disabled={this.props.saveLoading}
            loading={this.props.saveLoading}
            onClick={this.handleFormSubmit}
          >
            Save
          </Button>
          {' '}
          |
          {' '}
          <Button
            type="link"
            href={`/${this.context.dbName}/${this.context.tableName}/create`}
          >
            Reset
          </Button>
          {' '}
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  value: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  defaultValues: PropTypes.object.isRequired,
  saveLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: () => {},
};

Form.contextType = PageContext;
