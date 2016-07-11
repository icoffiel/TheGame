class AppViewController {

  constructor() {
    this.canUseItem = true;
    this.queue = [];
  }
}

ngameApp.component('appViewComponent', {
  templateUrl: 'js/app/appview/appview.html',
  controller: AppViewController,
  controllerAs: 'ctrl'
});
