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
});
