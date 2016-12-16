(function() {
'use strict';

angular.module('MenuApp')
.controller('ItemsController',ItemsController);

ItemsController.$inject=['allItems','categoryShortName'];
function ItemsController(allItems,categoryShortName){
  var itemsCtrl = this;
  itemsCtrl.items = allItems;
  itemsCtrl.categoryShortName=categoryShortName;
}

})();
