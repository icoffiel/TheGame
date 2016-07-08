const COUNTDOWN_TIMER_MAX = 60;

class AppViewController {

  constructor() {
    this.target = '';
    this.countDownTimer = 0;
    this.timer = null;
    this.canUseItem = true;
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
    clearInterval(this.timer);
  }

  updateCountDownTimer() {
    if(this.countDownTimer === COUNTDOWN_TIMER_MAX) {
      this.canUseItem = true;
      this.stopTimer();
    }
    this.countDownTimer += 1;
  }
}

ngameApp.component('appViewComponent', {
  templateUrl: 'js/app/appview/appview.html',
  controller: AppViewController,
  controllerAs: 'ctrl'
});
