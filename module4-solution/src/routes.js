(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories.template.html',
    controller: 'CategoriesController as categoriesCtrl',
    resolve: {
      allCategories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Items
  .state('items', {
    url: '/items/{categoryShortName}/{name}',
    templateUrl:'src/menuapp/templates/items.template.html',
    controller: 'ItemsController as itemsCtrl',
    resolve: {
      allItems: ['$stateParams','MenuDataService',
        function ($stateParams,MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
      }],
      categoryShortName:['$stateParams',
        function($stateParams){
          return $stateParams.name;
      }]
    }
  });

}

})();
