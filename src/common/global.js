
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
