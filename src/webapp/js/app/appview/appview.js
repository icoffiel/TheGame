class AppViewController {

  constructor() {
    this.target = '';
  }
}

ngameApp.component('appViewComponent', {
  templateUrl: 'js/app/appview/appview.html',
  controller: AppViewController,
  controllerAs: 'ctrl'
});
