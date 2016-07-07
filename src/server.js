let express = require('express');
let bodyParser = require('body-parser');

class GameServer {
  constructor(gameItems, leaderboard) {
    this.app = express();
    // Allow bopdy parsing
    // this.app.use(bodyParser.urlencoded({ extended: false }));
    this.jsonParser = bodyParser.json();

    // Setup the routes for the server
    this.routes();

    // Start server
    this.startServer();

    // Setup external references
    this.items = gameItems;
    this.leaderboard = leaderboard;
  }

  routes() {
    this.app.use(express.static(__dirname + '/webapp'));
    this.app.get('/', (req, res) => {
      res.redirect('/index.html');
    });
    this.app.get('/api/items', (req, res) => {
      res.send(this.items._allItems);
    });
    this.app.get('/api/leaderboard', (req, res) => {
      res.send(this.leaderboard._leaderBoard);
    });
    this.app.delete('/api/items/:itemId', this.jsonParser, (req, res) => {
      let itemId = req.params.itemId;
      let docId = req.body.docId;
      let target = req.body.target;
      this.items.useItem(docId, itemId, target);
      res.send({itemId: itemId, target: target});
    });
  }

  startServer() {
    let server = this.app.listen(8081, () => {
      console.log(`Server Running on port ${server.address().port}`);
    });
  }
}

module.exports = GameServer;
