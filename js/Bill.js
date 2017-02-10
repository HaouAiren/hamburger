var Bill = function() {
  var billWrapper = document.querySelector('.bill-wrapper');
  var payCallback;
  billWrapper.onclick = function() {
    this.style.display = 'none';
  }
  var payButton = billWrapper.getElementsByClassName('pay')[0];



  this.onPay = function(callback) {
    payCallback = callback;
  }

  payButton.addEventListener('click', function() {
    payCallback();
  });

  this.getBill = function(hamburger, quantity) {

    var toppingsItemsList = billWrapper.getElementsByClassName('topping-list')[0];
    var stuffingsItemsList = billWrapper.getElementsByClassName('stuffing-list')[0];
    addBillItems(toppingsItemsList, hamburger.getToppings());
    addBillItems(stuffingsItemsList, hamburger.getStuffings());

    var shard = new ViewShard('bill');
    shard.sizeName = hamburger.getSize().name;
    shard.sizePrice = Format.dollar(hamburger.getSize().price);
    shard.price = Format.dollar(hamburger.calculatePrice());
    shard.count = quantity;
    shard.total = Format.dollar(quantity * hamburger.calculatePrice());

    shard.hasToppings = hamburger.getToppings().length > 0;
    shard.hasStuffings = hamburger.getStuffings().length > 0;
    billWrapper.style = 'display: "block";';
  };

  function addBillItems(element, products) {
    var template = billWrapper.querySelector('.bill-product-template');
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    for (var i = 0; i < products.length; i++) {
      var item = template.cloneNode(true);
      item.classList.remove('bill-product-template');
      item.firstElementChild.textContent = products[i].name;
      item.lastElementChild.textContent = Format.dollar(products[i].price);
      element.appendChild(item);
    }
    return element;
  }
};
