class PlayerController {
  constructor($http) {
    this.$http = $http;
    this.playerDetails = {};

    this.getPlayerDetailsPoller();
  }

  getPlayerDetails() {
    return this.$http.get('/api/player')
      .success((data) => {
        this.playerDetails = data;
      })
      .error((err) => {
        console.log(err);
      });
  }

  getPlayerDetailsPoller() {
    this.getPlayerDetails()
    .finally(() => {
      setTimeout(() => this.getPlayerDetailsPoller(), 5000);
    });
  }
}

PlayerController.$inject = [
  '$http'
];

ngameApp.component('playerComponent', {
  templateUrl: 'js/app/player/player.html',
  controller: PlayerController,
  controllerAs: 'ctrl'
});
