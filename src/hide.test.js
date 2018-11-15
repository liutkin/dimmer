import hide from './hide';

const wrapperEl = document.createElement('div');
wrapperEl.setAttribute('data-dialog', 'test');
wrapperEl.classList.add('test');
wrapperEl.innerHTML = `
  <p>Some text</p>
  <div>
    <div id="test">Test element</div>
  </div>
`;

document.body.appendChild(wrapperEl);

test('must be a function', () => {
  expect(typeof hide).toBe('function');
});

test('must set display to none and remove "test" class from body', () => {
  hide('test', { dialogActiveBodyClass: 'test' });

  expect(wrapperEl.style.display).toBe('none');
  expect(document.body.classList.contains('test')).toBe(false);
  expect(document.body.classList.length).toBe(0);
});
