// Код для понимания:
// $("#btnAdd").click(function(){
//     x = ($("#name").val());
//     var fname = ($("#fName").val());
//     alert("Имя: " + x + " Фамилия: " + fname);
//   });

$(document).ready(function () {
  var x = 1;
  var validName = false;
  var validFname = false;

  $(".input-group").click(function (event) {
    var name = $("#name").val();
    var fName = $("#fName").val();
    console.log(name)
    if (name == "") {

    } else {
      validName = true;
    }
    if (fName == "") {

    } else {
      validFname = true;
    }

    if (validName == true && validFname == true) {
      $("#btnAdd").click(function () {
        $("#tbodyPlus").append(
          "<tr> <td id='number'>" + x + "</td> <td>" + $("#name").val() + "</td> <td>" + $("#fName").val() + "</td> <td> <button class='btn btn-secondary btn_size btnDel' type='button'><i class='material-icons'>clear</i></button></td></tr>"
        );
        $(".textAdd").val("");
        x++;
        throw new Error();
      });
    } else {
      throw new Error();
    }
    $(".btnDel").click(function () {
      $(this).closest('tr').remove();
      x--;
      throw new Error();
    });
    return
  });
});