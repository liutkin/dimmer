import defaultOptions from '../src/defaultOptions';

test('must be an object', () => {
  expect(typeof defaultOptions).toBe('object');
});

test('object must have correct keys', () => {
  expect(defaultOptions.dialogActiveBodyClass).toBeDefined();
});
