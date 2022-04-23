import { getColumnRender } from './ddRender';

describe('getColumnRender', () => {
  test('should return proper value', () => {
    const view = getColumnRender({
      id: 'url',
      'type:listPage': 'ImageLink',
    });
    expect(view('https://a.com/b.jpg', { url: 'https://a.com/b.jpg' }, 1)).toMatchSnapshot();
  });

  test('should return proper value2', () => {
    const view = getColumnRender({
      id: 'yrl',
      'type:listPage': ['ImageLink', '{"url":"{{record.url}}","imgSrc":"{{record.url}}"}'],
    });
    expect(view('https://a.com/large/b.jpg', { url: 'https://a.com/large/b.jpg' })).toMatchSnapshot();
  });

  describe('given hidden column in a list page', () => {
    it('should return undefined render func', () => {
      const colFunc = getColumnRender({ 'type:listPage': 'HIDE' });
      expect(colFunc).toBe(undefined);
    });
  });
});

// describe('getRenderResultByColumn', () => {
//   test('should return proper value', () => {
//     const el = getRenderResultByColumn(
//       'foo',
//       { name: 'foo' },
//       0,
//       'HIDE',
//       { 'type:listPage': 'HIDE' },
//     );
//     expect(el).toMatchSnapshot();
//   });
// });
