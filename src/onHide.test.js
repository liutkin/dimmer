import onHide from './onHide';
import hooks from './hooks';

test('must be a function', () => {
  expect(typeof onHide).toBe('function');
});

test('must push name and function to onHide array in hooks object', () => {
  onHide('test', function() {});

  expect(hooks.onHide.length).toBe(1);
  expect(hooks.onHide[0].name).toBe('test');
  expect(typeof hooks.onHide[0].fn).toBe('function');
});
