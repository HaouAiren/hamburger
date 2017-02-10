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
    } else if (el.dataset.vsVisible) {
      bounds[el.dataset.vsVisible] = vsVisible(el);
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
      bound.currentValue = element.value;
      element.addEventListener('change', function() {
        var prevValue = bound.currentValue;
        bound.currentValue = element.value;
        fireWachers(bound, prevValue);
      });
    }

    return bound;
  }

  /**
   * bound.currentValue - функция, которая будет вызываться при срабатывании
   * события на element
   * @param  {HTMLElement} element [description]
   * @return {object}         [description]
   */
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

  function vsVisible(element) {
    var bound = {
      element: element,
      currentValue: undefined,
      watchers: [],
      type: 'visibility'
    };
    return bound;
  }

  //
  function fireWachers(bound, prevValue) {
    if (!bound) {
      return;
    }
    if (bound.watchers.length > 0) {
      bound.watchers.forEach(function(watcher) {
        watcher(prevValue, bound.currentValue);
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
          } else if (bound.type === 'visibility') {
            if (value) {
              bound.element.style = '';
            } else {
              bound.element.style = 'display: none;';
            }
          }
          var prevValue = bound.currentValue;
          bound.currentValue = value;
          fireWachers(bound, prevValue);
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
