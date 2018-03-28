$(document).ready(function () {
  var $btnAdd = $("#btnAdd");
  var plist = new PhoneList(updateView);

  $("#phone").mask("+7 (999) 999-9999");

  $btnAdd.click(function (event) {
    valid();
  });

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

  
  // валидация и добавление элемента списка
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
      plist.add(name, lastname, phone);
    };
  // 

  // Поиск по списку 
    $("#search").keyup(function (e) {
      plist.search($(this).val());
    });
  // 

  // Сортировка сиска
    $("#btnSortName").click(function () {
      plist.compare($(this), 'name');
    });

    $("#btnSortLname").click(function () {
      plist.compare($(this), 'lastname');
    });

    $("#btnSortPhone").click(function () {
      plist.compare($(this), 'phone');
    });
  //

  // Удаление элемента списка
    $("#tbodyPlus").click(function (event) {
      var $target = $(event.target);
      var index = $target.attr('index');

      if ($target.is('.btnDel')) { // кнопка
        plist.delete(index, $target);
      }
    });
  // 

  // Обнавление спискапри взаимодействии с ним
    function updateView(list) {

      var tb_plus = [];

      if (list.length) {
        list.forEach(function (item, index) {
          var actualIndex = index + 1;
          var tb_str = "<tr>";
          tb_str += "<td><div>" + actualIndex + "</div></td>";
          tb_str += "<td><div>" + item.name + "</div></td>";
          tb_str += "<td><div>" + item.lastname + "</div></td>";
          tb_str += "<td><div>" + item.phone + "</div></td>";
          tb_str += "<td><div><button class='btn btn-danger btn-sm btnDel' type='button' data-index='" + index + "'>";
          tb_str += "<i class='material-icons'>clear</i></button></div></td>";
          tb_str += "</tr>";
          tb_plus.push(
            tb_str
          )
        });
      } else {
        tb_plus = '<tr><td colspan="5" class="text-center p-3">Нет записей</td></tr>';
      }
      $("#tbodyPlus").html(tb_plus);
      $(".textAdd").val("");
    }
  // 
});
