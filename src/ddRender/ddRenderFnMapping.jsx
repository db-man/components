import React from 'react';
/**
 * https://github.com/handlebars-lang/handlebars.js/issues/1174
 * ```
 * Compiled with problems:
 * ERROR in ./node_modules/handlebars/lib/index.js 15:11-24
 * Module not found: Error: Can't resolve 'fs' in '/.../node_modules/handlebars/lib'
 * ```
 */
// import Handlebars from "handlebars";
import Handlebars from 'handlebars/dist/handlebars';

import {
  ImageLink, ImageLinks, Link, Links, Fragment,
} from 'components/Links';
import ErrorAlert from 'components/ErrorAlert';

/**
 * tpl: {{#replace "foo" "bar"}}{{title}}{{/replace}}
 * input: {title:"foo"}
 * output: bar
 */
Handlebars.registerHelper('replace', function replaceHelper(find, replace, options) {
  const string = options.fn(this);
  return string.replace(find, replace);
});

/**
 * tpl: {{join record.tags ", "}}
 * input: {"tags": ["foo", "bar"]}
 * output: "foo, bar"
 */
Handlebars.registerHelper('join', (arr, sep) => {
  if (!arr) return '';
  return arr.join(sep);
});

const ddComponent = (Component) => function dComponent(val, record, index, args /* , col */) {
  if (!args || !args[1]) {
    return <Component>{val}</Component>;
  }

  const tplStr = args[1];
  const tpl = Handlebars.compile(tplStr);
  const json = tpl({ record });
  try {
    // {foo:'bar'} <= "{\"foo\":\"bar\"}"
    // "foo" <= "\"foo\""
    const props = JSON.parse(json);
    if (typeof props === 'string') {
      return <Component>{props}</Component>;
    }
    return <Component {...props} />; // eslint-disable-line react/jsx-props-no-spreading
  } catch (err) {
    console.error('Failed to parse JSON for tpl, err:', err, json); // eslint-disable-line no-console
    return (
      <div>
        val:
        {' '}
        {val}
        <ErrorAlert json={json} error={err} tplStr={tplStr} record={record} />
      </div>
    );
  }
};

/**
 * Data Driving Render Function Mapping
 */
const ddRenderFnMapping = {
  // renderFnName: (cellVal, rowVal, colIndex, ...renderFnStr) => null
  // renderFnName: (cellVal, rowVal, colIndex, ...renderFnProps) => null

  /**
   * @param {number|string} val e.g. "docs"
   * @param {Object} record e.g. `{"org":"github","repo":"docs"}`
   * @param {number} index e.g. 9, it's the 10th row
   * @param {Object|undefined} args e.g `["Link", "{\"href\":\"https://github.com/{{record.org}}/{{record.repo}}\",\"text\":\"{{record.repo}}\"}"]`
   *                                args could be undefined when column is {"type:listPage": "Link"}
   *  Usage:
   * 1. "type:getPage": ["Link", "{\"href\":\"https://github.com/{{record.org}}/{{record.repo}}\",\"text\":\"{{record.repo}}\"}"],
   * 2. "type:listPage": ["Link", "{\"href\":\"https://github.com/{{record.org}}/{{record.repo}}\",\"text\":\"{{record.repo}}\"}"]
   * 3. "type:listPage": "Link"
   */
  Link: ddComponent(Link),
  /**
   * Usage:
   * ```json
   * {"type:listPage": ["ImageLink",
   *   "{\"url\":\"{{record.url}}\",\"imgSrc\":\"{{record.url}}_th.jpg\",
   *     \"tags\":\"{{record.tags}}\"}"
   * ]}
   * ```
   * Issues:
   *   When record.url="https://foo.com/get?foo=bar".
   *   By using `{{record.url}}` will generate "https://foo.com/get?foo&#x3D;bar".
   *   To prevent this issue, `{{{record.url}}}` could be used. (https://handlebarsjs.com/guide/expressions.html#html-escaping)
   */
  ImageLink: ddComponent(ImageLink),
  ImageLinks: ddComponent(ImageLinks),
  /**
   * Usage:
   * ```json
   * {"type:listPage": ["Fragment", "{{join record.tags \", \"}}"]}
   * ```
   */
  Fragment: ddComponent(Fragment),
  Links: ddComponent(Links),
};

export default ddRenderFnMapping;
