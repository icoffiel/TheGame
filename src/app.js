let Points = require('./Points');
let LeaderBoard = require('./LeaderBoard');
let Effects = require('./Effects');
let Items = require('./Items');

// TODO Implement a FE

class App {
  constructor() {
    this.points = new Points();
    this.leaderBoard = new LeaderBoard();
    this.effects = new Effects();
    this.items = new Items(this.leaderBoard);
  }

  start() {
    this.points.getPointsRunner();
    this.leaderBoard.getLeaderBoardRunner();
    //this.effects.getEffectsRunner();
    this.items.getUseItemRunner();
  }
}

module.exports = App;
