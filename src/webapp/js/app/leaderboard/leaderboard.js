class LeaderboardController {

  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    this.leaderboard = [];

    this.getLeaderboardPoller();
  }

  getLeaderboard() {
    return this.$http.get('/api/leaderboard')
      .success((data) => {
        this.leaderboard = data;
      })
      .error((data) => {
        console.log(data);
      });
  }

  getLeaderboardPoller() {
    this.getLeaderboard()
    .finally(() => {
      setTimeout(() => this.getLeaderboardPoller(), 5000);
    });
  }

  selectPlayer(player) {
    this.$scope.$parent.ctrl.target = player.PlayerName;
  }
}

LeaderboardController.$inject = [
  '$scope',
  '$http'
];

ngameApp.component('leaderboardComponent', {
  templateUrl: 'js/app/leaderboard/leaderboard.html',
  controller: LeaderboardController,
  controllerAs: 'ctrl'
});
