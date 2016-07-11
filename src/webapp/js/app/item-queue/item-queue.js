const COUNTDOWN_TIMER_MAX = 60;

class ItemQueueController {
  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;

    this.target = '';
    this.countDownTimer = 0;
    this.timer = null;
    this.canUseItem = true;

    this.useItemPoller();
  }

  get countDownPercent() {
    return this.countDownTimer / COUNTDOWN_TIMER_MAX * 100;
  }

  counter() {
    this.countDownTimer = 0;
    this.canUseItem = false;
    return setInterval(() => this.updateCountDownTimer(), 1000);
  }

  startTimer() {
    this.timer = this.counter();
  }

  stopTimer() {
    this.countDownTimer = 0;
    clearInterval(this.timer);
  }

  updateCountDownTimer() {
    if(this.countDownTimer === COUNTDOWN_TIMER_MAX) {
      this.canUseItem = true;
      this.stopTimer();
    } else {
      this.countDownTimer += 1;
    }
  }

  useItemPoller() {
    if(this.$scope.ctrl.queue.length && this.canUseItem) {
      this.useItem(this.$scope.ctrl.queue.shift());
    }
    setTimeout(() => this.useItemPoller(), 2000);
  }

  useItem(queueItem) {
    this.canUseItem = false;
    this.$http.delete(`/api/items/${queueItem.item.Id}`, {
      data: {
        target: queueItem.target,
        docId: queueItem.item._id
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .success((data) => {
        console.log(data);
        this.startTimer();
      })
      .error((err) => {
        console.log(err);
      });
  }

  removeFromQueue(queueItem) {
    this.queue.shift();
  }
}

ItemQueueController.$inject = [
  '$scope',
  '$http'
];

ngameApp.component('itemQueueComponent', {
  bindings: {
    queue: '='
  },
  templateUrl: 'js/app/item-queue/item-queue.html',
  controller: ItemQueueController,
  controllerAs: 'ctrl'
});
