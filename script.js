$(document).ready(function () {

  var list_item = [];

  $(function ($) {
    list_item = localStorage.save_list_data ? JSON.parse(localStorage.save_list_data) : [];
    updateView();
  });

  $(function ($) {
    $("#phone").mask("+7(999) 999-9999");
  });

  $("#btnAdd").popover({
    content: 'Введите все данные',
    placement: 'top',
    trigger: 'manual'
  });

  $(".textAdd").keypress(function (e) {
    if (e.which === 13) {
      valid();
    }
  });

  $("#btnAdd").click(function (event) {
    valid();
  });

  $('body').click(function (event) {
    var target = event.target;
    if (target.matches('.btnDel')) {

      deleteFromModel(target.dataset.index);
    }

  });

  $("#btnSortName").click(function (event) {
    list_item.sort(compareName);
    updateView();
  });

  $("#btnSortLname").click(function (event) {
    list_item.sort(compareLname);
    updateView();
  });

  $("#btnSortPhone").click(function (event) {
    list_item.sort(comparePhone);
    updateView();
  });

  function valid(event) {
    var name = $("#name").val();
    var lastname = $("#lname").val();
    var phone = $("#phone").val();


    if (!name || !lastname || !phone) {
      $("#btnAdd").popover("show");
      setTimeout(function () {
        $("#btnAdd").popover('hide');
      }, 2000);
      return true;
    }

    addtolist_item(name, lastname, phone)
  }

  function deleteFromModel(indexForDelete) {
    list_item.splice(indexForDelete, 1);
    updateView();
  }

  function addtolist_item(name, lastname, phone) {
    list_item.push({
      name: name,
      lastname: lastname,
      phone: phone
    });
    updateView();
  };

  function updateView() {

    var tb_plus = [];

    list_item.forEach(function (item, index) {
      var actualIndex = index + 1;

      var tb_str = "<tr>";
      tb_str += "<td>" + actualIndex + "</td>";
      tb_str += "<td>" + item.name + "</td>";
      tb_str += "<td>" + item.lastname + "</td>";
      tb_str += "<td>" + item.phone + "</td>";
      tb_str += "<td> <button class='btn btn-danger btn-sm btnDel' type='button' data-index='" + index + "'>";
      tb_str += "<i class='material-icons'>clear</i></button></td>";
      tb_str += "</tr>";
      tb_plus.push(
        tb_str
      )
    });
    save_list(list_item)
    $("#tbodyPlus").html(tb_plus);
    $(".textAdd").val("");
  };
});

function save_list(save_list_data) {
  localStorage.save_list_data = JSON.stringify(save_list_data);
};

function compareName(nameA, nameB) {
  return nameA.name > nameB.name;
};

function compareLname(lnameA, lnameB) {
  return lnameA.lastname > lnameB.lastname;
};

function comparePhone(phoneA, phoneB) {
  return phoneA.phone > phoneB.phone;
};