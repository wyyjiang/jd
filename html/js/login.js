;
$(function () {
    // 扫码登录、账户登录切换
    $(".content_login>span").click(function () {
        $(this).parent().siblings().find("span").removeClass("checked");
        $(this).addClass("checked");
    })

    // - 账户登录
    $(".login_item1>input").focus(function () {
        $(".login_item1>i").css("background-position", "0 -48px");
    })
    $(".login_item1>input").focusout(function () {
        if (!$(".login_item1>input").val()) {
            $(".login_item1>i").css("background-position", "0 0");
        }
    })

    // ✖
    $(".login_item1>input,.login_item2>input").keyup(function () {
        if ($(this).val()) {
            $(this).parent().find("span").css("display", "block");
        } else {
            $(this).parent().find("span").css("display", "none");
        }
    })
    $(".login_item1>span,.login_item2>span").click(function () {
        $(this).parent().find("input").val("");
        $(this).css("display", "none");
    })

    // 登录
    var loginFlag = false;
    var userID = null;
    $(".login_item4>div").click(function () {
        var username = $(".login_item1>input").val();
        var userpsw = $(".login_item2>input").val();

        axios.get("http://localhost:3000/user?username=" + username).then(res => {
            if (res.data.length) {
                if (res.data[0].password == userpsw) {
                    $(".message_tip_ok").css("display", "block");
                    $(".message_tip_error").css("display", "none");
                    loginFlag = true;
                    userID = res.data[0].id;
                } else {
                    $(".message_tip_ok").css("display", "none");
                    $(".message_tip_error").css("display", "block");
                    loginFlag = false;
                }
            } else {
                axios.get("http://localhost:3000/user?email=" + username).then(res => {
                    if (res.data.length) {
                        if (res.data[0].password == userpsw) {
                            $(".message_tip_ok").css("display", "block");
                            $(".message_tip_error").css("display", "none");
                            loginFlag = true;
                            userID = res.data[0].id;
                        } else {
                            $(".message_tip_ok").css("display", "none");
                            $(".message_tip_error").css("display", "block");
                            loginFlag = false;
                        }
                    } else {
                        axios.get("http://localhost:3000/user?phone=" + username).then(res => {
                            if (res.data.length) {
                                if (res.data[0].password == userpsw) {
                                    $(".message_tip_ok").css("display", "block");
                                    $(".message_tip_error").css("display", "none");
                                    loginFlag = true;
                                    userID = res.data[0].id;
                                } else {
                                    $(".message_tip_ok").css("display", "none");
                                    $(".message_tip_error").css("display", "block");
                                    loginFlag = false;
                                }
                            } else {
                                $(".message_tip_ok").css("display", "none");
                                $(".message_tip_error").css("display", "block");
                                loginFlag = false;
                            }
                        })
                    }
                })
            };
            if (loginFlag) {
                setCookie("userID", userID);
                var sum = 0;
                axios.get("http://localhost:3000/user/" + userID).then(res => {
                    res.data.product.forEach(item => {
                        sum += parseInt(item.pro_num);
                    });
                    setCookie("userNum", sum);
                    location.href = "http://127.0.0.1:5500/index.html";
                })

                

            }
        })
    })

})