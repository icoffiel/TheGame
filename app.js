var rp = require('request-promise');
var util = require('util');
var PouchDB = require('pouchdb');

var ATTACK_ITEMS = [

];

console.log('Starting DB');
var db = new PouchDB('items', { db: require('sqldown') });

console.log('Starting Loop');
getPoints();

function getPoints() {
  console.log('Points!');

  var points = {
    method: 'POST',
    uri: 'http://thegame.nerderylabs.com/points',
    headers: {
      'apikey': '82af0283-6a48-4398-82c0-4cbc0217dc66'
    },
    json: true
  };

  rp(points)
    .then(function(parsedBody) {
      console.log('Call Successful');
      console.log(util.inspect(parsedBody, false, null));
      if(parsedBody.Item !== null){
        console.log('Got Item!! ' + parsedBody.Item.Fields[0].Id);
        db.post(parsedBody.Item.Fields[0])
          .then(function(response) {
            console.log(response);
            setTimeout(getPoints, 2000);
          })
          .catch(function(err) {
            console.log(err);
          });
        // setTimeout(function() {
        //   useItem(parsedBody.Item.Fields[0].Id, parsedBody.Item.Fields[0].Name);
        // }, 2000);
      } else {
        setTimeout(getPoints, 2000);
      }
    })
    .catch(function(err) {
      console.log('Call Failed');
      console.log(err);
    });
}

function useItem(itemId, itemName) {
  var items = {
    method: 'POST',
    uri: 'http://thegame.nerderylabs.com/items/use/' + itemId,
    headers: {
      'apikey': '82af0283-6a48-4398-82c0-4cbc0217dc66'
    },
    json: true
  };

  console.log('Item!!');
  rp(items)
    .then(function(parsedBody) {
      console.log('Applied Item successfully!');
      console.log(util.inspect(parsedBody, false, null));
      setTimeout(getPoints, 2000);
    });
}
