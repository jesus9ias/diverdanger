import canvas from './components/canvas';

export default (props) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return `<div>${canvas({ width, height })}</div>`;
}
