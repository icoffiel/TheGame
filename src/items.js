var PouchDB = require('pouchdb');

class Items {
  constructor() {
    this.db = new PouchDB('../items', { db: require('sqldown') });
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
}

module.exports = Items;
