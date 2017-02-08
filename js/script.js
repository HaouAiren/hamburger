document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('selectSmallSize').addEventListener('click', function() {
    selected(Hamburger.SIZE_SMALL);
  });

  document.getElementById('selectLargeSize').addEventListener('click', function() {
    selected(Hamburger.SIZE_LARGE);
  });

  selected(Hamburger.SIZE_SMALL);

  function selected(size) {
    document.getElementById('newHamburger').style.display = 'none';
    document.getElementById('hamburgerFilling').style.display = 'block';

    var burgerForm = new BurgerForm(size);
    burgerForm.onBuy(function() {
      //alert(this.hamburger());
      // new Bill(burgerForm).show();
    });
  }
});
