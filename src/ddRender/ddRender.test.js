import { getRender, getColumnRender } from './ddRender';

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

  describe('given Link', () => {
    it('should match snapshot', () => {
      expect((getColumnRender({ 'type:listPage': ['Link', '{"href":"{{record.url}}","text":"{{record.url}}"}'] }))('https://foo.com', { url: 'https://foo.com' })).toMatchSnapshot();
    });
  });

  describe('given hidden column in a list page', () => {
    it('should return default render func', () => {
      const colFunc = getColumnRender({ 'type:listPage': 'HIDE' });
      expect(colFunc('foo')).toBe('foo');
    });
  });
});

describe('getRender', () => {
  describe('given simple arg', () => {
    it('should render properly', () => {
      const args = 'Link';
      const record = { url: 'https://foo.com' };
      expect((getRender(args))(record.url, record)).toMatchSnapshot();
    });
  });
  describe('given tpl', () => {
    it('should render properly', () => {
      const args = ['Link', '{"href":"{{record.url}}","text":"{{record.url}}"}'];
      const record = { url: 'https://foo.com' };
      expect((getRender(args))(record.url, record)).toMatchSnapshot();
    });
  });
});
