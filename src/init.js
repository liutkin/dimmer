import defaultOptions from './defaultOptions';
import getClosestDialogName from './getClosestDialogName';
import getPayload from './getPayload';
import show from './show';
import hide from './hide';

export default (userOptions = {}) => {
  const options = { ...defaultOptions, ...userOptions };

  document.querySelectorAll('[data-dialog-open]').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const dialogName = this.getAttribute('data-dialog-open');
      const payload = this.getAttribute('data-dialog-payload');
      const dialogPayload = getPayload(payload) || [];

      show(dialogName, dialogPayload, options);
    });
  });

  document.querySelectorAll('[data-dialog-close]').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const dialogName = getClosestDialogName(this);

      hide(dialogName, options);
    });
  });
};
