;
$(function () {
    // right
    $(".top").click(function () {
        $(window).scrollTop("0");
    })

    // left
    var flag = true;
    $(window).scroll(function () {
        if (flag) {
            var st = $(this).scrollTop();
            if (st >= 500) {
                $(".left").fadeIn();
            } else {
                $(".left").fadeOut();
            }

            $(".content>div:not(.content_nav)").each(function () {
                if (st >= $(this).offset().top - 50) {
                    var index = $(this).index() - 1;
                    $(".left>ul>li").eq(index).addClass("hover").siblings(":not(.last)").removeClass("hover");
                }
            })
        }
    })

    $(".left>ul>li:not(.last)").click(function () {
        flag = false;
        var index = $(this).index() + 1;
        $("html,body").stop().animate({
            "scrollTop": $(".content>div").eq(index).offset().top
        }, 500, function () {
            flag = true;
        });

        $(this).addClass("hover").siblings(":not(.last)").removeClass("hover");

    });
    $(".last").click(function () {
        flag = false;
        $("html,body").stop().animate({
            "scrollTop": 0
        }, 500, function () {
                flag = true;
                $(".left").fadeOut();
        });
    })
})