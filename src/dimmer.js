import init from './init';
import show from './show';
import hide from './hide';
import onShow from './onShow';
import onHide from './onHide';

export default function dimmer() {
  return {
    init,
    show,
    hide,
    onShow,
    onHide,
  };
}
