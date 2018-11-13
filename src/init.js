import defaultOptions from './defaultOptions';
import getDialogOpenTriggers from './getDialogOpenTriggers';
import getDialogCloseTriggers from './getDialogCloseTriggers';
import getClosestDialogName from './getClosestDialogName';
import getPayload from './getPayload';
import show from './show';
import hide from './hide';

export default (userOptions = {}) => {
  const options = { ...defaultOptions, ...userOptions };

  getDialogOpenTriggers().forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const dialogName = this.getAttribute('data-dialog-open');
      const payload = this.getAttribute('data-dialog-payload');
      const dialogPayload = getPayload(payload) || [];

      show(dialogName, dialogPayload, options);
    });
  });

  getDialogCloseTriggers().forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const dialogName = getClosestDialogName(this);

      hide(dialogName, options);
    });
  });
};
