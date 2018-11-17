import dimmer from '../src/dimmer';

test('must be a function', () => {
  expect(typeof dimmer).toBe('function');
});

test('must return an obejct', () => {
  expect(typeof dimmer()).toBe('object');
});

test('obejct must have correct keys', () => {
  expect(dimmer().init).toBeDefined();
  expect(dimmer().show).toBeDefined();
  expect(dimmer().hide).toBeDefined();
  expect(dimmer().onShow).toBeDefined();
  expect(dimmer().onHide).toBeDefined();
});
