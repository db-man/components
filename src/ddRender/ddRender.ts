import * as constants from '../constants';
import DbColumn, { RenderKeyType } from '../types/DbColumn';
import { RowType } from '../types/Data';
import { RenderArgs } from '../types/UiType';
import ddRenderFnMapping from './ddRenderFnMapping';

// Default render func when "type:listPage" or "type:getPage" not defined in db table column
const defaultRenders = {
  [constants.NUMBER]: (val: number) => val,
  [constants.STRING]: (val: string) => val,
  [constants.STRING_ARRAY]: (val: string[]) => val && val.join(', '),
  [constants.BOOL]: (val: boolean) => (val === undefined ? '' : String(val)),
};

/**
 * @param {string|string[]} args e.g. "Link" or ["Link", "{{record.url}}"]
 * @param {Object} tplExtra
 */
export const getRender = (args: RenderArgs, tplExtra?: any) => {
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
    renderFn = (val: any, record: RowType, index?: number) =>
      ddRenderFnMapping[renderFnName](val, record, index, args, tplExtra);
  }

  return renderFn;
};

/**
 * column def:
 * {
 *   "type:listPage": ["Link", "{{record.url}}"]
 * }
 */
export const getColumnRender = (
  renderKey: RenderKeyType,
  column: DbColumn,
  tplExtra?: any
) => {
  const customRender = getRender(column[renderKey], tplExtra);
  if (customRender) {
    return customRender;
  }

  // the column render function defined in Table component of antd
  // renderFn = (val, record, index) => ()
  return defaultRenders[column.type || constants.STRING];
};

// export const getRenderResultByColumn = (
//   value: any,
//   record: RowType,
//   index: number,
//   args: RenderArgs,
//   column: Column
// ) => getColumnRender('type:listPage', column)(value, record, index);
