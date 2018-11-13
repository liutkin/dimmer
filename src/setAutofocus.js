export default el => {
  const autoFocusEl = el.querySelector('[data-dialog-autofocus]');
  autoFocusEl && autoFocusEl.focus();
};
