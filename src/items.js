var PouchDB = require('pouchdb');
var util = require('util');

const URL_USE_ITEMS = "http://thegame.nerderylabs.com/items/use/";

class Items {
  constructor() {
    this.db = new PouchDB('../items', { db: require('sqldown') });
    console.log('Here!');
    this.getAllItems()
      .then(response => {
        console.log(util.inspect(response, false, null));
      });
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
}

module.exports = Items;
