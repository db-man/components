import * as constants from 'constants.js';
import ddRenderFnMapping from './ddRenderFnMapping';

export const getColumnRender = (column) => {
  // the column render function defined in Table component of antd
  // renderFn = (val, record, index) => ()
  let renderFn;

  if (column.type === constants.STRING_ARRAY) {
    // Default render func when "type:listPage" not defined in table column
    renderFn = (val) => val && val.join(', ');
  }

  if (column['type:listPage']) {
    if (typeof column['type:listPage'] === 'string') {
      const fn = ddRenderFnMapping[column['type:listPage']];
      if (fn) {
        renderFn = fn;
      }
    }
    /**
     * column def:
     * {
     *   "type:listPage": ["Link", "{{record.url}}"]
     * }
     */
    if (Array.isArray(column['type:listPage'])) {
      const [renderFnName] = column['type:listPage'];
      renderFn = (val, record, index) => ddRenderFnMapping[renderFnName](
        val,
        record,
        index,
        column['type:listPage'],
        column,
      );
    }
  }

  return renderFn;
};

export const getRenderResultByColumn = (value, record, index, args, column) => getColumnRender(column)(value, record, index); // eslint-disable-line max-len
