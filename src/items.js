var PouchDB = require('pouchdb');
var util = require('util');

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
}

module.exports = Items;
