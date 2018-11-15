import onShow from './onShow';
import hooks from './hooks';

test('must be a function', () => {
  expect(typeof onShow).toBe('function');
});

test('must push name and function to onShow array in hooks object', () => {
  onShow('test', function() {});

  expect(hooks.onShow.length).toBe(1);
  expect(hooks.onShow[0].name).toBe('test');
  expect(typeof hooks.onShow[0].fn).toBe('function');
});
