var defaultOptions = {
  dialogActiveBodyClass: false,
};

var getDialogOpenTriggers = () => document.querySelectorAll('[data-dialog-open]');

var getDialogCloseTriggers = () => document.querySelectorAll('[data-dialog-close]');

const getClosestDialogName = el =>
  el.getAttribute('data-dialog') || getClosestDialogName(el.parentNode);

var getPayload = payload => {
  try {
    return JSON.parse(payload);
  } catch (err) {
    console.error('[Dimmer Dialog] Unable to parse JSON payload');
    return null;
  }
};

var setPayload = {
  text(el, payload) {
    console.log('text', el, payload);
    el.textContent = payload;
  },
  value(el, payload) {
    console.log('value', el, payload);
    el.value = payload;
  },
};

var setAutofocus = el => {
  const autoFocusEl = el.querySelector('[data-dialog-autofocus]');
  autoFocusEl && autoFocusEl.focus();
};

var hooks = {
  onShow: [],
  onHide: [],
};

var show = (name, payload, { dialogActiveBodyClass }) => {
  const dialogElement = document.querySelector(`[data-dialog="${name}"]`);
  dialogActiveBodyClass && document.body.classList.add(dialogActiveBodyClass);
  dialogElement.style.display = 'block';

  payload.forEach(item => {
    const { field, type, payload } = item;
    const el = dialogElement.querySelector(`[data-dialog-field='${field}']`);

    try {
      setPayload[type](el, payload);
    } catch (err) {
      console.error('[Dimmer dialog] Unable to properly set payloads');
    }
  });

  hooks.onShow
    .filter(item => name === item.name)
    .forEach(item => item.fn(dialogElement));

  setAutofocus(dialogElement);
};

var hide = (name, { dialogActiveBodyClass }) => {
  const dialogElement = document.querySelector(`[data-dialog="${name}"]`);
  document.body.classList.remove(dialogActiveBodyClass);
  dialogElement.style.display = 'none';

  hooks.onHide
    .filter(item => name === item.name)
    .forEach(item => item.fn(dialogElement));
};

var init = (userOptions = {}) => {
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

var onShow = (name, fn) => {
  hooks.onShow.push({
    name,
    fn,
  });
};

var onHide = (name, fn) => {
  hooks.onHide.push({
    name,
    fn,
  });
};

function dimmer() {
  return {
    init,
    show,
    hide,
    onShow,
    onHide,
  };
}

export default dimmer;
