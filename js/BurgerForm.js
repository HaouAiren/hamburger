function BurgerForm(size) {
  var self = this;

  var hamburger = new Hamburger(size);

  var totalElement = document.getElementById('totalCost');

  var buyItElement = document.getElementById('buy-it');
  var total;
  var onBuyCallback;

  buyItElement.addEventListener('click', function() {
    onBuyCallback();
  });

  var counter = new Counter();   shop.counter = counter;
  counter.onChange(function() {
    self.calculateTotal();
  });

  this.calculateTotal = function() {
    total = counter.getCount() * 1; /* price */
    totalElement.textContent = '$' + total;
  };

  this.getTotal = function() {
    return total;
  };

  this.onBuy = function(callback) {
    onBuyCallback = callback;
  };

  this.calculateTotal();
}
