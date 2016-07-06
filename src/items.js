var PouchDB = require('pouchdb');
var util = require('util');

const URL_USE_ITEMS = "http://thegame.nerderylabs.com/items/use/";

const ATTACK_ITEMS = [

]

class Items {
  constructor(leaderBoardUtil) {
    this.db = new PouchDB('../items', { db: require('sqldown') });
    this.getAllItems()
      .then(response => {
        console.log('Retrieved Items from the db');
        this._allItems = response;
      });

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

  useItem(itemId, target) {
    let url = `${URL_USE_ITEMS}${itemId}`;

    if(target){
      url += `?target=${target}`;
    }

    request.post({
      url,
      headers: {
        apiKey: '***REMOVED***-***REMOVED***-***REMOVED***-***REMOVED***-***REMOVED***'
      }
    })
    .then(response => {
      console.log(util.inspect(response, false, null));
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
