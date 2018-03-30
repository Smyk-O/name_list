$(document).ready(function () {
  var $btnAdd = $("#btnAdd");
  var plist = new PhoneList(updateView);
  const SLIDEUP_ANIMATION_DURATION = 500;

  // $("#phone").mask("+7 (999) 999-9999");

  // $btnAdd.popover({
  //   content: 'Введите все данные',
  //   placement: 'top',
  //   trigger: 'manual'
  // });

  // $btnAdd.click(function (event) {
  //   valid();
  // });

  // $(".textAdd").keypress(function (e) {
  //   if (e.which === 13) {
  //     valid();
  //   }
  // });
  

  // Поиск по списку 
  // $("#search").keyup(function (e) {
  //   plist.search($(this).val());
  // });
  // 

  // Сортировка сиска
  // $("#btnSortName").click(function () {
  //   compare($(this), 'name');
  // });

  // $("#btnSortLname").click(function () {
  //   compare($(this), 'lastname');
  // });

  // $("#btnSortPhone").click(function () {
  //   compare($(this), 'phone');
  // });

  // валидация и добавление элемента списка
  // function valid(event) {
  //   var name = $("#name").val();
  //   var lastname = $("#lname").val();
  //   var phone = $("#phone").val();

  //   if (!name || !lastname || !phone) {
  //     $btnAdd.popover("show");
  //     setTimeout(function () {
  //       $btnAdd.popover('hide');
  //     }, 2000);
  //     return true;
  //   }
  //   plist.add(name, lastname, phone);
  // };

  // function compare($this, keyName) {
  //   cleanClass($this);
  //   if (!$this.hasClass("asc")) {
  //     $this.removeClass("desc")
  //          .addClass("asc");
  //     plist.sorting(true, keyName);
  //   } else {
  //     $this.removeClass("asc")
  //          .addClass("desc");
  //     plist.sorting(false, keyName);
  //   }
  // }
  // function cleanClass($this) {
  //   $(".table th").each(function () {
  //     if ($this.attr('id') !== $(this).attr('id')) {
  //       $(this).removeClass('asc desc');
  //     };
  //   });
  // }
  //

  // // Удаление элемента списка
  // $("#tbodyPlus").click(function (event) {
  //   var $target = $(event.target);
  //   var index = $target.attr('index');

  //   if ($target.is('.btnDel')) { // кнопка
  //     $target
  //       .closest('tr')
  //       .find('div')
  //       .slideUp(SLIDEUP_ANIMATION_DURATION);

  //     setTimeout(function () {
  //       plist.delete(index);
  //     }, SLIDEUP_ANIMATION_DURATION);
  //   }
  // });
  // // 

  // Обнавление спискапри взаимодействии с ним
  // function updateView(list) {

  //   var tb_plus = [];

  //   if (list.length) {
  //     list.forEach(function (item, index) {
  //       var actualIndex = index + 1;
  //       var tb_str = "<tr>";
  //       tb_str += "<td><div>" + actualIndex + "</div></td>";
  //       tb_str += "<td><div>" + item.name + "</div></td>";
  //       tb_str += "<td><div>" + item.lastname + "</div></td>";
  //       tb_str += "<td><div>" + item.phone + "</div></td>";
  //       tb_str += "<td><div><button class='btn btn-danger btnDel' type='button' data-index='" + index + "'>";
  //       tb_str += "<i class='material-icons'>clear</i></button></div></td>";
  //       tb_str += "</tr>";
  //       tb_plus.push(
  //         tb_str
  //       )
  //     });
  //   } else {
  //     tb_plus = '<tr><td colspan="5" class="text-center p-3">Нет записей</td></tr>';
  //   }
  //   $("#tbodyPlus").html(tb_plus);
  //   $(".textAdd").val("");
  // }
  // 
});
