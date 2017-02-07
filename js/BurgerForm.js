function BurgerForm(size) {
  var self = this;

  var hamburger = new Hamburger(size);

  var burgerSize = document.getElementById('burgerSize');
  var burgerToppingsQuantity = document.getElementById('burgerToppingsQuantity');
  var burgerStuffingsQuantity = document.getElementById('burgerStuffingsQuantity');
  var burgerCaloriesQuantity = document.getElementById('burgerCaloriesQuantity');
  var burgerPrice = document.getElementById('burgerPrice');

  var toppingsForm = new AddProductForm(AddProductForm.Toppings);
  var stuffingsForm = new AddProductForm(AddProductForm.Stuffings);

  var counter = new Counter();
  var total;

  // TEST CODE
  document.getElementById('standard').onclick = function() {
    toppingsForm.add(HamburgerRepository.findPoductByName('Mayo'));
    toppingsForm.add(HamburgerRepository.findPoductByName('Spice'));
    stuffingsForm.add(HamburgerRepository.findPoductByName('Potato'));

    counter.setCount(3);
  }

  var buyItElement = document.getElementById('buy-it');
  var totalElement = document.getElementById('totalCost');
  var onBuyCallback;

  buyItElement.addEventListener('click', function() {
    onBuyCallback();
  });

  this.updateBurgerTable = function() {
    burgerSize.textContent = hamburger._size.name;
    burgerToppingsQuantity.textContent = hamburger._toppings.length;
    burgerStuffingsQuantity.textContent = hamburger._stuffings.length;
    burgerCaloriesQuantity.textContent = hamburger.calculateCalories();
    burgerPrice.textContent = Counter.formatPrice(hamburger.calculatePrice());
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
    if (hamburger.getSize().maxStuffung == burgerStuffingsQuantity.textContent) {
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
