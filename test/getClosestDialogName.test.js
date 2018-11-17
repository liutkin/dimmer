import getClosestDialogName from '../src/getClosestDialogName';

test('must return closest parent dialog name', () => {
  const wrapperEl = document.createElement('div');
  wrapperEl.innerHTML = `
    <div data-dialog="info">
      <p>Some text</p>
      <div>
        <div id="test">Test element</div>
      </div>
    </div>
  `;

  const testEl = wrapperEl.querySelector('#test');

  expect(getClosestDialogName(testEl)).toBe('info');
});
