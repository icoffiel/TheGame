var rp = require('request-promise');
var util = require('util');

var ATTACK_ITEMS = [

];

var points = {
  method: 'POST',
  uri: 'http://thegame.nerderylabs.com/points',
  headers: {
    'apikey': '***REMOVED***-***REMOVED***-***REMOVED***-***REMOVED***-***REMOVED***'
  },
  json: true
};

console.log('Starting Loop');
setTimeout(getPoints, 2000);

function getPoints() {
  console.log('Points!');
  rp(points)
    .then(function(parsedBody) {
      console.log('Call Successful');
      console.log(util.inspect(parsedBody, false, null));
      if(parsedBody.Item !== null){
        console.log('Got Item!! ' + parsedBody.Item.Fields[0].Id);

        setTimeout(function() {
          useItem(parsedBody.Item.Fields[0].Id, parsedBody.Item.Fields[0].Name);
        }, 2000);
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
      'apikey': '***REMOVED***-***REMOVED***-***REMOVED***-***REMOVED***-***REMOVED***'
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
