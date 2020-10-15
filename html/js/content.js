;
$(function () {
    // 二级菜单数据的输入
    var str = "";
    axios.get("http://localhost:3000/chaoshi_nav").then(res => {
        res.data.forEach(item => {
            str += `<li>
                        <p class="content_nav_show_title">
                            <span>${item.title}</span>
                            <i class="iconfont icon-zhankai"></i>
                        </p>
                        <h6 class = "content_nav_show_introduce">`;
            item.introduce.forEach(introduce => {
                str += `<a href="http://127.0.0.1:5500/productList.html">${introduce}</a>`;
            });
            str += `</h6>
                    <div class="content_nav_nav_body_show">
                        <div class="content_nav_nav_body_show_main clean">
                            <ul class="content_nav_show_left">`;
            item.product.forEach(product => {
                str += `<li><p>${product.product_title}</p><h6>`;
                product.product_introduce.forEach(pro => {
                    str += `<a href="http://127.0.0.1:5500/productList.html">${pro}</a>`;
                })
                str += `</h6></li>`;
            })
            str += `</ul>`;
            if (item.imgs) {
                str += `<div class="content_nav_show_right">`;
                item.imgs.forEach(img => {
                    str += `<a href="#"><img src="${img}" ></a>`;
                });
                str += `</div>`;
            }
            str += `</div>
                </div>
            </li>`;
        })
        $("#content_nav_show").html(str);

        // 二级菜单、>的显示和隐藏
        $("#content_nav_show li").hover(function () {
            $(this).find(".icon-zhankai").css("display", "none");
            $(this).find(".content_nav_nav_body_show").css("display", "block");
        }, function () {
            $(this).find(".content_nav_nav_body_show").css("display", "none");
            $(this).find(".icon-zhankai").css("display", "block");
        })

        // 有img的二级菜单宽度为1000px
        $(".content_nav_nav_body_show").has(".content_nav_show_right").css("width", "1000px");
    
        // 休闲食品的链接
        // $("#content_nav_show").find("a:contains('休闲食品')").attr("href", "http://127.0.0.1:5500/productList.html");
    })

    // 轮播图
    var lunboIndex = 0;

    function move() {
        lunboIndex++;
        // 123456123456临界值判断
        if (lunboIndex == $(".content_nav_banner_lunbo>li").length) {
            lunboIndex = 0;
        }
        // 654321654321临界值判断
        if (lunboIndex == -1) {
            lunboIndex = $(".content_nav_banner_lunbo>li").length - 1;
        }

        // 下面横条的显示
        $(".content_nav_banner_lunbo_bottom a").removeClass("content_nav_banner_hover");
        $(".content_nav_banner_lunbo_bottom a").eq(lunboIndex).addClass("content_nav_banner_hover");

        // 显示图片
        $(".content_nav_banner_lunbo li").fadeOut();
        $(".content_nav_banner_lunbo li").eq(lunboIndex).fadeIn();
    }
    var timer = setInterval(function () {
        move();
    }, 5000);
    // <  >
    $(".content_nav_banner_lunbo_btn a:eq(0)").click(function () {
        lunboIndex -= 2;
        move();
    });
    $(".content_nav_banner_lunbo_btn a:eq(1)").click(function () {
        move();
    })
    // 点击横条的操作
    $(".content_nav_banner_lunbo_bottom a").mouseover(function () {
        lunboIndex = $(this).index() - 1;
        move();
    })
    // 当鼠标移入轮播中时
    $(".content_nav_banner_top").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(function () {
            move();
        }, 5000);
    })

    // 小轮播
    var smallIndex = 0;

    function mover() {
        smallIndex++;
        // 123456123456临界值判断
        if (smallIndex == $(".small_lunbo>li").length) {
            smallIndex = 0;
        }
        // 654321654321临界值判断
        if (smallIndex == -1) {
            smallIndex = $(".small_lunbo>li").length - 1;
        }

        // 下面横条的显示
        $(".small_lunbo_point a").removeClass("small_lunbo_point_hover");
        $(".small_lunbo_point a").eq(smallIndex).addClass("small_lunbo_point_hover");

        // 显示图片
        $(".small_lunbo li").fadeOut();
        $(".small_lunbo li").eq(smallIndex).fadeIn();
    }
    var time = setInterval(function () {
        mover();
    }, 5000);
    // 点击横条的操作
    $(".small_lunbo_point a").mouseover(function () {
        smallIndex = $(this).index() - 1;
        mover();
    })
    // 当鼠标移入轮播中时
    $(".content_nav_right_bottom>div").hover(function () {
        clearInterval(time);
    }, function () {
        time = setInterval(function () {
            mover();
        }, 5000);
    })


    // 超值量贩
    var str1 = "";
    var str2 = "";
    axios.get("http://localhost:3000/chaoshi_czlf").then(res => {
        res.data.top.forEach(item => {
            str1 += `<li>
                        <div class="content_czlf_middle_top">
                            <a href="#"><img src="${item.img}" alt=""></a>
                            <a href="#">${item.introduce}</a>
                            <p>超值量贩定制款</p>
                        </div>
                        <div class="content_czlf_middle_bottom clean">
                            <div class="content_czlf_middle_bottom_main">
                                <p>
                                    量贩价：¥${item.price}
                                </p>
                            </div>
                            <a href="#">
                                <i class="iconfont icon-gouwuche"></i>
                                <span>加入购物车</span>
                            </a>
                        </div>
                    </li>`;
        });
        $(".content_czlf_middle").html(str1);

        res.data.bottom.forEach(item => {
            str2 += `<li>
                        <a href="#" class="content_czlf_bottom_list_main">
                            <img src="${item.img}" alt="">
                            <p>${item.title}</p>
                        </a>
                        <p>${item.introduce}</p>
                        <p>￥${item.price}</p>
                        <a href="#"><i class="iconfont icon-gouwuche"></i></a>
                    </li>`;
        })
        $(".content_czlf_bottom_list>ul").html(str2);
    })

    // 品牌特卖
    var str3 = "";
    var str4 = "";
    axios.get("http://localhost:3000/chaoshi_pptm").then(res => {
        str3 += `<a href="#"><img src="${res.data.hot}" alt=""></a>
                 <div class="fl">`;
        res.data.top.forEach(item => {
            str3 += `<a href="#"><img src="${item}" alt=""></a>`;
        })
        str3 += `</div>`;
        $(".content_pptm_middle").html(str3);

        str4 += `<div>`;
        res.data.bottom.forEach(item => {
            str4 += `<a href="#"><img src="${item}" alt=""></a>`;
        })
        str4 += `</div>
                 <a href="#"><img src="../img/chaoshi_pptm/pptm.png" alt=""></a>`;
        $(".content_pptm_bottom").html(str4);
    })

    // 热卖商品
    // 轮播图
    let rmList = document.querySelector(".content_rmsp_main_lunbo");
    var rmIndex = 0;

    function rmMove() {
        rmIndex++;
        // 1212临界值的判断
        if (rmIndex == $(".content_rmsp_main_lunbo>ul").length) {
            $(".content_rmsp_main_lunbo").css("left", "0");
            rmIndex = 1;
        }
        // 2121临界值的判断
        if (rmIndex == -1) {
            $(".content_rmsp_main_lunbo").css("left", ($(".content_rmsp_main_lunbo>ul").length - 1) * ($(".content_rmsp_main_lunbo>ul").width()) + "px");
            rmIndex = $(".content_rmsp_main_lunbo>ul").length - 2;
        }

        startMove(rmList, {
            "left": -$(".content_rmsp_main_lunbo>ul").width() * rmIndex
        })
    }
    var rmtimer = setInterval(function () {
        rmMove();
    }, 5000);
    $(".content_rmsp_main_lunbo_btn>span:eq(0)").click(function () {
        rmIndex -= 2;
        rmMove();
    })
    $(".content_rmsp_main_lunbo_btn>span:eq(1)").click(function () {
        rmMove();
    })
    $(".content_rmsp_main").hover(function () {
        clearInterval(rmtimer);
    }, function () {
        rmtimer = setInterval(function () {
            rmMove();
        }, 5000);
    })
    // content_rmsp_main_lunbo中的内容
    var str5 = `<ul>`;
    var str6 = `<ul>`;
    axios.get("http://localhost:3000/chaoshi_rmsp").then(res => {
        res.data.one.forEach(item => {
            str5 += `<li>
                    <a href="#"><img src="${item.img}" alt=""></a>
                    <p>${item.title}</p>
                    <p>¥${item.price}</p>
                    <a href="#">
                        <i class="iconfont icon-gouwuche"></i>
                        <span>加入购物车</span>
                    </a>
                </li>`;
        })
        str5 += `</ul>`;
        res.data.two.forEach(item => {
            str6 += `<li>
                    <a href="#"><img src="${item.img}" alt=""></a>
                    <p>${item.title}</p>
                    <p>¥${item.price}</p>
                    <a href="#">
                        <i class="iconfont icon-gouwuche"></i>
                        <span>加入购物车</span>
                    </a>
                </li>`;
        })
        str6 += `</ul>`;

        var str56 = str5 + str6 + str5;
        $(".content_rmsp_main_lunbo").html(str56);
    })

    // 奶制品
    var str7 = "";
    var str8 = `<ul class="clean">`;
    axios.get("http://localhost:3000/chaoshi_nzp").then(res => {
        str7 += `<a href="#"><img src="${res.data.background}" alt=""></a>
        <div>`;
        res.data.introduce.forEach(item => {
            str7 += `<a href="#">${item}</a>`;
        });
        str7 += `</div>`;
        $(".content_nzp_left").html(str7);
        res.data.product.forEach(item => {
            str8 += `<li>
                        <a href="#"><img src="${item.img}" alt=""></a>
                        <p>${item.title}</p>
                        <p>${item.price}</p>
                        <a href="#">
                            <i class="iconfont icon-gouwuche"></i>
                            <span>加入购物车</span>
                        </a>
                    </li>`;
        })
        str8 += `</ul>`;
        $(".content_nzp_right").html(str8);
    })

    // 清洁用品
    var str9 = "";
    var str10 = `<ul class="clean">`;
    axios.get("http://localhost:3000/chaoshi_qjyp").then(res => {
        str9 += `<a href="#"><img src="${res.data.background}" alt=""></a>
        <div>`;
        res.data.introduce.forEach(item => {
            str9 += `<a href="#">${item}</a>`;
        });
        str9 += `</div>`;
        $(".content_qjyp_left").html(str9);
        res.data.product.forEach(item => {
            str10 += `<li>
                        <a href="#"><img src="${item.img}" alt=""></a>
                        <p>${item.title}</p>
                        <p>${item.price}</p>
                        <a href="#">
                            <i class="iconfont icon-gouwuche"></i>
                            <span>加入购物车</span>
                        </a>
                    </li>`;
        })
        str10 += `</ul>`;
        $(".content_qjyp_right").html(str10);
    })

    
})