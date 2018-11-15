import hooks from './hooks';

export default (name, { dialogActiveBodyClass }) => {
  const dialogElement = document.querySelector(`[data-dialog="${name}"]`);
  dialogActiveBodyClass &&
    document.body.classList.remove(dialogActiveBodyClass);
  dialogElement.style.display = 'none';

  hooks.onHide
    .filter(item => name === item.name)
    .forEach(item => item.fn(dialogElement));
};
