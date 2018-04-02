import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import 'jquery.maskedinput/src/jquery.maskedinput.js';

import PhoneList from './PhoneList';

class App {
    constructor() {
        this.plist = new PhoneList(this.updateView);
        this.$btnAdd = $("#btnAdd");
        this.initPlugins();
        this.setHandlers();
    }

    /**
     * Инициализация плагинов
     */
    initPlugins() {
        $("#phone").mask("+7 (999) 999-9999");
        this.$btnAdd.popover({
            content: 'Введите все данные',
            placement: 'top',
            trigger: 'manual'
        });
    }

    setHandlers() {
        var self = this;

        this.$btnAdd.click(function (event) {
            self.valid();
        });

        $(".textAdd").keypress(function (e) {
            if (e.which === 13) {
                self.valid();
            }
        });

        // Поиск по списку
        $("#search").keyup(function (e) {
            self.plist.search($(this).val());
        });

        // Сортировка сиска
        $("#btnSortName").click(function () {
            self.search($(this), 'name');
        });

        $("#btnSortLname").click(function () {
            self.search($(this), 'lastname');
        });

        $("#btnSortPhone").click(function () {
            self.search($(this), 'phone');
        });

        // Удаление элемента списка
        $("#tbodyPlus").click(function (event) {
            var $target = $(event.target);
            var index = $target.attr('index');

            if ($target.is('.btnDel')) {
                const SLIDEUP_ANIMATION_DURATION = 500;
                $target
                    .closest('tr')
                    .find('div')
                    .slideUp(SLIDEUP_ANIMATION_DURATION);

                setTimeout(function () {
                    self.plist.delete(index);
                }, SLIDEUP_ANIMATION_DURATION);
            }
        });
    }
    compare($this, keyName) {
        this.cleanClass($this);
        if (!$this.hasClass("asc")) {
            $this.removeClass("desc")
                .addClass("asc");
                self.plist.sorting(true, keyName);
        } else {
            $this.removeClass("asc")
                .addClass("desc");
                self.plist.sorting(false, keyName);
        }
    }
    cleanClass($this) {
        $(".table th").each(function () {
            if ($this.attr('id') !== $(this).attr('id')) {
                $(this).removeClass('asc desc');
            };
        });
    }


    valid() {
        var name = $("#name").val();
        var lastname = $("#lname").val();
        var phone = $("#phone").val();
        if (!name || !lastname || !phone) {
            this.$btnAdd.popover("show");
            setTimeout(function () {
                this.$btnAdd.popover('hide');
            }, 2000);
            return true;
        }
        this.plist.add(name, lastname, phone);
    };

    updateView(list) {

        var tb_plus = [];

        if (list.length) {
            list.forEach(function (item, index) {
                var actualIndex = index + 1;
                var tb_str = "<tr>";
                tb_str += "<td><div>" + actualIndex + "</div></td>";
                tb_str += "<td><div>" + item.name + "</div></td>";
                tb_str += "<td><div>" + item.lastname + "</div></td>";
                tb_str += "<td><div>" + item.phone + "</div></td>";
                tb_str += "<td><div><button class='btn btn-danger btnDel' type='button' data-index='" + index + "'>";
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
}
$(document).ready( function(){
var programm = new App();
});