let Points = require('./Points');

class App {
  constructor() {
  }

  start() {
    let points = new Points();
    points.getPoints();
  }
}

module.exports = App;
