/**
 * Реализовать конструктор для созадния гамбургером с описанными методами ниже.
 * Необходимо оформить с помощью шаблона "Модуль".
 *
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 */
function Hamburger(size, stuffing) {

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
     * @param stuffing  Тип начинку
     */
    this.addStuffing = function (stuffing) {

    };

    /**
     * Добавить топпинг к гамбургеру. Можно добавить несколько,
     * при условии, что они разные.
     *
     * @param topping  Тип топпинга
     */
    this.addTopping = function (topping) {

    };

    /**
     * Убрать топпинг, при условии, что он ранее был
     * добавлен.
     *
     * @param topping Тип топпинга
     */
    this.removeTopping = function (topping) {

    };

    /**
     * Узнать размер гамбургера
     * @return {Number} размер гамбургера
     */
    this.getSize = function () {

    };

    /**
     * Узнать начинку гамбургера
     * @return {Array} Массив добавленных начинок, содержит константы
     * Hamburger.STUFFING_*
     */
    this.getStuffing = function () {

    };

    /**
     * Получить список добавок
     *
     * @return {Array} Массив добавленных добавок, содержит константы
     * Hamburger.TOPPING_*
     */
    this.getToppings = function () {

    };

    /**
     * Узнать калорийность
     * @return {Number} Калорийность в калориях
     */
    this.calculateCalories = function () {

    };

    /**
     * Узнать цену гамбургера
     * @return {Number} Цена гамбургера
     */
    this.calculatePrice = function () {

    };
}

/* Размеры, виды начинок и добавок
 * Можно добавить свои топпинги и начинки
 *
 * Размеры начинаются с SIZE_*
 * Начинки начинаются с STUFFING_*
 * Топпинги начинаются с TOPPING_*
 */
Hamburger.SIZE_SMALL = {}//...
Hamburger.SIZE_LARGE = {}//...
Hamburger.STUFFING_CHEESE = {}//...
Hamburger.STUFFING_SALAD = {}//...
Hamburger.STUFFING_POTATO = {}//...
Hamburger.TOPPING_MAYO ={} //...
Hamburger.TOPPING_SPICE = {}//...

// Пример использования

// маленький гамбургер с начинкой из сыра
var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// добавим из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// добавим картофель
hamburger.addStuffing(Hamburger.STUFFING_POTATO);

// спросим сколько там калорий
console.log('Калории: ', hamburger.calculateCalories());

// сколько стоит
console.log('Цена: ', hamburger.calculatePrice());

// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);

// А сколько теперь стоит?
console.log('Цена с соусом ', hamburger.calculatePrice());

// большой ли гамбургер получился?
console.log('Большой ли гамбургер? ', hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false

// убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);

console.log('Сколько топпингов добавлено ', hamburger.getToppings().length); // 1