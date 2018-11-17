import setPayload from '../src/setPayload';

test('must update text content of element', () => {
  const el = document.createElement('div');

  setPayload.text(el, 'test');
  expect(el.textContent).toBe('test');
});

test('must update value of input element', () => {
  const el = document.createElement('input');

  setPayload.value(el, 'test');
  expect(el.value).toBe('test');
});
