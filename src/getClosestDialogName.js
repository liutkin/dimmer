const getClosestDialogName = el =>
  el.getAttribute('data-dialog') || getClosestDialogName(el.parentNode);

export default getClosestDialogName;
