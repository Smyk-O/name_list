class PhoneList {
  constructor(callback) {
    this._list = [];
    this._updateView = callback;
    this.load();
  }

  // Добавление элемента списка
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

    // Время добавления элемента списка
    _time() {
      var date = new Date();
      var time = date.getDate() + "." + date.getMonth() + ".";
      time += date.getFullYear() + "г." + date.getHours() + ":";
      time += date.getMinutes() + ":" + date.getSeconds();
      return time;
    }
  // 

  // Удаление элемента списка
    delete(indexForDelete, $target) {
      const SLIDEUP_ANIMATION_DURATION = 500;
      $target
        .closest('tr')
        .find('div')
        .slideUp(SLIDEUP_ANIMATION_DURATION);

      setTimeout(function () {
        this._list.splice(indexForDelete, 1);
        this._save();
        this._updateView(this._list)
      }.bind(this), SLIDEUP_ANIMATION_DURATION);
    }
  // 

  // Загрузка и сохранение списка
    load() {
      this._list = JSON.parse(localStorage.save_list_data);
      this._updateView(this._list)
    }

    _save() {
      localStorage.save_list_data = JSON.stringify(this._list);
    }
  //

  // Поиск по списку 
    search(query) {
      this.load();
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
  // 

  // Сортировка сиска
    compare($this, keyName) {
      this._cleanClass($this)
      if (!$this.hasClass("asc")) {
        $this.removeClass("desc")
        $this.addClass("asc");
        this._list.sort(function (a, b) {
          return a[keyName] > b[keyName];
        });
      } else {
        $this.removeClass("asc")
        $this.addClass("desc");
        this._list.sort(function (a, b) {
          return a[keyName] < b[keyName];
        });
      };
      this._updateView(this._list)
    }

    _cleanClass($this) {
      $(".table th").each(function () {
        if ($this.attr('id') !== $(this).attr('id')) {
          $(this).removeClass('asc desc');
        };
      });
    }
  // 
}