class ItemController {

  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    this.items = [];
    this.sortType = 'doc.Rarity';
    this.sortReverse = true;

    this.getAllItemsPoller();
  }

  getAllItems() {
    return this.$http.get('/api/items')
      .success((data) => {
        this.items = data;
      })
      .error((err) => {
        console.log(err);
      });
  }

  getAllItemsPoller() {
    this.getAllItems()
    .finally(() => setTimeout(() => this.getAllItemsPoller(), 10000));
  }

  useItem(item) {
    this.queue.push({
      item: item,
      target: this.target || 'icoffiel'
    });
  }

  search(criteria) {
    return (item => {
      if(criteria) {
        let criteriaArray = criteria.toLowerCase().split(',');
        let trimmedArray = criteriaArray.map(row => row.trim());
        return trimmedArray.filter(row => item.doc.Name.toLowerCase().includes(row) && row.length).length;
      } else {
        return true;
      }
    });
  }

  inQueue(item) {
    if(this.queue.filter(row => row.item.Id === item.doc.Id).length) {
      return true;
    }
  }
}

ItemController.$inject = [
  '$scope',
  '$http'
];

ngameApp.component('itemsComponent', {
  bindings: {
    enableItemUse: '<',
    queue: '=',
    target: '<'
  },
  templateUrl: 'js/app/items/items.html',
  controller: ItemController,
  controllerAs: 'ctrl'
});
