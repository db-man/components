import * as constants from '../constants';
import ddRenderFnMapping from './ddRenderFnMapping';

// Default render func when "type:listPage" not defined in table column
const defaultRenders = {
  [constants.STRING]: (val) => val,
  [constants.STRING_ARRAY]: (val) => val && val.join(', '),
};

export const getRender = (args) => {
  // the column render function defined in Table component of antd
  // renderFn = (val, record, index) => ()
  let renderFn;

  if (!args) {
    return renderFn;
  }

  if (typeof args === 'string') {
    const fn = ddRenderFnMapping[args];
    if (fn) {
      renderFn = fn;
    }
  }

  if (Array.isArray(args)) {
    const [renderFnName] = args;
    renderFn = (val, record, index) => ddRenderFnMapping[renderFnName](
      val,
      record,
      index,
      args,
    );
  }

  return renderFn;
};

/**
 * column def:
 * {
 *   "type:listPage": ["Link", "{{record.url}}"]
 * }
 */
export const getColumnRender = (column) => {
  // the column render function defined in Table component of antd
  // renderFn = (val, record, index) => ()
  let renderFn = defaultRenders[column.type || constants.STRING];
  const customRender = getRender(column['type:listPage']);
  if (customRender) {
    renderFn = customRender;
  }

  return renderFn;
};

export const getRenderResultByColumn = (value, record, index, args, column) => getColumnRender(column)(value, record, index); // eslint-disable-line max-len
