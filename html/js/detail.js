;
$(function () {
    var productID = getCookie("productID");
    axios.get("http://localhost:3000/xxfood").then(res => {
        res.data.mainfood.forEach(item => {
            if (item.id == productID) {
                // 放大镜图片
                $(".middleArea>img").attr("src", item.img);
                $(".bigArea>img").attr("src", item.img);
                // title
                $(".item_name>span").text(item.title);
                // price
                $(".p_right>i").text(item.price);
                // evaluate
                $(".p_com>a").text(item.evaluate);
                if (item.arrive) {
                    $(".item_jd>span").text(item.arrive);
                }
                if (item.weight) {
                    var str = "";
                    str = `<h3>重量</h3>
                    <p>${item.weight}</p>`;
                    $(".item_weight").html(str);
                }
                var str = "";
                item.taste.forEach(product => {
                    str += `<div>
                                <a href="#">
                                    <img src="${product.t_img}" alt="">
                                    <i>${product.t_title}</i>
                                </a>
                            </div>`;
                })
                $(".item_main_right").html(str);
            }
        });
    });

    // 放大镜zoom
    $(".middleArea").hover(function () {
        $(".zoom").css("display", "block");
        $(".bigArea").css("display", "block");
    }, function () {
        $(".zoom").css("display", "none");
        $(".bigArea").css("display", "none");
    });
    $(".middleArea").mousemove(function (e) {
        let x = e.pageX - $(this).offset().left - $(".zoom").outerWidth() / 2;
        let y = e.pageY - $(this).offset().top - $(".zoom").outerHeight() / 2;
        let mw = $(this).outerWidth() - $(".zoom").outerWidth();
        let mh = $(this).outerHeight() - $(".zoom").outerHeight();
        x = x <= 0 ? 0 : x >= mw ? mw : x;
        y = y <= 0 ? 0 : y >= mh ? mh : y;
        // 放大镜
        $(".zoom").css({
            left: x,
            top: y
        })
        // bigArea
        $(".bigArea>img").css({
            left: -x * $(".bigArea>img").outerWidth() / $(".middleArea>img").outerWidth(),
            top: -y * $(".bigArea>img").outerHeight() / $(".middleArea>img").outerHeight()
        })
    });

    // 加入购物车
    $("#num").change(function () {
        if ($("#num").val() <= 0) {
            $("#num").val("1");
            $("#minus").css({
                cursor: "not-allowed",
                color: "#ccc"
            });
        } else {
            if ($("#num").val() == 1) {
                $("#minus").css({
                    cursor: "not-allowed",
                    color: "#ccc"
                });
            } else {
                $("#minus").css({
                    cursor: "pointer",
                    color: "#666"
                });
            }
        }
    })
    $("#minus").click(function () {
        if ($("#num").val() == 1) {

        } else if ($("#num").val() == 2) {
            $("#num").val($("#num").val() - 1);
            $("#minus").css({
                cursor: "not-allowed",
                color: "#ccc"
            });
        } else {
            $("#num").val($("#num").val() - 1);
        }
    });
    $("#plus").click(function () {
        $("#num").val($("#num").val() - 0 + 1);
        $("#minus").css({
            cursor: "pointer",
            color: "#666"
        });
    });
    // 加入购物车
    $(".add").click(function () {
        if (!getCookie("userID")) {
            alert("加入购物车失败，请先登录！");
        } else {
            var num = $("#num").val();
            var userID = getCookie("userID");
            axios.get("http://localhost:3000/user/" + userID).then(res => {
                var need = res.data.product;
                var flag = false;
                need.forEach(item => {
                    if (item.pro_id == productID) {
                        item.pro_num += parseInt(num);
                        flag = true;
                    }
                });
                if (!flag) {
                    need.push({
                        "pro_id": productID,
                        "pro_num": num
                    });
                }
                axios.patch("http://localhost:3000/user/" + userID, {
                    product: need
                }).then(function () {
                    alert("加入购物车成功！");
                    $("#num").val("1");
                    $("#minus").css({
                        cursor: "not-allowed",
                        color: "#ccc"
                    });
                });
            });
            setCookie("userNum", parseInt(getCookie("userNum")) + parseInt(num));
            $(".logo3_num").text(getCookie("userNum"));
        }
        
    });
    $(".logo3_num").text(getCookie("userNum"));
})