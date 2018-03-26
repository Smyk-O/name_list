$(document).ready(function () {

  var list_item = [];
  var $btnAdd = $("#btnAdd");

  if (localStorage.save_list_data) {
    load_list()
    updateView();
  }

  $("#phone").mask("+7 (999) 999-9999");


  $btnAdd.popover({
    content: 'Введите все данные',
    placement: 'top',
    trigger: 'manual'
  });

  $(".textAdd").keypress(function (e) {
    if (e.which === 13) {
      valid();
    }
  });

  $btnAdd.click(function (event) {
    valid();
  });
  // не лучше ли искать в рамках хотябы таблицы? заместо body
  $(".table").click(function (event) {
    var target = event.target;
    if (target.matches('.btnDel')) {
      var $delN = $(".del" + target.dataset.index);
      // применел до того как нашол метод toggle
      // $($delN).slideUp(500);
      $($delN).slideToggle(500);
      setTimeout(function () { deleteFromModel(target.dataset.index) }, 500);
    }
  });

  $("#btnSortName").click(function () {
    compare($(this), 'name');
  });

  $("#btnSortLname").click(function () {
    compare($(this), 'lastname');
  });

  $("#btnSortPhone").click(function () {
    compare($(this), 'phone');
  });

  function compare($this, keyName) {
    cleanClass($this)

    if (!$this.hasClass("asc")) {
      $this.removeClass("desc")
      $this.addClass("asc");

      list_item.sort(function (a, b) {
        return a[keyName] > b[keyName];
      });

    } else {
      $this.removeClass("asc")
      $this.addClass("desc");

      list_item.sort(function (a, b) {
        return a[keyName] < b[keyName];
      });

    };

    updateView();
  }

  function cleanClass($this) {
    $(".table th").each(function () {
      if ($this.attr('id') !== $(this).attr('id')) {
        $(this).removeClass('asc desc');
      };
    });
  }

  function valid(event) {
    var name = $("#name").val();
    var lastname = $("#lname").val();
    var phone = $("#phone").val();

    if (!name || !lastname || !phone) {
      $btnAdd.popover("show");
      setTimeout(function () {
        $btnAdd.popover('hide');
      }, 2000);
      return true;
    }

    addtolist_item(name, lastname, phone)
  }

  function deleteFromModel(indexForDelete) {
    list_item.splice(indexForDelete, 1);
    save_list(list_item);
    updateView();
  }

  function addtolist_item(name, lastname, phone) {
    list_item.push({
      name: name,
      lastname: lastname,
      phone: phone,
      addata: time()
    });
    save_list(list_item);
    updateView();
  }

  function updateView() {

    var tb_plus = [];

    list_item.forEach(function (item, index) {
      var actualIndex = index + 1;
      var tb_str = "<tr>";
      tb_str += "<td class='pt-1 pb-1'><div class='del" + index + "'>" + actualIndex + "</div></td>";
      tb_str += "<td class='pt-1 pb-1'><div class='del" + index + "'>" + item.name + "</div></td>";
      tb_str += "<td class='pt-1 pb-1'><div class='del" + index + "'>" + item.lastname + "</div></td>";
      tb_str += "<td class='pt-1 pb-1'><div class='del" + index + "'>" + item.phone + "</div></td>";
      tb_str += "<td class='pt-1 pb-1'><div class='del" + index + "'><button class='btn btn-danger btn-sm btnDel' type='button' data-index='" + index + "'>";
      tb_str += "<i class='material-icons'>clear</i></button></div></td>";
      tb_str += "</tr>";
      tb_plus.push(
        tb_str
      )
    });

    $("#tbodyPlus").html(tb_plus);
    // применел до того как нашол метод toggle
    // также делал через div пропысаный внутрь td - из всех метадов этот лучше всего работал но решил пробовать через toqqle
    $('tbody tr').slideToggle(0);
    $(".textAdd").val("");
  }


  function save_list(save_list) {
    localStorage.save_list_data = JSON.stringify(save_list);
  }

  function time() {
    var date = new Date();
    var time = date.getDate() + "." + date.getMonth() + ".";
    time += date.getFullYear() + "г." + date.getHours() + ":";
    time += date.getMinutes() + ":" + date.getSeconds();
    return time;
  }

  $("#search").keyup(function (e) {

    var $this = $(this);
    var query = $this.val();
    load_list()

    list_item = list_item.filter(function (item) {
      var str = item.name + "°" + item.lastname + "°" + item.phone;
      if (str.toLowerCase().includes(query)) {
        return true;
      } else {
        return false;
      }
    });
    updateView();

    // я пытался но работает не коректно:(
    // var _this = this;
    // console.log($(_this).val())
    // if ($(_this).val() === "") {
    //   list_item = JSON.parse(localStorage.save_list_data);
    //   updateView();
    // } else {
    //   list_item.forEach(function (item, index) {
    //     var str = item.name + "|" + item.lastname + "|" + item.phone;
    //     if (str.toLowerCase().indexOf($(_this).val().toLowerCase()) !== -1) {
    //     } else {
    //       deleteFromModel(index);
    //     }
    //   });
    // }
  });

  function load_list() {
    list_item = JSON.parse(localStorage.save_list_data);
  }

});

