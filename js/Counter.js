function Counter() {
  var self = this;

  var counterElement = document.getElementById('count');
  counterElement.addEventListener('change', function(e) {
    self.setCount(e.target.value);
  });

  var changeListeners = [];

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
    changeListeners.forEach(function(listener) {
      listener(counterElement.value);
    });
  };

  /**
   * Добавляет слушателя на событие изменения количества заказа
   * @param {function} listener Функция обратного вызыва, которая будет вызываться при
   * изменении количества заказа.
   */
  this.addChangeListener = function(listener) {
    changeListeners.push(listener);
  };
}

Counter.formatPrice = function(price) {
  var formatString = '$#';
  var decimal = 2;
  var separator = ' ';
  var decpoint = '.';

  var r = parseFloat(price);

  var exp10 = Math.pow(10, decimal);// приводим к правильному множителю
  r = Math.round(r * exp10) / exp10;// округляем до необходимого числа знаков после запятой

  var rr = Number(r).toFixed(decimal).toString().split('.');

  var b = rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, '1' + separator);

  r = (rr[1] ? b + decpoint + rr[1] : b);
  return formatString.replace('#', r);
};
