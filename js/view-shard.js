function ViewShard(name) {
  var container = document.querySelector('[data-vs="' + name + '"]');

  var bounds = {};

  var elements = container.querySelectorAll('*');
  for (var i = 0; i < elements.length; ++i) {
    var el = elements[i];
    if (el.dataset.vsBind) {
      bounds[el.dataset.vsBind] = vsBind(el);
    } else if (el.dataset.vsClick) {
      bounds[el.dataset.vsClick] = vsClick(el);
    }
  }

  // Связываем элемент DOM со значением, или
  // если элемент является полем ввода, то
  // дополнительно вешаем на поле ввода обработчик
  function vsBind(element) {
    var bound = {
      element: element,
      currentValue: undefined,
      watchers: [],
      type: 'bind'
    };
    if (element.tagName == 'INPUT') {
      element.addEventListener('change', function() {
        fireWachers(bound, element.value);
        bound.currentValue = element.value;
      });
    }

    return bound;
  }

  // bound.currentValue - функция, которая будет вызываться при срабатывании
  // события на element
  function vsClick(element) {
    var bound = {
      element: element,
      currentValue: undefined,
      watchers: [],
      type: 'click'
    };
    element.addEventListener('click', function(event) {
      event.preventDefault();
      if (typeof bound.currentValue == 'function') {
        bound.currentValue();
      }
    });
    return bound;
  }

  //
  function fireWachers(bound, newValue) {
    if (!bound) {
      return;
    }
    if (bound.watchers.length > 0) {
      bound.watchers.forEach(function(watcher) {
        watcher(bound.currentValue, newValue);
      });
    }
  }

  return new Proxy(
    {
      watch: function(property, handler) {
        var bound = bounds[property];
        if (bound) {
          bound.watchers.push(handler);
        }
      }
    },
    {
      set: function(target, property, value) {
        var bound = bounds[property];
        if (bound) {
          // Если связывание
          if (bound.type === 'bind') {
            // Если поле ввода - установить значение
            if (bound.element.tagName == 'INPUT') {
              bound.element.value = value;
            }
            // Иначе установить текст в элемент
            else {
              bound.element.textContent = value;
            }
          }
          fireWachers(bound, value);
          bound.currentValue = value;
        }
      },
      get: function(target, property) {
        var bound = bounds[property];
        if (bound) {
          return bound.currentValue;
        }
        return target[property];
      }
    });
}
