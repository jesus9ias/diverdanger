
class Bubble {
  constructor(name) {
    this.name = name;
    this.x = 0;
    this.y = 0;
  }

  getName() {
    return this.name;
  }

  move() {

  }
}

export default (bubbleName) => {
  return new Bubble(bubbleName);
};
