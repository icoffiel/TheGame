var rp = require('request-promise');
var util = require('util');

var points = {
  method: 'POST',
  uri: 'http://thegame.nerderylabs.com/points',
  headers: {
    'apikey': '82af0283-6a48-4398-82c0-4cbc0217dc66'
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
        console.log('Got Item!!' + parsedBody.Item.Fields[0].Id);

        var items = {
          method: 'POST',
          uri: 'http://thegame.nerderylabs.com/items/use/' + parsedBody.Item.Fields[0].Id,
          headers: {
            'apikey': '82af0283-6a48-4398-82c0-4cbc0217dc66'
          },
          json: true
        };

        console.log('Item!!');
        rp(items)
          .then(function() {
            console.log('Applied Item successfully!');
          });
      }
    })
    .catch(function(err) {
      console.log('Call Failed');
      console.log(err);
    })
    .finally(function() {
      setTimeout(getPoints, 2000);
    });
}
