/**
 * Check duplicated primary key
 * For example, if `id` is primary key, then there should not be two id=1 record in table
 */
export const validatePrimaryKey = (value, content, primaryKey) => {
  const found = content.find(item => item[primaryKey] === value);
  if (found) {
    return false;
  }
  return true;
};

/**
 * @param {*} column
 * @param {string} uiType e.g. "MultiLineInputBox"
 * @returns {is:bool,preview:bool}
 */
export const isType = (column, uiType) => {
  // type="MultiLineInputBox"
  // type=["MultiLineInputBox"]
  // type=["MultiLineInputBox", "WithPreview"]
  const type = column['type:createUpdatePage'];
  if (Array.isArray(type)) {
    const is = type[0] === uiType;
    const preview = type[1] === 'WithPreview';
    return {
      is,
      preview
    };
  }
  const is = column['type:createUpdatePage'] === uiType;
  return {
    is,
    preview: false
  };
};
export const obj2str = obj => JSON.stringify(obj, null, '  ');
export const str2obj = str => JSON.parse(str);
export const getFormInitialValues = (columns, formValues) => {
  const initFormValues = {};
  // Initialize form values with default values defined in table schema when form values are empty
  columns.forEach(col => {
    if (!formValues[col.id]) {
      let defaultValue = '';
      switch (col['type:createUpdatePage']) {
        case 'RadioGroup':
          [defaultValue] = col.enum;
          break;
        default:
          defaultValue = '';
      }
      if (defaultValue) {
        initFormValues[col.id] = defaultValue;
      }
    }
  });
  return initFormValues;
};
//# sourceMappingURL=helpers.js.map