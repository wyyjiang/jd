;
$(function () {

    // 电话号码正确
    var phoneFlag = false;
    // 检测号码是否正确
    $(".phone>input").focus(function () {
        if (!$(".phone>input").val()) {
            $(".item_phone>span").html("<i></i>验证完成后，你可以使用该手机登录或找回密码");
            $(".item_phone>span").css({
                "color": "#999",
                "display": "block"
            });
            $(".item_phone>span>i").css("background-position", "0 -100px");
        }
    })
    $(".phone>input").change(function () {
        $(".item_phone>span").css("display", "block");
        var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        var str = $(this).val();
        if (reg.test(str)) {
            axios.get("http://localhost:3000/user?phone=" + $(this).val()).then(res => {
                if (!res.data.length) {
                    $(".item_phone>span").html("<i></i>nice！");
                    phoneFlag = true;
                    $(".item_phone>span").css({
                        "color": "#3b4",
                        "display": "block"
                    });
                    $(".item_phone>span>i").css("background-position", "0 -117px");
                } else {
                    $(".item_phone>span").html("<i></i>手机号已注册");
                    phoneFlag = false;
                    $(".item_phone>span").css({
                        "color": "#f91",
                        "display": "block"
                    });
                    $(".item_phone>span>i").css("background-position", "-17px -100px");
                }
            })

        } else {
            $(".item_phone>span").html("<i></i>格式错误");
            phoneFlag = false;
            $(".item_phone>span").css({
                "color": "#f91",
                "display": "block"
            });
            $(".item_phone>span>i").css("background-position", "-17px -100px");
        }
    })
    $(".phone>input").focusout(function () {
        if (!$(".phone>input").val()) {
            $(".item_phone>span").css("display", "none");
            phoneFlag = false;
        }
    })
    // 跳转到第二步
    $(".item_next").click(function () {
        if (phoneFlag) {
            $(".step1_wrap").css("display", "none");
            $(".step2_wrap").css("display", "block");

            $(".content_bar_one>span").css("background-position", "0 0");
            $(".content_bar_one>span").text("");
            $(".content_bar_spacer").eq(0).css("background-position", "0 -130px");
            $(".content_bar_two>span").css({
                "background-position": "0 -200px",
                "color": "#fff"
            });
            $(".content_bar_two>p").css("color", "#3b4");
        }
    })

    // 用户名
    var usernameFlag = false;
    $(".username>input").change(function () {
        var reg1 = /^[a-zA-Z0-9_\-\u4e00-\u9fa5]{4,20}$/;
        if (reg1.test($(this).val())) {
            axios.get("http://localhost:3000/user?username=" + $(this).val()).then(res => {
                if (!res.data.length) {
                    $(".username-tip>span").html("<i></i>用户名可用");
                    usernameFlag = true;
                    $(".username-tip>span").css({
                        "color": "#3b4",
                        "display": "block"
                    });
                    $(".username-tip>span>i").css("background-position", "0 -117px");
                } else {
                    $(".username-tip>span").html("<i></i>用户名已被占用，请换一个");
                    usernameFlag = false;
                    $(".username-tip>span").css({
                        "color": "#f91",
                        "display": "block"
                    });
                    $(".username-tip>span>i").css("background-position", "-17px -117px");
                }
            })
        } else {
            $(".username-tip>span").html("<i></i>用户名输入有误");
            usernameFlag = false;
            $(".username-tip>span").css({
                "color": "#f91",
                "display": "block"
            });
            $(".username-tip>span>i").css("background-position", "-17px -117px");
        }
    })
    $(".username>input").focus(function () {
        if (!$(this).val()) {
            $(".username-tip>span").html("<i></i>支持中文、英文、数字、\"-\"、\"_\"的组合，4-20个字符");
            usernameFlag = false;
            $(".username-tip>span").css({
                "color": "#999",
                "display": "block"
            });
            $(".username-tip>span>i").css("background-position", "0 -100px");
        }
    })
    $(".username>input").focusout(function () {
        if (!$(this).val()) {
            $(".username-tip>span").css("display", "none");
            usernameFlag = false;
        }
    })
    // 密码
    var passwordFlag = false;
    $(".userpassword>input").change(function () {
        var reg2 = /^\w{8,20}$/;
        if (reg2.test($(this).val())) {
            $(".userpassword-tip>span").html("<i></i>密码可用");
            passwordFlag = true;
            $(".userpassword-tip>span").css({
                "color": "#3b4",
                "display": "block"
            });
            $(".userpassword-tip>span>i").css("background-position", "0 -117px");
        } else {
            $(".userpassword-tip>span").html("<i></i>密码格式不正确");
            passwordFlag = false;
            $(".userpassword-tip>span").css({
                "color": "#f91",
                "display": "block"
            });
            $(".userpassword-tip>span>i").css("background-position", "-17px -117px");
        }
    })
    $(".userpassword>input").focus(function () {
        if (!$(this).val()) {
            $(".userpassword-tip>span").html("<i></i>建议使用字母、数字和符号两种及以上的组合，8-20个字符");
            passwordFlag = false;
            $(".userpassword-tip>span").css({
                "color": "#999",
                "display": "block"
            });
            $(".userpassword-tip>span>i").css("background-position", "0 -100px");
        }
    })
    $(".userpassword>input").focusout(function () {
        if (!$(this).val()) {
            $(".userpassword-tip>span").css("display", "none");
            passwordFlag = false;
        }
    })
    // 重复密码
    var repeatFlag = false;
    $(".repeatpassword>input").change(function () {
        if ($(this).val() == $(".userpassword>input").val()) {
            $(".repeatpassword-tip>span").html("<i></i>密码正确");
            repeatFlag = true;
            $(".repeatpassword-tip>span").css({
                "color": "#3b4",
                "display": "block"
            });
            $(".repeatpassword-tip>span>i").css("background-position", "0 -117px");
        } else {
            $(".repeatpassword-tip>span").html("<i></i>您两次输入的密码不同，请重试");
            repeatFlag = false;
            $(".repeatpassword-tip>span").css({
                "color": "#f91",
                "display": "block"
            });
            $(".repeatpassword-tip>span>i").css("background-position", "-17px -117px");
        }
    })
    $(".repeatpassword>input").focus(function () {
        if (!$(this).val()) {
            $(".repeatpassword-tip>span").html("<i></i>请再次输入密码");
            repeatFlag = false;
            $(".repeatpassword-tip>span").css({
                "color": "#999",
                "display": "block"
            });
            $(".repeatpassword-tip>span>i").css("background-position", "0 -100px");
        }
    })
    $(".repeatpassword>input").focusout(function () {
        if (!$(this).val()) {
            $(".repeatpassword-tip>span").css("display", "none");
            repeatFlag = false;
        }
    })
    // 邮箱验证
    var emailFlag = false;
    $(".email>input").change(function () {
        var reg = /^\w+@\w+(\.\w+)+$/;
        if (reg.test($(this).val())) {
            axios.get("http://localhost:3000/user?email=" + $(this).val()).then(res => {
                if (!res.data.length) {
                    $(".email-tip>span").html("<i></i>邮箱格式正确");
                    emailFlag = true;
                    $(".email-tip>span").css({
                        "color": "#3b4",
                        "display": "block"
                    });
                    $(".email-tip>span>i").css("background-position", "0 -117px");
                } else {
                    $(".email-tip>span").html("<i></i>邮箱已注册过");
                    emailFlag = false;
                    $(".email-tip>span").css({
                        "color": "#f91",
                        "display": "block"
                    });
                    $(".email-tip>span>i").css("background-position", "-17px -117px");
                }
            })
        } else {
            $(".email-tip>span").html("<i></i>邮箱格式错误");
            emailFlag = false;
            $(".email-tip>span").css({
                "color": "#f91",
                "display": "block"
            });
            $(".email-tip>span>i").css("background-position", "-17px -117px");
        }
    })
    $(".email>input").focus(function () {
        if (!$(this).val()) {
            $(".email-tip>span").html("<i></i>验证完成后，你可以通过该邮箱登录");
            emailFlag = false;
            $(".email-tip>span").css({
                "color": "#999",
                "display": "block"
            });
            $(".email-tip>span>i").css("background-position", "0 -100px");
        }
    })
    $(".email>input").focusout(function () {
        if (!$(this).val()) {
            $(".email-tip>span").css("display", "none");
            emailFlag = false;
        }
    })

    // 立即注册
    $(".step2_next>div").click(function () {
        if (usernameFlag && passwordFlag && repeatFlag && emailFlag) {
            $(".step2_wrap").css("display", "none");
            $(".step3_wrap").css("display", "block");

            $(".content_bar").css("display", "none");
            $(".content_other").css("display", "none");
            $(".header>p").css("display", "none");

            $(".step3_wrap_top>span").text("恭喜您 " + $(".username>input").val());

            // 存储用户
            axios.post("http://localhost:3000/user", {
                username: $(".username>input").val(),
                password: $(".userpassword>input").val(),
                email: $(".email>input").val(),
                phone: $(".phone>input").val(),
                product: []
            })
        }
    })

    // 去购物
    $(".step3_wrap_bottom>span").click(function () {
        axios.get("http://localhost:3000/user?username=" + $(".username>input").val()).then(res => {
            var userID = res.data[0].id;
            setCookie("userID", userID);
            setCookie("userNum", 0);
            location.href = "index.html";
        })
    })
})