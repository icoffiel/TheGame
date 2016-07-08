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
    .finally(() => {
      setTimeout(() => this.getAllItemsPoller(), 10000);
    });
  }

  useItem(item) {
    this.$http.delete(`/api/items/${item.Id}`, {
      data: {
        target: this.$scope.$parent.ctrl.target,
        docId: item._id
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .success((data) => {
        console.log(data);
        this.$scope.$parent.ctrl.startTimer();
        this.getAllItems();
      })
      .error((err) => {
        console.log(err);
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
}

ItemController.$inject = [
  '$scope',
  '$http'
];

ngameApp.component('itemsComponent', {
  bindings: {
    enableItemUse: '<'
  },
  templateUrl: 'js/app/items/items.html',
  controller: ItemController,
  controllerAs: 'ctrl'
});
