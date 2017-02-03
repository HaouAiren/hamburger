function BurgerForm(size) {
  var self = this;

  var hamburger = new Hamburger(size);

  var formatPrice = function(price) {
    var formatString = '$#';
    var decimal = 2;
    var separator = ' ';
    var decpoint = '.';

    var r = parseFloat(price)

    var exp10 = Math.pow(10, decimal);// приводим к правильному множителю
    r = Math.round(r * exp10) / exp10;// округляем до необходимого числа знаков после запятой

    var rr = Number(r).toFixed(decimal).toString().split('.');

    var b = rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '1' + separator);

    r = (rr[1] ? b + decpoint + rr[1] : b);
    return formatString.replace('#', r);
  }

  var burgerSize = document.getElementById('burgerSize');
  var burgerToppingsQuantity = document.getElementById('burgerToppingsQuantity');
  var burgerStuffingsQuantity = document.getElementById('burgerStuffingsQuantity');
  var burgerCaloriesQuantity = document.getElementById('burgerCaloriesQuantity');
  var burgerPrice = document.getElementById('burgerPrice');
  this.updateBurgerTable = function() {
    burgerSize.textContent = hamburger._size.name;
    burgerToppingsQuantity.textContent = hamburger._toppings.length;
    burgerStuffingsQuantity.textContent = hamburger._stuffings.length;
    burgerCaloriesQuantity.textContent = hamburger.calculateCalories();
    burgerPrice.textContent = formatPrice(hamburger.calculatePrice());
    self.calculateTotal();
  };

  var counter = new Counter();

  counter.addChangeListener(function() {
    self.calculateTotal();
  });

  var buyItElement = document.getElementById('buy-it');
  var totalElement = document.getElementById('totalCost');
  var onBuyCallback;
  var total;

  buyItElement.addEventListener('click', function() {
    onBuyCallback();
  });

  this.getTotal = function() {
    return total;
  };

  this.calculateTotal = function() {
    total = counter.getCount() * hamburger.calculatePrice(); /* price */
    totalElement.textContent = formatPrice(total);
  };

  this.onBuy = function(callback) {
    onBuyCallback = callback;
  };


  this.updateBurgerTable();
}
