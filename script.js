$(document).ready(function () {

  var list_item = [];

  $("#btnAdd").popover({
    trigger: "focus"
  });

  $(document).keypress(function (e) {
    if (e.which == 13) {
      volid();
    }
  });
  
  $("#btnAdd").click(function (event) {
    volid();
  });

  $('body').click(function (event) {
    var target = event.target;
    if (target && target.matches('.btnDel')) {

      if (typeof target.dataset.index !== 'undefined') {
        deleteFromModel(target.dataset.index);
      }
    }
  });

  function volid(event) {
    var name = $("#name").val();
    var lastname = $("#fName").val();

    if (!name || !lastname) {
      return true;
    }

    addtolist_item(name, lastname)
  }

  function deleteFromModel(indexForDelete) {
    list_item.splice(indexForDelete, 1);
    updateView();
  }

  function addtolist_item(name, lastname) {
    list_item.push({
      name: name,
      lastname: lastname
    });
    console.log(list_item)
    updateView();
  };

  function updateView() {

    var tb_plus = [];

    list_item.forEach(function (item, index) {
      var actualIndex = index + 1;

      tb_str = "<tr>";
      tb_str += "<td>" + actualIndex + "</td>";
      tb_str += "<td>" + item.name + "</td>";
      tb_str += "<td>" + item.lastname + "</td>";
      tb_str += "<td> <button class='btn btn-danger btn-sm btnDel' type='button' data-index='" + index + "'>";
      tb_str += "<i class='material-icons'>clear</i></button></td>";
      tb_str += "</tr>";
      tb_plus.push(
        tb_str
      )
    });
    $("#tbodyPlus").html(tb_plus);
    $(".textAdd").val("");
  };
});