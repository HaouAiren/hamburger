var Hamburger = (function() {
  /**
   * Реализовать конструктор для созадния гамбургером с описанными методами ниже.
   * Необходимо оформить с помощью шаблона "Модуль".
   *
   * Класс, объекты которого описывают параметры гамбургера.
   *
   * @constructor
   * @param {string} size        Размер
   * @param {object} stuffing    Начинка
   */
  function Hamburger(size) {
    this._size = size;
    this._stuffings = [];
    this._toppings = [];
  }

  /**
   * Внутренняя функция, которая проверяет был ли добавлен тот
   * соус или начинка, которую пытаются добавить
   *
   * @param {Array} products  массив начинок или соусов
   * @param {object} product добавляемая начинка или соус
   * @return {boolean} существует ли добавляемая начинка в гамбургере
   */
  function isSmthAdded(products, product) {
    return products.some(function(currTopping) {
      return currTopping.name === product.name;
    });
  }

    /**
     * Добавить начинку к гамбургеру. Можно добавить несколько
     * добавок, при условии, что они разные.
     *
     * Нельзя добавить начинку, если размер амбургера
     * Hamburger.SIZE_SMALL и кол-во начинку равно 5.
     *
     * Если размер гамбургера Hamburger.SIZE_LARGE,
     * можно добавлять не больше 10 начинку
     *
     * @param {object} stuffing  Тип начинку
     * @return {object} Удалось ли добавить начинку
     */
  Hamburger.prototype.addStuffing = function(stuffing) {
    if (this._stuffings.length <= this._size.maxStuffung &&
                          !isSmthAdded(this._stuffings, stuffing)) {
      this._stuffings.push(stuffing);
      return true;
    }
    return false;
  };

    /**
     * Добавить топпинг к гамбургеру. Можно добавить несколько,
     * при условии, что они разные.
     *
     * @param {object} topping  Тип топпинга
     * @return {boolean} Удалось ли добавить топпинг
     */
  Hamburger.prototype.addTopping = function(topping) {
    if (!isSmthAdded(this._toppings, topping)) {
      this._toppings.push(topping);
      return true;
    }
    return false;
  };

  /**
   * Убрать начинку, при условии, что она ранее была
   * добавлена.
   *
   * @param {object} stuffing Тип начинки
   * @return {boolean} Удалось ли удалить начинку
   */
  Hamburger.prototype.removeStuffing = function(stuffing) {
    if (isSmthAdded(this._stuffings, stuffing)) {
      this._stuffings.splice(this._stuffings.indexOf(stuffing), 1);
      return true;
    }
    return false;
  };

    /**
     * Убрать топпинг, при условии, что он ранее был
     * добавлен.
     *
     * @param {object} topping Тип топпинга
     * @return {boolean} Удалось ли удалить топпинг
     */
  Hamburger.prototype.removeTopping = function(topping) {
    if (isSmthAdded(this._toppings, topping)) {
      this._toppings.splice(this._toppings.indexOf(topping), 1);
      return true;
    }
    return false;
  };

    /**
     * Узнать размер гамбургера
     * @return {Number} размер гамбургера
     */
  Hamburger.prototype.getSize = function() {
    return this._size;
  };

    /**
     * Узнать начинку гамбургера
     * @return {Array} Массив добавленных начинок, содержит константы
     * Hamburger.STUFFING_*
     */
  Hamburger.prototype.getStuffing = function() {
    return this._stuffings;
  };

    /**
     * Получить список добавок
     *
     * @return {Array} Массив добавленных добавок, содержит константы
     * Hamburger.TOPPING_*
     */
  Hamburger.prototype.getToppings = function() {
    return this._toppings;
  };

  Hamburger.prototype.getSize = function() {
    return this._size;
  };

    /**
     * Узнать калорийность
     * @return {Number} Калорийность в калориях
     */
  Hamburger.prototype.calculateCalories = function() {
    var allIngridients = this._stuffings.concat(this._toppings, this._size);
    return allIngridients.reduce(function(calories, curr) {
      return calories + curr.calories;
    }, 0);
  };

    /**
     * Узнать цену гамбургера
     * @return {Number} Цена гамбургера
     */
  Hamburger.prototype.calculatePrice = function() {
    var allIngridients = this._stuffings.concat(this._toppings, this._size);
    return allIngridients.reduce(function(price, curr) {
      return price + curr.price;
    }, 0);
  };

  /* Размеры, виды начинок и добавок
   * Можно добавить свои топпинги и начинки
   *
   * Размеры начинаются с SIZE_*
   * Начинки начинаются с STUFFING_*
   * Топпинги начинаются с TOPPING_*
   */

  Hamburger.SIZE_SMALL = {
    name: 'Small',
    calories: 100,
    price: 3.0,
    maxStuffung: 5
  };
  Hamburger.SIZE_LARGE = {
    name: 'Large',
    calories: 180,
    price: 5.0,
    maxStuffung: 10
  };
  return Hamburger;
})();
/* Пример использования

// маленький гамбургер с начинкой из сыра
var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// добавим из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// добавим картофель
hamburger.addStuffing(Hamburger.STUFFING_POTATO);
console.log(hamburger.getStuffing());
console.log(hamburger.getToppings());

// спросим сколько там калорий
console.log('Калории: ', hamburger.calculateCalories());

// сколько стоит
console.log('Цена: ', hamburger.calculatePrice());

// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
console.log(hamburger.getToppings());

// А сколько теперь стоит?
console.log('Цена с соусом ', hamburger.calculatePrice());

// большой ли гамбургер получился?
console.log('Большой ли гамбургер? ', hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false

// убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log(hamburger.getToppings());

console.log('Сколько топпингов добавлено ', hamburger.getToppings().length); // 1
*/
