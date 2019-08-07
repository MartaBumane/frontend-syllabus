class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static swapPoints(p1, p2) {
    let temp = p1;
    p1 = p2;
    p2 = temp;
  }
}

const p1 = new Point(5, 2);
const p2 = new Point(-3, 6);

Point.swapPoints(p1, p2);
