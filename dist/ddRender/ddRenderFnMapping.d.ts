/// <reference types="react" />
import { RowType } from '../types/Data';
import { RenderArgs } from '../types/UiType';
type DdRenderFnMappingType = Record<string, // render function name, e.g. "Link"
(val: any, record: RowType, index?: number, args?: RenderArgs, tplExtra?: any) => JSX.Element>;
/**
 * Data Driving Render Function Mapping
 */
declare const ddRenderFnMapping: DdRenderFnMappingType;
export default ddRenderFnMapping;
//# sourceMappingURL=ddRenderFnMapping.d.ts.map