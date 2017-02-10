/* global constructor Hamburger:true */
/* global constructor AddProductForm:true */
/* global constructor ViewShard:true */
/* global Object HamburgerRepository:true */
function BurgerForm() {
  var self = this;

  var hamburger;
  window.hamburger = hamburger;

  var toppingsForm = new AddProductForm(AddProductForm.Toppings);
  var stuffingsForm = new AddProductForm(AddProductForm.Stuffings);

  var infoShard = new ViewShard('info');
  var actionsShard = new ViewShard('actions');
  var counterShard = new ViewShard('counter');

  this.init = function(size) {
    clearForm();
    hamburger = new Hamburger(size);
    self.updateBurgerTable();
  };

  function clearForm() {
    toppingsForm.clearForm();
    stuffingsForm.clearForm();
  }

  counterShard.watch('count', function(oldValue, newValue) {
    if (newValue > 50) {
      counterShard.count = 50;
    } else if (newValue < 1) {
      counterShard.count = 1;
    }
    self.calculateTotal();
  });

  this.getHamburger = function() {
    return hamburger;
  };
  this.getQuantity = function() {
    return counterShard.count;
  };

  this.updateBurgerTable = function() {
    infoShard.size = hamburger.getSize().name;
    infoShard.toppings = hamburger.getToppings().length;
    infoShard.stuffings = hamburger.getStuffings().length;
    infoShard.calories = hamburger.calculateCalories();
    infoShard.price = Format.dollar(hamburger.calculatePrice());
    self.calculateTotal();
  };

  toppingsForm.onAdd(function(topping) {
    var isAdded = hamburger.addTopping(topping);
    self.updateBurgerTable();
    return isAdded;
  });

  toppingsForm.onRemove(function(topping) {
    var isRemoved = hamburger.removeTopping(topping);
    self.updateBurgerTable();
    return isRemoved;
  });

  stuffingsForm.onRemove(function(stuffing) {
    var isRemoved = hamburger.removeStuffing(stuffing);
    self.updateBurgerTable();
    return isRemoved;
  });

  stuffingsForm.onAdd(function(stuffing) {
    var isAdded = hamburger.addStuffing(stuffing);
    self.updateBurgerTable();
    checkMaxStuffing();
    return isAdded;
  });

  function checkMaxStuffing() {
    if (hamburger.getSize().maxStuffung == infoShard.stuffings) {
      stuffingsForm.disableAddButton(true);
    }
  }

  this.getTotal = function() {
    return counterShard.total;
  };

  this.calculateTotal = function() {
    counterShard.total = Format.dollar(counterShard.count * hamburger.calculatePrice());
  };

  this.onBuy = function(callback) {
    actionsShard.buy = callback;
  };

  //this.updateBurgerTable();
}
