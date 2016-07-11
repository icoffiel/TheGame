var rp = require('request-promise');

class LeaderBoard {
  constructor() {
    this.leaderBoardOpts = {
      uri: 'http://thegame.nerderylabs.com:1337',
      headers: {
        'Accept': 'application/json'
      },
      timeout: 120000,
      json: true
    };

    this._leaderBoard = [];
  }

  get leaderBoard() {
    return this._leaderBoard;
  }

  retrieveLeaderBoard() {
    return rp.get(this.leaderBoardOpts)
      .then(parsedBody => {
        this._leaderBoard = parsedBody;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getLeaderBoardRunner() {
    this.retrieveLeaderBoard()
      .finally(() => {
        setTimeout(() => this.getLeaderBoardRunner(), 5000);
      });
  }

  getTarget() {
    // TODO Implement JVM filter
    if(this._leaderBoard.length > 0) {
        return this._leaderBoard[0].PlayerName;
    } else {
      return null;
    }
  }
}

module.exports = LeaderBoard;
