import hooks from '../src/hooks';

test('must be an object', () => {
  expect(typeof hooks).toBe('object');
});

test('object must have correct keys', () => {
  expect(hooks.onShow).toBeDefined();
  expect(hooks.onHide).toBeDefined();
});

test('each key must be an array', () => {
  expect(Array.isArray(hooks.onShow)).toBe(true);
  expect(Array.isArray(hooks.onHide)).toBe(true);
});
