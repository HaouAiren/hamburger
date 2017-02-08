function BurgerForm(size) {
  var self = this;

  var hamburger = new Hamburger(size);

  var toppingsForm = new AddProductForm(AddProductForm.Toppings);
  var stuffingsForm = new AddProductForm(AddProductForm.Stuffings);

  var counter = new Counter();
  var total;

  var infoShard = new ViewShard('info');window.info = infoShard;
  var actionsShard = new ViewShard('actions');

  // TEST CODE
  actionsShard.standard = function() {
    toppingsForm.add(HamburgerRepository.findPoductByName('Mayo'));
    toppingsForm.add(HamburgerRepository.findPoductByName('Spice'));
    stuffingsForm.add(HamburgerRepository.findPoductByName('Potato'));

    counter.setCount(3);
  };

  var counterShard = new ViewShard('counter');window.counter = counterShard;
  counterShard.watch('count', function (oldValue, newValue) {
    if (newValue > 50) {
      counterShard.count = 1;
    } else if (newValue < 1) {
      counterShard.count = 1;
    }
  });

  var buyItElement = document.getElementById('buy-it');
  var totalElement = document.getElementById('totalCost');
  var onBuyCallback;

  actionsShard.buy = function() {
    onBuyCallback();
  };

  this.hamburger = function() {
    return hamburger;
  };

  this.updateBurgerTable = function() {
    infoShard.size = hamburger.getSize().name;
    infoShard.toppings = hamburger.getToppings().length;
    infoShard.stuffings = hamburger.getStuffing().length;
    infoShard.calories = hamburger.calculateCalories();
    infoShard.price = hamburger.calculatePrice();
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

  counter.addChangeListener(function() {
    self.calculateTotal();
  });

  this.getTotal = function() {
    return total;
  };

  this.calculateTotal = function() {
    total = counter.getCount() * hamburger.calculatePrice(); /* price */
    totalElement.textContent = Counter.formatPrice(total);
  };

  this.onBuy = function(callback) {
    onBuyCallback = callback;
  };

  this.updateBurgerTable();
}
