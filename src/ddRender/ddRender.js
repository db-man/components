import ddRenderFnMapping from "ddRender/ddRenderFnMapping";

/**
 *
 * @param {*} args Data driven definitions
 * @param {*} value
 * @returns
 */
export const getRenderResultByColumn = (args, value, record) => {
  if (typeof args === "string") {
    const _fn = ddRenderFnMapping[args];
    if (_fn) {
      return _fn(value);
    }
  }
  /**
   * column def:
   * {
   *   "type:getPage": ["ImageLink", "{{record.url}}"]
   * }
   */
  if (Array.isArray(args)) {
    const [renderFnName] = args;
    return ddRenderFnMapping[renderFnName](value, record, 0, args);
  }

  return null;
};
