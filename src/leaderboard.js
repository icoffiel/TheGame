var rp = require('request-promise');

class LeaderBoard {
  constructor() {
    this.leaderBoardOpts = {
      uri: 'http://thegame.nerderylabs.com',
      headers: {
        'Accept': 'application/json'
      },
      json: true
    };

    this._leaderBoard = [];
  }

  get leaderBoard() {
    return this._leaderBoard;
  }

  set leaderBoard(newLeaderBoard) {
    this._leaderBoard = newLeaderBoard;
  }

  retrieveLeaderBoard() {
    return rp.get(this.leaderBoardOpts)
      .then(parsedBody => {
        console.log('Retrieved leaderboard!');
        this.leaderBoard = parsedBody;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getLeaderBoardRunner() {
    this.retrieveLeaderBoard()
      .finally(() => {
        setTimeout(() => this.getLeaderBoardRunner(), 30000);
      });
  }
}

module.exports = LeaderBoard;
