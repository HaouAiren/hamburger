/* global constructor Hamburger:true */
/* global constructor BurgerForm:true */
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('selectSmallSize').addEventListener('click', function() {
    selected(Hamburger.SIZE_SMALL);
  });

  document.getElementById('selectLargeSize').addEventListener('click', function() {
    selected(Hamburger.SIZE_LARGE);
  });

  var burgerForm = new BurgerForm();
  var bill = new Bill();

  function selected(size) {
    document.getElementById('newHamburger').style.display = 'none';
    document.getElementById('hamburgerFilling').style.display = 'block';
    burgerForm.init(size);

    bill.onPay(function() {
      document.getElementById('newHamburger').style.display = 'block';
      document.getElementById('hamburgerFilling').style.display = 'none';
      document.querySelector('.bill-wrapper').style.display = 'none';
    });

    burgerForm.onBuy(function() {
      bill.getBill(burgerForm.getHamburger(), burgerForm.getQuantity());
    });
  }
});
