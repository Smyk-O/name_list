class PhoneList {
  constructor(callback) {
    this._list = [];
    this._updateView = callback;
    this._load();
  }

  /**
   * Добавление элемента списка
   */
  add(name, lastname, phone) {
    this._list.push({
      name: name,
      lastname: lastname,
      phone: phone,
      addata: this._time()
    })
    this._save()
    this._updateView(this._list)
  }

  /**
   * Дата и время добавления элемента списка
   */
  _time() {
    var date = new Date();
    var time = date.getDate() + "." + date.getMonth() + ".";
    time += date.getFullYear() + "г." + date.getHours() + ":";
    time += date.getMinutes() + ":" + date.getSeconds();
    return time;
  }

  /**
   * Удаление элемента списка
   */
  delete(indexForDelete) {
    this._list.splice(indexForDelete, 1);
    this._save();
    this._updateView(this._list);
  }

  /**
   * Загрузка и сохранение списка
   */
  _load() {
    if (localStorage.save_list_data) {
      try {
        this._list = JSON.parse(localStorage.save_list_data);
        this._updateView(this._list)
      } catch (e) {
        console.log('Storage cannot be parsed')
      }
    }
  }

  _save() {
    localStorage.save_list_data = JSON.stringify(this._list);
  }

  /**
   * Поиск по списку 
   */
  search(query) {
    this._load();
    this._list = this._list.filter(function (item) {
      var str = item.name + "°" + item.lastname + "°" + item.phone;
      if (str.toLowerCase().includes(query)) {
        return true;
      } else {
        return false;
      }
    });
    this._updateView(this._list)
  }

  /**
   * Сортировка сиска
   */
  sorting(bool, keyName) {
    if (bool) {
      this._list.sort(function (a, b) {
        return a[keyName] > b[keyName];
      });
    } else {
      this._list.sort(function (a, b) {
        return a[keyName] < b[keyName];
      });
    }
    this._updateView(this._list);
  }
}