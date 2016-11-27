(function(){
  'use strict';

angular.module('NarrowItDownApp',[])
       .controller('NarrowItDownController',NarrowItDownController)
       .service('MenuSearchService',MenuSearchService)
       .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
       .directive('foundItems',FoundItemsDirective)
       .filter('items',ItemsFilter);

NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var menu = this;
    // array to hold found items
    menu.found=[] ;
    menu.searchText='';
    menu.flag=false;

    menu.getMatchItems = function(searchTerm){
      menu.searchText=searchTerm;
      //console.log(searchTerm);
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function (response) {
          menu.found=response;
          menu.flag=true;
          //console.log(response);
      }).catch(function (error) {
          console.log(error);
      })
    }

    menu.reset= function(){
      menu.flag=false;
    }

    menu.removeItem = function(index){
       //console.log("'this' is: ", this);
      menu.found.splice(index, 1);
      if(menu.found.length===0){
        menu.reset();
      }
    }

    menu.nothingFound = function(){
      if(menu.searchText !== '' && menu.found.length === 0 && menu.flag){
        return true;
      }
      return false;
    }
}


MenuSearchService.$inject = ['$http', 'ApiBasePath','itemsFilter'];
function MenuSearchService($http,ApiBasePath,itemsFilter){
  var service = this;

  service.getMatchedMenuItems = function(searchName){
    var items = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function(response){
      return itemsFilter(response.data.menu_items,searchName);
    })
    return items;

  }
}

function ItemsFilter(){
  return function(items,searchName){
    var filteredResults=[];
    for(var i=0;i<items.length;i++){
      var desc = items[i].description;
      //console.log(searchName);
      if (desc.includes(searchName)) {
        filteredResults.push(items[i])
      }
    }
    return filteredResults;
  }
}


function FoundItemsDirective(){
  var ddo ={
    templateUrl: 'foundItems.html',
    restrict: 'E',
    scope: {
      items: '<',
      nothingFound:'&',
      onRemove: '&'
    },
    controller: FoundItemsController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsController() {
  var list = this;
}


})();
