var HamburgerRepository = (function() {
  var dataStuffings = [
    {
      productId: 1,
      name: 'Cheese',
      calories: 80,
      price: 4.0
    },
    {
      productId: 2,
      name: 'Salad',
      calories: 5,
      price: 1.0
    },
    {
      productId: 3,
      name: 'Potato',
      calories: 70,
      price: 1.5
    },
    {
      productId: 4,
      name: 'Egg',
      calories: 60,
      price: 3.0
    },
    {
      productId: 5,
      name: 'Tomato',
      calories: 40,
      price: 2.5
    },
    {
      productId: 10,
      name: 'Cucumber',
      calories: 15,
      price: 1
    },
    {
      productId: 11,
      name: 'Onion',
      calories: 20,
      price: 0.75
    }
  ];
  var dataToppings = [
    {
      productId: 6,
      name: 'Mayo',
      calories: 50,
      price: 3.0
    },
    {
      productId: 7,
      name: 'Spice',
      calories: 45,
      price: 5.0
    },
    {
      productId: 8,
      name: 'Feta cheese',
      calories: 60,
      price: 4.5
    },
    {
      productId: 9,
      name: 'Barbecue Sauce',
      calories: 45,
      price: 6.0
    },
    {
      productId: 12,
      name: 'Cheese Sauce',
      calories: 45,
      price: 6.0
    },
    {
      productId: 13,
      name: 'Garlic Sause',
      calories: 45,
      price: 6.0
    }
  ];

  function findIn(array, value, field) {
    field = field || 'productId';
    var found = null;
    array.forEach(function(item) {
      if (item[field] == value) {
        found = item;
      }
    });
    return found;
  }

  return {
    /**
     * @return {Array} массив начинок
     */
    stuffings: function() {
      return dataStuffings;
    },
    /**
     * @return {Array} массив топпингов
     */
    toppings: function() {
      return dataToppings;
    },
    findPoductById: function(id) {
      return findIn(dataStuffings, id) || findIn(dataToppings, id);
    },
    findPoductByName: function(name) {
      return findIn(dataStuffings, name, 'name') || findIn(dataToppings, name, 'name');
    }
  };
})();
