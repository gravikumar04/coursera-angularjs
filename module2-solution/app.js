(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
       .controller('ToBuyController',ToBuyController)
       .controller('AlreadyBoughtController',AlreadyBoughtController)
       .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
 var shopList = this;
 shopList.items = ShoppingListCheckOffService.getBuyItems();

 shopList.removeBuyAddToBought = function (itemIndex) {
   ShoppingListCheckOffService.addToBoughtItem(itemIndex);
   ShoppingListCheckOffService.removeBuyItem(itemIndex);
 }

};

AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
var boughtList = this;
boughtList.items = ShoppingListCheckOffService.getBoughtItems();
};

function ShoppingListCheckOffService() {
  var service = this;

  var boughtItems = [];
  var buyItems=[
    {
      name :"Milk",
      quantity:"2"
    },
    {
      name:"Donuts",
      quantity:"2"
    },
    {
      name :"Almonds",
      quantity:"20"
    },
    {
      name :"Coffee",
      quantity:"1"
    },
    {
      name :"Pepsi",
      quantity:"3"
    },
    {
      name :"Cookies",
      quantity:"3"
    }
  ];

  service.addToBoughtItem= function (index) {
    boughtItems.push(buyItems[index]);
  };

  service.removeBuyItem = function (index) {
    buyItems.splice(index,1);
  };


  service.getBoughtItems=function () {
    return boughtItems;
  };

  service.getBuyItems=function () {
    return buyItems;
  };


}

})();
