var rp = require('request-promise');
var util = require('util');
var Items = require('./Items');
let config = require('../config/api');

const TIMEOUT = 1100;

class Points {

  constructor(items) {
    this.itemsUtil = items;
    this.playerDetails ={};
  }

  getPoints() {
    return rp.post({
      uri: 'http://thegame.nerderylabs.com:1337/points',
      headers: {
        'apikey': config.apiKey
      },
      timeout: 60000,
      json: true
    })
      .then(parsedBody => {
        console.log(util.inspect(parsedBody, false, null));
        this.playerDetails = parsedBody;
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
