var rp = require('request-promise');
var util = require('util');
var Items = require('./Items');

const TIMEOUT = 1000;

class Points {

  constructor() {
    this.itemsUtil = new Items();
    this.points = {
      method: 'POST',
      uri: 'http://thegame.nerderylabs.com/points',
      headers: {
        'apikey': '82af0283-6a48-4398-82c0-4cbc0217dc66'
      },
      json: true
    };
  }

  getPoints() {
    return rp(this.points)
      .then(parsedBody => {
        console.log(util.inspect(parsedBody, false, null));
        if(parsedBody.Item !== null){
          return parsedBody.Item.Fields[0];
        }
      })
      .then(item => {
        if (item) {
          this.itemsUtil.saveItem(item);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  getPointsRunner() {
    this.getPoints()
      .finally(() => {
        setTimeout(() => this.getPointsRunner(), TIMEOUT);
      });
  }

}

module.exports = Points;
