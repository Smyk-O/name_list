// var number = [];
// var name = [];
// var fName = [];
// var count = 0;

// Код для понимания:
// $("#btnAdd").click(function(){
//     x = ($("#name").val());
//     var fname = ($("#fName").val());
//     alert("Имя: " + x + " Фамилия: " + fname);
//   });

var x = 1;

$("#btnAdd").click(function(){
    $("#tbodyPlus").append(
      "<tr> <td>" + x + "</td> <td>" + $("#name").val() + "</td> <td>" + $("#fName").val() + "</td> <td> <button class='btn btn-secondary btn_size btnDel' type='button'><i class='material-icons'>clear</i></button></td></tr>"
    );
    $(".textAdd").val("");
    x ++;

    $(".btnDel").click(function(){
        $(this).closest('tr').remove();
      });
});
