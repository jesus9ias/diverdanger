
const makeCallbacks = (callbacks) => {
  if (callbacks) {
    callbacks.map((callback) => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  }
};

export const renderComponent = (component) => {
  return component;
};

export const renderElement = (element, html, callbacks) => {
  const el = document.getElementById(element);
  el.innerHTML = html;
  makeCallbacks(callbacks);
};

export const addEvent = (element, event, func) => {
  element.addEventListener(event, func);
};

export const addRef = (element) => {
  const el = document.getElementById(element);
  window[element] = el;
  return el;
};

export const getRef = (element) => {
  return window[element] || null;
};
