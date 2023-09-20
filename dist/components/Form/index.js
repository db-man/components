import React, { useEffect, useContext, useState } from 'react';
// import PropTypes from 'prop-types';
import { Select, Button, message, Row, Col, Tabs, Popconfirm, InputNumber, Switch } from 'antd';
import StringFormField from '../StringFormField';
import RadioGroupFormField from '../RadioGroupFormField';
import JsonEditor from '../JsonEditor';
import RefTableLink from '../RefTableLink';
import PageContext from '../../contexts/page';
import MultiLineInputBox from '../MultiLineInputBox';
import * as constants from '../../constants';
import TextAreaFormField from '../TextAreaFormField';
import { validatePrimaryKey, isType, obj2str, str2obj, getFormInitialValues } from './helpers';
import FieldWrapperForCreateUpdatePage from '../FieldWrapperForCreateUpdatePage';
import PresetsButtons from '../PresetsButtons';
import { useAppContext } from '../../contexts/AppContext';
const renderFormFieldWrapper = ({
  id,
  label,
  formField
}) => /*#__PURE__*/React.createElement("div", {
  key: id,
  className: "dm-form-field dm-string-form-field"
}, /*#__PURE__*/React.createElement("b", null, label), ": ", formField);
const filterOutHiddenFields = column => column['type:createUpdatePage'] !== 'HIDE';
const Form = props => {
  const context = useContext(PageContext);
  const {
    dbs
  } = useAppContext();
  const [formValues, setFormValues] = useState({
    ...props.defaultValues
  });
  const [jsonStr, setJsonStr] = useState(obj2str({
    ...props.defaultValues
  }));
  useEffect(() => {
    const initFormValues = getFormInitialValues(context.columns, formValues);
    setFormValues(prevFormValues => ({
      ...prevFormValues,
      ...initFormValues
    }));
    setJsonStr(prevJsonStr => {
      const prevJsonObj = str2obj(prevJsonStr);
      return obj2str({
        ...prevJsonObj,
        ...initFormValues
      });
    });
  }, []);
  const changeBothFormAndJsonEditor = newFormValues => {
    setFormValues(newFormValues);
    setJsonStr(obj2str(newFormValues));
  };
  const handleChange = key => value => {
    changeBothFormAndJsonEditor({
      ...formValues,
      [key]: value
    });
  };
  const handleInputChange = key => val => {
    // if key is primary key, check if has space
    if (key === context.primaryKey && val.includes(' ')) {
      message.error('Primary key cannot contain space');
    }
    changeBothFormAndJsonEditor({
      ...formValues,
      [key]: val
    });
    // When mode is split-table, thats because table file too big.
    // Will not download big table file, so no checking about duplicated item.
    if (!isSplitTable()) {
      // validate the primary field in form, e.g. duplication check
      // TODO maybe do this in antd Form component
      // TODO why do we assume the type of primary column in a table is always `string`?
      if (key === context.primaryKey) {
        if (!validatePrimaryKey(val, props.rows, context.primaryKey)) {
          warnPrimaryKeyInvalid(val);
        }
      }
    }
  };

  /**
   * @param {string} id Column name
   * @param {string[]} value Cell value
   */
  const handleStringArrayChange = id => value => changeBothFormAndJsonEditor({
    ...formValues,
    [id]: value
  });
  const handleKeyDown = event => {
    if (event.code === 'KeyS' && event.metaKey) {
      event.preventDefault();
      handleFormSubmit();
    }
  };
  const handleFormSubmit = () => {
    props.onSubmit(formValues);
  };
  const handleDelete = () => {
    props.onDelete(formValues);
  };
  const isSplitTable = () => {
    const {
      appModes
    } = context;
    return appModes.indexOf('split-table') !== -1;
  };
  const warnPrimaryKeyInvalid = value => message.warning( /*#__PURE__*/React.createElement("div", null, "Found duplicated item in db", ' ', /*#__PURE__*/React.createElement("a", {
    href: `/${context.dbName}/${context.tableName}/update?${context.primaryKey}=${value}`
  }, value)), 10);
  const renderStringFormField = column => {
    const {
      loading
    } = props;
    const value = formValues[column.id];
    if (column['type:createUpdatePage'] === 'TextArea') {
      return /*#__PURE__*/React.createElement(TextAreaFormField, {
        key: column.id,
        label: column.name,
        rows: 2,
        disabled: loading,
        value: value,
        onChange: handleChange(column.id)
      });
    }
    if (column['type:createUpdatePage'] === 'RadioGroup') {
      const radioValue = value || column?.enum?.[0];
      return renderFormFieldWrapper({
        id: column.id,
        label: column.name,
        formField: /*#__PURE__*/React.createElement(RadioGroupFormField, {
          column: column,
          disabled: loading,
          value: radioValue,
          onChange: handleChange(column.id)
        })
      });
    }
    let preview = false;
    if (column['type:createUpdatePage'] === 'WithPreview') {
      preview = true;
    }
    return /*#__PURE__*/React.createElement(StringFormField, {
      key: column.id,
      inputProps: {
        disabled: loading,
        autoFocus: column.id === context.primaryKey,
        onKeyDown: handleKeyDown,
        placeholder: column.placeholder
      },
      preview: preview,
      label: column.name,
      dbName: context.dbName,
      primaryKey: context.primaryKey,
      column: column,
      value: value,
      onChange: handleInputChange(column.id)
    });
  };
  const renderStringArrayFormField = column => {
    if (!column['type:createUpdatePage'] || column['type:createUpdatePage'] === 'Select') {
      return /*#__PURE__*/React.createElement("div", {
        key: column.id,
        className: "dm-form-field dm-string-array-form-field"
      }, /*#__PURE__*/React.createElement("b", null, column.name), ":", ' ', /*#__PURE__*/React.createElement(PresetsButtons, {
        column: column,
        onChange: val => {
          handleStringArrayChange(column.id)([...(formValues[column.id] || []), val]);
        }
      }), ' ', /*#__PURE__*/React.createElement(Select, {
        size: "small",
        mode: "tags",
        style: {
          width: '100%'
        },
        disabled: props.loading,
        value: formValues[column.id],
        onChange: handleStringArrayChange(column.id),
        onKeyDown: handleKeyDown
      }));
    }
    const {
      is: isMultipleInputs,
      preview: isMultipleInputsWithPreview
    } = isType(column, 'MultiLineInputBox');
    if (isMultipleInputs) {
      if (isMultipleInputsWithPreview) {
        return /*#__PURE__*/React.createElement(FieldWrapperForCreateUpdatePage, {
          key: column.id,
          column: column
        }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
          span: 12
        }, /*#__PURE__*/React.createElement(MultiLineInputBox, {
          rows: 2,
          disabled: props.loading,
          value: formValues[column.id],
          onChange: handleStringArrayChange(column.id)
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
        dbName: context.dbName,
        tables: dbs[context.dbName],
        value: formValues[column.id],
        column: column
      }), /*#__PURE__*/React.createElement(MultiLineInputBox, {
        disabled: props.loading,
        value: formValues[column.id],
        onChange: handleStringArrayChange(column.id)
      }));
    }
    return null;
  };
  const renderNumberFormField = column => {
    const {
      loading
    } = props;
    return renderFormFieldWrapper({
      id: column.id,
      label: column.name,
      formField: /*#__PURE__*/React.createElement(InputNumber, {
        size: "small",
        disabled: loading,
        autoFocus: column.id === context.primaryKey,
        value: formValues[column.id],
        onChange: handleChange(column.id),
        onKeyDown: handleKeyDown
      })
    });
  };
  const renderBoolFormField = column => renderFormFieldWrapper({
    id: column.id,
    label: column.name,
    formField: /*#__PURE__*/React.createElement(Switch, {
      size: "small",
      disabled: props.loading,
      checked: formValues[column.id],
      onChange: handleChange(column.id)
    })
  });
  const fieldRender = column => {
    switch (column.type) {
      case constants.STRING_ARRAY:
        return renderStringArrayFormField(column);
      case constants.NUMBER:
        return renderNumberFormField(column);
      case constants.BOOL:
        return renderBoolFormField(column);
      case constants.STRING:
      default:
        return renderStringFormField(column);
    }
  };
  const {
    loading
  } = props;
  const tabsItems = [{
    label: 'Form',
    key: 'form',
    children: /*#__PURE__*/React.createElement("div", {
      className: "dm-form"
    }, context.columns.filter(filterOutHiddenFields).map(fieldRender))
  }, {
    label: 'JSON',
    key: 'json',
    children: /*#__PURE__*/React.createElement(JsonEditor, {
      value: jsonStr,
      onChange: setJsonStr,
      onFormValueChange: setFormValues,
      onSave: () => {
        handleFormSubmit();
      }
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
    onClick: handleFormSubmit
  }, "Save"), ' ', "|", ' ', /*#__PURE__*/React.createElement(Popconfirm, {
    title: "Are you sure to delete?",
    onConfirm: handleDelete,
    onCancel: () => {},
    okText: "Yes",
    cancelText: "No"
  }, /*#__PURE__*/React.createElement(Button, {
    danger: true,
    disabled: loading,
    loading: loading
  }, "Delete")), ' ', "|", ' ', /*#__PURE__*/React.createElement(Button, {
    type: "link",
    href: `/${context.dbName}/${context.tableName}/create`
  }, "Reset"), ' '));
};

// Form.propTypes = {
//   rows: PropTypes.array,
//   defaultValues: PropTypes.object.isRequired,
//   loading: PropTypes.bool.isRequired,
//   onSubmit: PropTypes.func,
//   onDelete: PropTypes.func,
// };

Form.defaultProps = {
  rows: [],
  onSubmit: () => {},
  onDelete: () => {}
};
export default Form;
//# sourceMappingURL=index.js.map