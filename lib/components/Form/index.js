function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable react/destructuring-assignment, react/no-access-state-in-setstate, react/forbid-prop-types, max-len */

import React from 'react';
import PropTypes from 'prop-types';
import { Select, Button, message, Row, Col, Tabs, Popconfirm, InputNumber, Switch } from 'antd';
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
import FieldWrapperForCreateUpdatePage from '../FieldWrapperForCreateUpdatePage';
const renderFormFieldWrapper = (id, label, formField) => /*#__PURE__*/React.createElement("div", {
  key: id,
  className: "dm-form-field dm-string-form-field"
}, /*#__PURE__*/React.createElement("b", null, label), ": ", formField);
const filterOutHiddenFields = column => column['type:createUpdatePage'] !== 'HIDE';
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleChange", key => value => {
      this.setState({
        formValues: {
          ...this.state.formValues,
          [key]: value
        }
      });
    });
    _defineProperty(this, "handleInputChange", key => event => {
      this.setState({
        formValues: {
          ...this.state.formValues,
          [key]: event.target.value
        }
      });
      // When mode is split-table, thats because table file too big.
      // Will not download big table file, so no checking about duplicated item.
      if (!this.isSplitTable) {
        // validate the primary field in form, e.g. duplication check
        // TODO maybe do this in antd Form component
        // TODO why do we assume the type of primary column in a table is always `string`?
        if (key === this.context.primaryKey) {
          if (!validatePrimaryKey(event.target.value, this.props.rows, this.context.primaryKey)) {
            this.warnPrimaryKeyInvalid(event.target.value);
          }
        }
      }
    });
    /**
     * @param {string} id Column name
     * @param {string[]} value Cell value
     */
    _defineProperty(this, "handleStringArrayChange", id => value => this.setState({
      formValues: {
        ...this.state.formValues,
        [id]: value
      }
    }));
    _defineProperty(this, "handleJsonEditorChange", formValues => {
      this.setState({
        formValues
      });
    });
    _defineProperty(this, "handleKeyDown", event => {
      if (event.code === 'KeyS' && event.metaKey) {
        event.preventDefault();
        this.handleFormSubmit();
      }
    });
    _defineProperty(this, "handleFormSubmit", () => {
      const {
        formValues
      } = this.state;
      this.props.onSubmit(formValues);
    });
    _defineProperty(this, "handleDelete", () => {
      const {
        formValues
      } = this.state;
      this.props.onDelete(formValues);
    });
    _defineProperty(this, "warnPrimaryKeyInvalid", value => message.warning( /*#__PURE__*/React.createElement("div", null, "Found duplicated item in db", ' ', /*#__PURE__*/React.createElement("a", {
      href: `/${this.context.dbName}/${this.context.tableName}/update?${this.context.primaryKey}=${value}`
    }, value)), 10));
    _defineProperty(this, "renderStringFormField", column => {
      const {
        loading
      } = this.props;
      const value = this.state.formValues[column.id];
      if (column['type:createUpdatePage'] === 'TextArea') {
        return /*#__PURE__*/React.createElement(TextAreaFormField, {
          key: column.id,
          label: column.name,
          rows: 2,
          disabled: loading,
          value: value,
          onChange: this.handleChange(column.id)
        });
      }
      if (column['type:createUpdatePage'] === 'RadioGroup') {
        const radioValue = value || column.enum[0];
        return renderFormFieldWrapper(column.id, column.name, /*#__PURE__*/React.createElement(RadioGroupFormField, {
          column: column,
          disabled: loading,
          value: radioValue,
          onChange: this.handleChange(column.id)
        }));
      }
      let preview = false;
      if (column['type:createUpdatePage'] === 'WithPreview') {
        preview = true;
      }
      return /*#__PURE__*/React.createElement(StringFormField, {
        key: column.id,
        inputProps: {
          disabled: loading,
          autoFocus: column.id === this.context.primaryKey,
          onKeyDown: this.handleKeyDown,
          placeholder: column.placeholder
        },
        preview: preview,
        label: column.name,
        dbName: this.context.dbName,
        primaryKey: this.context.primaryKey,
        column: column,
        value: value,
        onChange: this.handleInputChange(column.id)
      });
    });
    _defineProperty(this, "renderStringArrayFormField", column => {
      const {
        formValues
      } = this.state;
      if (!column['type:createUpdatePage'] || column['type:createUpdatePage'] === 'Select') {
        return /*#__PURE__*/React.createElement("div", {
          key: column.id,
          className: "dm-form-field dm-string-array-form-field"
        }, /*#__PURE__*/React.createElement("b", null, column.name), ":", ' ', /*#__PURE__*/React.createElement(Select, {
          size: "small",
          mode: "tags",
          style: {
            width: '100%'
          },
          disabled: this.props.loading,
          value: formValues[column.id],
          onChange: this.handleStringArrayChange(column.id),
          onKeyDown: this.handleKeyDown
        }));
      }
      const {
        is: isMultipleInputs,
        preview: isMultipleInputsWithPreview
      } = isType(column, 'MultipleInputs');
      if (isMultipleInputs) {
        if (isMultipleInputsWithPreview) {
          return /*#__PURE__*/React.createElement(FieldWrapperForCreateUpdatePage, {
            key: column.id,
            column: column
          }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
            span: 12
          }, /*#__PURE__*/React.createElement(MultipleInputs, {
            rows: 2,
            disabled: this.props.loading,
            value: formValues[column.id],
            onChange: this.handleStringArrayChange(column.id)
          })), /*#__PURE__*/React.createElement(Col, {
            span: 12
          }, formValues[column.id] && formValues[column.id].map(img => /*#__PURE__*/React.createElement("a", {
            key: img,
            href: img,
            target: "_blank",
            rel: "noreferrer"
          }, /*#__PURE__*/React.createElement("img", {
            width: "200px",
            src: img,
            alt: "img"
          }))))));
        }
        return /*#__PURE__*/React.createElement("div", {
          key: column.id,
          className: "dm-form-field dm-string-array-form-field"
        }, /*#__PURE__*/React.createElement("b", null, column.name), ":", ' ', /*#__PURE__*/React.createElement(RefTableLink, {
          dbName: this.context.dbName,
          tables: dbs[this.context.dbName],
          value: formValues[column.id],
          column: column
        }), /*#__PURE__*/React.createElement(MultipleInputs, {
          disabled: this.props.loading,
          value: formValues[column.id],
          onChange: this.handleStringArrayChange(column.id)
        }));
      }
      return null;
    });
    _defineProperty(this, "renderNumberFormField", column => {
      const {
        loading
      } = this.props;
      return renderFormFieldWrapper(column.id, column.name, /*#__PURE__*/React.createElement(InputNumber, {
        size: "small",
        disabled: loading,
        autoFocus: column.id === this.context.primaryKey,
        value: this.state.formValues[column.id],
        onChange: this.handleChange(column.id),
        onKeyDown: this.handleKeyDown
      }));
    });
    _defineProperty(this, "renderBoolFormField", column => renderFormFieldWrapper(column.id, column.name, /*#__PURE__*/React.createElement(Switch, {
      size: "small",
      disabled: this.props.loading,
      checked: this.state.formValues[column.id],
      onChange: this.handleChange(column.id)
    })));
    _defineProperty(this, "fieldRender", column => {
      switch (column.type) {
        case constants.STRING_ARRAY:
          return this.renderStringArrayFormField(column);
        case constants.NUMBER:
          return this.renderNumberFormField(column);
        case constants.BOOL:
          return this.renderBoolFormField(column);
        case constants.STRING:
        default:
          return this.renderStringFormField(column);
      }
    });
    this.state = {
      formValues: {
        ...this.props.defaultValues
      }
    };
  }
  componentDidMount() {
    this.context.columns.forEach(col => {
      if (!this.state.formValues[col.id]) {
        let defaultValue = '';
        switch (col['type:createUpdatePage']) {
          case 'RadioGroup':
            [defaultValue] = col.enum;
            break;
          default:
            defaultValue = '';
        }
        if (defaultValue) {
          this.setState(prevState => ({
            ...prevState,
            formValues: {
              ...prevState.formValues,
              [col.id]: defaultValue
            }
          }));
        }
      }
    });
  }
  get isSplitTable() {
    const {
      appModes
    } = this.context;
    return appModes.indexOf('split-table') !== -1;
  }
  render() {
    const {
      loading
    } = this.props;
    const tabsItems = [{
      label: 'Form',
      key: 'form',
      children: /*#__PURE__*/React.createElement("div", {
        className: "dm-form"
      }, this.context.columns.filter(filterOutHiddenFields).map(this.fieldRender))
    }, {
      label: 'JSON',
      key: 'json',
      children: /*#__PURE__*/React.createElement(JsonEditor, {
        value: this.state.formValues,
        onChange: this.handleJsonEditorChange
      })
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "create-update-component"
    }, /*#__PURE__*/React.createElement(Tabs, {
      defaultActiveKey: "form",
      items: tabsItems
    }), /*#__PURE__*/React.createElement("div", {
      className: "dm-action-buttons"
    }, /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      disabled: loading,
      loading: loading,
      onClick: this.handleFormSubmit
    }, "Save"), ' ', "|", ' ', /*#__PURE__*/React.createElement(Popconfirm, {
      title: "Are you sure to delete?",
      onConfirm: this.handleDelete,
      onCancel: () => {},
      okText: "Yes",
      cancelText: "No"
    }, /*#__PURE__*/React.createElement(Button, {
      danger: true,
      disabled: loading,
      loading: loading
    }, "Delete")), ' ', "|", ' ', /*#__PURE__*/React.createElement(Button, {
      type: "link",
      href: `/${this.context.dbName}/${this.context.tableName}/create`
    }, "Reset"), ' '));
  }
}
Form.propTypes = {
  rows: PropTypes.array,
  defaultValues: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func
};
Form.defaultProps = {
  rows: [],
  onSubmit: () => {},
  onDelete: () => {}
};
Form.contextType = PageContext;