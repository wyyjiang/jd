;
$(function () {
    // 判断是否登录
    if (!getCookie("userID")) {
        $(".cart_main").css("display", "none");
        $(".cart_empty").css("display", "block");
    } else {
        $(".cart_main").css("display", "block");
        $(".cart_empty").css("display", "none");
        // 已登录
        var userID = getCookie("userID");
        var need = null;
        axios.get("http://localhost:3000/user/" + userID).then(res => {
            // console.log(res.data.product);
            need = res.data.product;
            var str = "";
            var index = 0;
            res.data.product.forEach(item => {
                var id = item.pro_id;
                axios.get("http://localhost:3000/goods?id=" + id).then(res1 => {
                    index++;
                    str += `<div class="item clean">
                                <div class="p_checkbox"><input type="checkbox" class="checkbox_one"></div>
                                <div class="p_goods">
                                    <img src="${res1.data[0].img}" alt="">
                                    <div class="p_goods_main">
                                        <div class="p_name"><i></i>${res1.data[0].title}</div>
                                        <div class="p_extend"><span></span><a href="#">选服务</a></div>
                                    </div>
                                </div>
                                <div class="p_props">
                                    <p>${res1.data[0].taste[0].t_title}</p>
                                </div>
                                <div class="p_price"><i>￥${res1.data[0].price}</i></div>
                                <div class="p_quantity">
                                    <div class="p_quantity_main clean">
                                        <span class="minus" data-id="${res1.data[0].id}" price="${res1.data[0].price}">-</span>
                                        <input type="text" class="num" value="${item.pro_num}">
                                        <span class="plus" data-id="${res1.data[0].id}" price="${res1.data[0].price}">+</span>
                                    </div>
                                </div>
                                <div class="p_sum">￥<i>${(res1.data[0].price * item.pro_num).toFixed(2)}</i></div>
                                <div class="p_ops"><span data-id="${res1.data[0].id}">删除</span></div>
                            </div>`;
                    $(".item_list").html(str);

                    // if (index == 3) {
                        // 全选
                        $("#checkbox_all").click(function () {
                            var money = 0;
                            $(".checkbox_one").prop("checked", $("#checkbox_all").prop("checked"));
                            $(".checkbox_one:checked").each(function () {
                                money += parseFloat($(this).parents(".p_checkbox").siblings(".p_sum").find("i").text());
                            })
                            $(".money").text(money.toFixed(2));
                        })
                        // 单独选
                        $(".checkbox_one").click(function () {
                            var money = 0;
                            if ($(".checkbox_one:checked").length == $(".checkbox_one").length) {
                                $("#checkbox_all").prop("checked", true);
                            } else {
                                $("#checkbox_all").prop("checked", false);
                            }
                            var money = 0;
                            $(".checkbox_one:checked").each(function () {
                                money += parseFloat($(this).parents(".p_checkbox").siblings(".p_sum").find("i").text());
                            })
                            $(".money").text(money.toFixed(2));
                        })
                        // -
                        $(".minus").click(function () {
                            if ($(this).parent().find(".num").val() != 1) {
                                $(this).parent().find(".num").val($(this).parent().find(".num").val() - 1);
                                need.forEach(item => {
                                    if (item.pro_id == $(this).attr("data-id")) {
                                        item.pro_num--;
                                    }
                                });
                                $(this).parents(".p_quantity").siblings(".p_sum").find("i").text(($(this).attr("price") * $(this).parent().find(".num").val()).toFixed(2));
                                var money = 0;
                                $(".checkbox_one:checked").each(function () {
                                    console.log($(this).parents(".p_checkbox").siblings(".p_sum").find("i").text());
                                    money += parseFloat($(this).parents(".p_checkbox").siblings(".p_sum").find("i").text());
                                })
                                $(".money").text(money.toFixed(2));
                                axios.patch("http://localhost:3000/user/" + userID, {
                                    product: need
                                });
                                setCookie("userNum", getCookie("userNum") - 1);
                                $(".cb_left>i").text(getCookie("userNum"));
                            }
                        })
                        // +
                        $(".plus").click(function () {
                            $(this).parent().find(".num").val($(this).parent().find(".num").val() - 0 + 1);
                            need.forEach(item => {
                                if (item.pro_id == $(this).attr("data-id")) {
                                    item.pro_num++;
                                }
                            });
                            $(this).parents(".p_quantity").siblings(".p_sum").find("i").text(($(this).attr("price") * $(this).parent().find(".num").val()).toFixed(2));
                            var money = 0;
                            $(".checkbox_one:checked").each(function () {
                                money += parseFloat($(this).parents(".p_checkbox").siblings(".p_sum").find("i").text());
                            })
                            $(".money").text(money.toFixed(2));
                            axios.patch("http://localhost:3000/user/" + userID, {
                                product: need
                            });
                            setCookie("userNum", parseInt(getCookie("userNum")) - 0 + 1);
                            $(".cb_left>i").text(getCookie("userNum"));
                        });
                        // 删除
                        $(".p_ops>span").click(function () {
                            var proID = $(this).attr("data-id");
                            need.forEach(item => {
                                if (item.pro_id == proID) {
                                    var index = $.inArray(item, need);
                                    need.splice(index, 1);
                                    axios.patch("http://localhost:3000/user/" + userID, {
                                        product: need
                                    });
                                }
                            });
                            $(this).parents(".item").remove();
                            var money = 0;
                            $(".checkbox_one:checked").each(function () {
                                money += parseFloat($(this).parents(".p_checkbox").siblings(".p_sum").find("i").text());
                            })
                            $(".money").text(money.toFixed(2));
                            var deleteNum = $(this).parents(".item").find(".num").val();
                            setCookie("userNum", getCookie("userNum") - deleteNum);
                            $(".cb_left>i").text(getCookie("userNum"));
                            // 判断全选
                            if ($(".checkbox_one:checked").length == $(".checkbox_one").length) {
                                $("#checkbox_all").prop("checked", true);
                            } else {
                                $("#checkbox_all").prop("checked", false);
                            }
                        });
                        // input改变
                        $(".num").change(function () {
                            console.log("aa");
                            var proID = $(this).siblings(".plus").attr("data-id");
                            var productNum = 0;
                            need.forEach(item => {
                                if (item.pro_id == proID) {
                                    item.pro_num = parseInt($(".num").val());
                                    axios.patch("http://localhost:3000/user/" + userID, {
                                        product: need
                                    }).then(res => {
                                        console.log(res.data.product);
                                        res.data.product.forEach(item => {
                                            productNum += item.pro_num;
                                        })
                                        setCookie("userNum", productNum);
                                        $(".cb_left>i").text(getCookie("userNum"));
                                    });
                                }
                            });
                            $(this).parents(".p_quantity").siblings(".p_sum").find("i").text(($(this).siblings(".plus").attr("price") * $(".num").val()).toFixed(2));
                            var money = 0;
                            $(".checkbox_one:checked").each(function () {
                                money += parseFloat($(this).parents(".p_checkbox").siblings(".p_sum").find("i").text());
                            });
                            $(".money").text(money.toFixed(2));
                        })
                    // }
                })
            });
            $(".cb_left>i").text(getCookie("userNum"));

        })
    }
})