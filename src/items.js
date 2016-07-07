var PouchDB = require('pouchdb');
var util = require('util');
var rp = require('request-promise');
let config = require('../config/api');

const URL_USE_ITEMS = "http://thegame.nerderylabs.com/items/use/";

const ATTACK_ITEMS = [

];

class Items {
  constructor(leaderBoardUtil) {
    this.db = new PouchDB('./db/items.db', { db: require('sqldown') });

    this.leaderBoard = leaderBoardUtil;
  }

  saveItem(item) {
    this.db.post(item)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAllItems() {
    return this.db.allDocs({
      include_docs: true
    });
  }

  useItem(docId, itemId, target) {
    console.log(`Trying to use ${itemId} on ${target}. Document ID is ${docId}`);
    let url = `${URL_USE_ITEMS}${itemId}`;

    if(target){
      url += `?target=${target}`;
    }

    rp.post({
      uri: url,
      headers: {
        apiKey: config.apiKey
      }
    })
    .then(response => {
      console.log('Used item successfully');
      console.log(util.inspect(response, false, null));
      this.deleteItem(docId);
    })
    .catch(err => {
      console.log('there was an error trying to use item');
      console.log(err);
    });
  }

  deleteItem(docId) {
    this.db.get(docId)
    .then(doc => {
      return this.db.remove(doc);
    })
    .then(result => {
      console.log(`Deleted ${docId} successfully`);
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

  getUseItemRunner() {
    // TODO Only automate lower level items?
    setTimeout(() => {
      console.log(this._allItems.rows.shift().doc.Name);
      console.log(this.leaderBoard.getTarget());
    }, 1000);
  }
}

module.exports = Items;
