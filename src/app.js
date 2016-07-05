let Points = require('./Points');
let LeaderBoard = require('./LeaderBoard');

class App {
  constructor() {
    this.points = new Points();
    this.leaderBoard = new LeaderBoard();
  }

  start() {
    this.points.getPointsRunner();
    this.leaderBoard.getLeaderBoardRunner();
  }
}

module.exports = App;
