let Points = require('./Points');
let LeaderBoard = require('./LeaderBoard');
let Effects = require('./Effects');
let Items = require('./Items');
let Express = require('./server.js');

class App {
  constructor() {
    this.leaderBoard = new LeaderBoard();
    this.effects = new Effects();
    this.items = new Items(this.leaderBoard);
    this.points = new Points(this.items);
    this.server = new Express(this.items, this.leaderBoard, this.points);
  }

  start() {
    this.points.getPointsRunner();
    this.leaderBoard.getLeaderBoardRunner();
  }
}

module.exports = App;
