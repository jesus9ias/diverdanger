
export const renderComponent = (component) => {
  return component;
};

export const renderElement = (element, html) => {
  const el = document.getElementById(element);
  el.innerHTML = html;
};

export const addEvent = (element, event, func) => {
  element.addEventListener(event, func);
};
