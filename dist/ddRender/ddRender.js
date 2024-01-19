import * as constants from '../constants';
import ddRenderFnMapping from './ddRenderFnMapping';

// Default render func when "type:listPage" or "type:getPage" not defined in db table column
const defaultRendersForListPage = {
  [constants.NUMBER]: val => val,
  [constants.STRING]: val => val,
  [constants.STRING_ARRAY]: val => val && val.join(', '),
  [constants.BOOL]: val => val === undefined ? '' : String(val)
};
const defaultRendersForGetPage = {
  [constants.NUMBER]: val => val === undefined ? 'NO_VALUE' : String(val),
  [constants.STRING]: val => val === undefined ? 'NO_VALUE' : val,
  [constants.STRING_ARRAY]: val => val === undefined ? 'NO_VALUE' : val && val.join(', '),
  [constants.BOOL]: val => val === undefined ? 'NO_VALUE' : String(val)
};

/**
 * @param {string|string[]} args e.g. "Link" or ["Link", "{{record.url}}"]
 * @param {Object} tplExtra
 */
export const getRender = (args, tplExtra) => {
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
    renderFn = (val, record, index) => ddRenderFnMapping[renderFnName](val, record, index, args, tplExtra);
  }
  return renderFn;
};
/**
 * column def:
 * {
 *   "type:listPage": ["Link", "{{record.url}}"]
 * }
 */
export const getColumnRender = (renderKey, column, tplExtra) => {
  // should only used for "type:listPage" or "type:getPage"
  if (!renderKey || [constants.TYPE_LIST_PAGE, constants.TYPE_GET_PAGE].indexOf(renderKey) < 0) {
    console.error('getColumnRender: invalid renderKey', renderKey);
  }
  const customRender = getRender(column[renderKey], tplExtra);
  if (customRender) {
    return customRender;
  }
  if (renderKey === constants.TYPE_GET_PAGE) {
    return defaultRendersForGetPage[column.type || constants.STRING];
  }

  // the column render function defined in Table component of antd
  // renderFn = (val, record, index) => ()
  return defaultRendersForListPage[column.type || constants.STRING];
};

// export const getRenderResultByColumn = (
//   value: any,
//   record: RowType,
//   index: number,
//   args: RenderArgs,
//   column: Column
// ) => getColumnRender(constants.TYPE_LIST_PAGE, column)(value, record, index);
//# sourceMappingURL=ddRender.js.map