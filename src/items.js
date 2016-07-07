var PouchDB = require('pouchdb');
var util = require('util');
var rp = require('request-promise');

const URL_USE_ITEMS = "http://thegame.nerderylabs.com/items/use/";

const ATTACK_ITEMS = [

];

class Items {
  constructor(leaderBoardUtil) {
    this.db = new PouchDB('../items', { db: require('sqldown') });
    this._allItems = [];

    this.leaderBoard = leaderBoardUtil;

    this.getAllItemsRunner();
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

  getAllItemsRunner() {
    this.getAllItems()
    .then(response => {
      this._allItems = response;
      setTimeout(() => this.getAllItemsRunner(), 2000);
    })
    .catch((err) => {
      console.log(err);
      setTimeout(() => this.getAllItemsRunner(), 2000);
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
        apiKey: '82af0283-6a48-4398-82c0-4cbc0217dc66'
      }
    })
    .then(response => {
      console.log(util.inspect(response, false, null));
      this.deleteItem(docId);
    })
    .catch(err => {
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
