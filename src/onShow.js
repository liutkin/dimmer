import hooks from './hooks';

export default (name, fn) => {
  hooks.onShow.push({
    name,
    fn,
  });
};
