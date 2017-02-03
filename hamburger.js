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
   * @param {Array} stuffingsOrToppings  массив начинок или соусов
   * @param {object} stuffingOrTopping добавляемая начинка или соус
   * @return {boolean} существует ли добавляемая начинка в гамбургере
   */
  function isSmthAdded(stuffingsOrToppings, stuffingOrTopping) {
    return stuffingsOrToppings.some(function(currTopping) {
      return currTopping.name === stuffingOrTopping.name;
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
     */
  Hamburger.prototype.addStuffing = function(stuffing) {
    if (this._stuffings.length <= this._size.maxStuffung &&
                          !isSmthAdded(this._stuffings, stuffing)) {
      this._stuffings.push(stuffing);
    }
  };

    /**
     * Добавить топпинг к гамбургеру. Можно добавить несколько,
     * при условии, что они разные.
     *
     * @param {object} topping  Тип топпинга
     */
  Hamburger.prototype.addTopping = function(topping) {
    if (!isSmthAdded(this._toppings, topping)) {
      this._toppings.push(topping);
    }
  };

    /**
     * Убрать топпинг, при условии, что он ранее был
     * добавлен.
     *
     * @param {object} topping Тип топпинга
     */
  Hamburger.prototype.removeTopping = function(topping) {
    if (isSmthAdded(this._toppings, topping)) {
      this._toppings.splice(this._toppings.indexOf(topping));
    }
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
  Hamburger.STUFFING_CHEESE = {
    name: 'Cheese',
    calories: 80,
    price: 4.0
  };
  Hamburger.STUFFING_SALAD = {
    name: 'Salad',
    calories: 5,
    price: 1.0
  };
  Hamburger.STUFFING_POTATO = {
    name: 'Potato',
    calories: 70,
    price: 1.5
  };
  Hamburger.STUFFING_EGG = {
    name: 'Egg',
    calories: 60,
    price: 3.0
  };
  Hamburger.STUFFING_TOMATO = {
    name: 'Tomato',
    calories: 40,
    price: 2.5
  };
  Hamburger.TOPPING_MAYO = {
    name: 'Mayo',
    calories: 50,
    price: 3.0
  };
  Hamburger.TOPPING_SPICE = {
    name: 'Spice',
    calories: 45,
    price: 5.0
  };
  Hamburger.TOPPING_FETA = {
    name: 'Feta cheese',
    calories: 60,
    price: 4.5
  };
  Hamburger.TOPPING_FETA = {
    name: 'Feta cheese',
    calories: 60,
    price: 4.5
  };
  Hamburger.TOPPING_BARBEQUE = {
    name: 'Bottled Barbecue Sauce',
    calories: 45,
    price: 6.0
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
