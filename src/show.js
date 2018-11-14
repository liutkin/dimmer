import setPayload from './setPayload';
import setAutofocus from './setAutofocus';
import hooks from './hooks';

export default (name, payload, { dialogActiveBodyClass }) => {
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
