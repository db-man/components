/**
 * Used when `type="STRING"`, and `type:createUpdatePage="RadioGroup"`.
 * Only used on create/update page.
 * To render some Radio components with given text, click one of the Radio to fill the text in input box.
 *
 * ```json
 * {
 *   "id": "vehicleType",
 *   "name": "Vehicle Type",
 *   "type": "STRING",
 *   "enum": ["car", "bike"]
 * }
 * ```
 */
type RadioGroupUiType = 'RadioGroup';
export type RadioGroupUiTypeEnum = string[];

type SimpleUiType = string | RadioGroupUiType;

type DynamicUiType = any; // TODO

export type UiType = SimpleUiType | DynamicUiType;

export type GetPageUiType = string;

/**
 * If is 'HIDE', the column will not be shown on the list page.
 */
export type ListPageUiType = string | 'HIDE';
