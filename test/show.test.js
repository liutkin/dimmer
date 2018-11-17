import show from '../src/show';

const wrapperEl = document.createElement('div');
wrapperEl.style.display = 'none';
wrapperEl.setAttribute('data-dialog', 'test');
wrapperEl.innerHTML = `
  <p>Some text</p>
  <div>
    <div id="test">Test element</div>
  </div>
`;

document.body.appendChild(wrapperEl);

test('must be a function', () => {
  expect(typeof show).toBe('function');
});

test('must set display to block and not add class to body', () => {
  show('test', [], { dialogActiveBodyClass: false });

  expect(wrapperEl.style.display).toBe('block');
  expect(document.body.classList.length).toBe(0);
});

test('must add "test" class to body', () => {
  show('test', [], { dialogActiveBodyClass: 'test' });

  expect(document.body.classList.contains('test')).toBe(true);
  expect(document.body.classList.length).toBe(1);
});
