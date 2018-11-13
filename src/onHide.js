import hooks from './hooks';

export default (name, fn) => {
  hooks.onHide.push({
    name,
    fn,
  });
};
