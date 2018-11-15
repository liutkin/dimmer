(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.dimmer = factory());
}(this, (function () { 'use strict';

  var defaultOptions = {
    dialogActiveBodyClass: false
  };

  var getClosestDialogName = function getClosestDialogName(el) {
    return el.getAttribute('data-dialog') || getClosestDialogName(el.parentNode);
  };

  var getPayload = (function (payload) {
    try {
      return JSON.parse(payload);
    } catch (err) {
      console.error('[Dimmer Dialog] Unable to parse JSON payload');
      return null;
    }
  });

  var setPayload = {
    text: function text(el, payload) {
      el.textContent = payload;
    },
    value: function value(el, payload) {
      el.value = payload;
    }
  };

  var setAutofocus = (function (el) {
    var autoFocusEl = el.querySelector('[data-dialog-autofocus]');
    autoFocusEl && autoFocusEl.focus();
  });

  var hooks = {
    onShow: [],
    onHide: []
  };

  var show = (function (name, payload, _ref) {
    var dialogActiveBodyClass = _ref.dialogActiveBodyClass;

    var dialogElement = document.querySelector('[data-dialog="' + name + '"]');
    dialogActiveBodyClass && document.body.classList.add(dialogActiveBodyClass);
    dialogElement.style.display = 'block';

    payload.forEach(function (item) {
      var field = item.field,
          type = item.type,
          payload = item.payload;

      var el = dialogElement.querySelector('[data-dialog-field=\'' + field + '\']');

      try {
        setPayload[type](el, payload);
      } catch (err) {
        console.error('[Dimmer dialog] Unable to properly set payloads');
      }
    });

    hooks.onShow.filter(function (item) {
      return name === item.name;
    }).forEach(function (item) {
      return item.fn(dialogElement);
    });

    setAutofocus(dialogElement);
  });

  var hide = (function (name, _ref) {
    var dialogActiveBodyClass = _ref.dialogActiveBodyClass;

    var dialogElement = document.querySelector('[data-dialog="' + name + '"]');
    dialogActiveBodyClass && document.body.classList.remove(dialogActiveBodyClass);
    dialogElement.style.display = 'none';

    hooks.onHide.filter(function (item) {
      return name === item.name;
    }).forEach(function (item) {
      return item.fn(dialogElement);
    });
  });

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var init = (function () {
    var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var options = _extends({}, defaultOptions, userOptions);

    document.querySelectorAll('[data-dialog-open]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var dialogName = this.getAttribute('data-dialog-open');
        var payload = this.getAttribute('data-dialog-payload');
        var dialogPayload = getPayload(payload) || [];

        show(dialogName, dialogPayload, options);
      });
    });

    document.querySelectorAll('[data-dialog-close]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        var dialogName = getClosestDialogName(this);

        hide(dialogName, options);
      });
    });
  });

  var onShow = (function (name, fn) {
    hooks.onShow.push({
      name: name,
      fn: fn
    });
  });

  var onHide = (function (name, fn) {
    hooks.onHide.push({
      name: name,
      fn: fn
    });
  });

  function dimmer() {
    return {
      init: init,
      show: show,
      hide: hide,
      onShow: onShow,
      onHide: onHide
    };
  }

  return dimmer;

})));
