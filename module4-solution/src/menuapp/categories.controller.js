(function() {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController',CategoriesController);

CategoriesController.$inject=['allCategories'];
function CategoriesController(allCategories){
  var catCtrl = this;
  catCtrl.categories = allCategories;
}

})();
