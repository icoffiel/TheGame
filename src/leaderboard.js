var rp = require('request-promise');

class LeaderBoard {
  constructor() {
    this.leaderBoardOpts = {
      uri: 'http://thegame.nerderylabs.com',
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
        console.log('Retrieved leaderboard!');
        this._leaderBoard = parsedBody;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getLeaderBoardRunner() {
    this.retrieveLeaderBoard()
      .finally(() => {
        setTimeout(() => this.getLeaderBoardRunner(), 60000);
      });
  }

  getTarget() {
    // TODO Implement JVM filter
    if(this._leaderBoard) {
        return this._leaderBoard[0].PlayerName;
    } else {
      return null;
    }
  }
}

module.exports = LeaderBoard;
