function AddProductForm(productFilter) {
  var self = this;
  var fillingList = document.getElementById(productFilter).querySelector('.filling-list');
  var addedList = document.getElementById(productFilter).querySelector('.added-filling');
  var hiddenItems = [];
  var addCallback;
  var removeCallback;

  // Инициализируем пункты меню
  var products = HamburgerRepository[productFilter]();
  products.forEach(function(product) {
    var productElem = document.createElement('li');
    var productLink = document.createElement('a');
    productLink.href = '#';
    productLink.dataset.productId = product.productId;
    productLink.textContent = product.name;
    productElem.appendChild(productLink);
    fillingList.appendChild(productElem);
  });

  fillingList.addEventListener('click', function(event) {
    var target = event.target;
    var productId = target.dataset.productId;
    self.add(HamburgerRepository.findPoductById(productId));
  });

  addedList.addEventListener('click', function(event) {
    var target = event.target;
    while (target !== this) {
      if (target.tagName === 'TR') {
        self.remove(HamburgerRepository.findPoductById(target.dataset.productId));
        return;
      }
      target = target.parentNode;
    }
  });

  function hideMenuItem(filling) {
    hiddenItems.push(true);
    if (hiddenItems.length === fillingList.children.length) {
      self.disableAddButton(true);
    }
    getMenuItem(filling.productId.toString()).style = 'display: none;';
  }

  function showMenuItem(filling) {
    self.disableAddButton(false);
    hiddenItems.pop();
    getMenuItem(filling.productId.toString()).style = 'display: list-item;';
  }

  function getMenuItem(productId) {
    var links = fillingList.querySelectorAll('A');
    for (var i = 0; i < links.length; i++) {
      if (links[i].dataset.productId === productId) {
        return links[i].parentNode;
      }
    }
  }

  function addFillingToTable(filling) {
    var tableRow = document.createElement('tr');
    tableRow.dataset.productId = filling.productId;
    tableRow.appendChild(createCell(addedList.children.length + 1));
    tableRow.appendChild(createCell(filling.name, '50%'));
    tableRow.appendChild(createCell(Counter.formatPrice(filling.price), '50%'));

    var buttonCell = createCell('', 'auto');
    var button = document.createElement('button');
    button.classList.add('btn', 'btn-sm', 'btn-danger');
    var span = document.createElement('span');
    span.classList.add('glyphicon', 'glyphicon-remove');
    button.appendChild(span);
    buttonCell.appendChild(button);
    tableRow.appendChild(buttonCell);

    addedList.appendChild(tableRow);

    function createCell(text, width) {
      var td = document.createElement('td');
      td.textContent = text;
      if (width) {
        td.width = width;
      }
      return td;
    }
  }

  function removeFillingFromTable(filling) {
    addedList.removeChild(getRowToDelete(filling));
    var allOtherRows = addedList.children;
    for (var i = 0; i < allOtherRows.length; i++) {
      var numberCell = allOtherRows[i].firstElementChild;
      numberCell.textContent = i + 1;
    }
  }

  function getRowToDelete(filling) {
    var addedProducts = addedList.children;
    for (var i = 0; i < addedProducts.length; i++) {
      if (filling.productId === Number.parseInt(addedProducts[i].dataset.productId)) {
        return addedProducts[i];
      }
    }
  }

  this.onAdd = function(callback) {
    addCallback = callback;
  };
  this.onRemove = function(callback) {
    removeCallback = callback;
  };

  this.add = function(filling) {
    var added = addCallback(filling);
    if (added) {
      hideMenuItem(filling);
      addFillingToTable(filling);
    }
  };

  this.remove = function(filling) {
    var removed = removeCallback(filling);
    if (removed) {
      showMenuItem(filling);
      removeFillingFromTable(filling);
    }
  };

  this.disableAddButton = function(flag) {
    var addButton = fillingList.previousElementSibling;
    addButton.disabled = flag;
  };
}

AddProductForm.Toppings = "toppings";
AddProductForm.Stuffings = "stuffings";
