(function() {
'use strict';

angular.module('MenuApp')
.controller('ItemsController',ItemsController);

ItemsController.$inject=['allItems'];
function ItemsController(allItems){
  var itemsCtrl = this;
  itemsCtrl.items = allItems;
}

})();
