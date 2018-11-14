export default {
  text(el, payload) {
    console.log('text', el, payload);
    el.textContent = payload;
  },
  value(el, payload) {
    console.log('value', el, payload);
    el.value = payload;
  },
};
