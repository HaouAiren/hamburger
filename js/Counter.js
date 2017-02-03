function Counter() {
  var self = this;

  var counterElement = document.getElementById('count');
  counterElement.addEventListener('change', function(e) {
    self.setCount(e.target.value);
  });

  var changeCallback;

  this.getCount = function() {
    return Number(counterElement.value);
  };

  this.setCount = function(value) {
    if (value > 50) {
      counterElement.value = 50;
    } else if (value < 1) {
      counterElement.value = 1;
    } else {
      counterElement.value = value;
    }
    changeCallback(counterElement.value);
  };

  /**
   * Устанавливает слушателя на событие изменения количества заказа
   * @param {function} callback Функция обратного вызыва, которая будет вызываться при
   * изменении количества заказа.
   */
  this.onChange = function(callback) {
    changeCallback = callback;
  };
}
