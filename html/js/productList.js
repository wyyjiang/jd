;
$(function () {

    axios.get("http://localhost:3000/xxfood").then(res => {
        // 搜索框
        $("#logo_input").val(res.data.title);
        // 搜索框下的提示
        var str1 = "";
        res.data.introduce.forEach(item => {
            str1 += `<a href="#">${item}</a>
            <i>|</i>`;
        });
        $(".logo4").html(str1);
        // searchBar
        $(".searchBar>span").text("\"" + res.data.title + "\"");
        // brand
        var str2 = "<ul>";
        res.data.brand.forEach(item => {
            str2 += `<li><a href="#">`;
            if (item.img) {
                str2 += `<img src="${item.img}" alt="">`;
            }
            str2 += `${item.name}
            </a></li>`;
        })
        str2 += "</ul>";
        $(".s-brand-value").html(str2);
        // brand下面的4个div
        var str3 = "";
        res.data.type.forEach(item => {
            str3 += `<div>
                        <div class="s-key">
                            <p>${item.title}：</p>
                        </div>
                        <div class="s-value">
                            <div class="s-list">
                                <ul>`;
            item.types.forEach(product => {
                str3 += `<li><a href="#">${product}</a></li>`;
            })
            str3 += `</ul>
                            </div>
                        </div>
                    </div>`;
        })
        $(".s-introduce").html(str3);
        // asideproduct
        var str4 = "";
        res.data.aside.forEach(item => {
            str4 += `<li>
                        <div class="a_img">
                            <a href="#"><img src="${item.img}" alt=""></a>
                        </div>
                        <div class="a_price">
                            <p>￥${item.price}</p>
                        </div>
                        <div class="a_introduce">
                            <p>${item.title}</p>
                        </div>
                        <div class="a_comm">
                            已有<span>${item.evaluate}</span>人评论
                        </div>
                    </li>`;
        })
        $(".aside_main").html(str4);
        // product
        var str5 = "";
        res.data.mainfood.forEach(item => {
            str5 += `       <li>
                                <div class="good_main">
                                    <div class="p_img">
                                        <a href="http://127.0.0.1:5500/detail.html" data-id="${item.id}"><img src="${item.img}" alt=""></a>
                                    </div>
                                    <div class="p_price">
                                        ￥<span>${item.price}</span>
                                    </div>
                                    <div class="p_name">
                                        ${item.title}
                                    </div>
                                    <div class="p_commit">
                                        <a href="#">${item.evaluate}</a>
                                        条评价
                                    </div>
                                    <div class="p_shop">
                                        <a href="#">${item.store}</a>
                                        <i></i>
                                    </div>
                                    <div class="p_icons">`;
            if (item.server) {
                item.server.forEach(s => {
                    str5 += `<i>${s}</i>`;
                });
            }
            str5 += `               </div>
                                    <div class="p_operate">
                                        <span>
                                            <i></i>对比
                                        </span>
                                        <span>
                                            <i></i>关注
                                        </span>
                                        <span class="add-product" data-id="${item.id}">
                                            <i></i>加入购物车
                                        </span>
                                    </div>
                                </div>
                            </li>`;
        });
        $(".good").html(str5);

        $(".p_img>a").click(function () {
            setCookie("productID", $(this).attr("data-id"), 7);
        })

        // 登录时加入购物车
        $(".add-product").click(function () {
            // 当没登录时，提示
            if (!getCookie("userID")) {
                alert("加入购物车失败，请先登录！");
            } else {
                // 登录时加入购物车
                var userID = getCookie("userID"); // 当前用户的id
                var proID = $(this).attr("data-id"); // 当前商品的id
                axios.get("http://localhost:3000/user?id=" + userID).then(res => {
                    var flag = false;
                    res.data[0].product.forEach(item => {
                        if (item.pro_id == proID) {
                            item.pro_num++;
                            flag = true;
                        }
                    })
                    if (!flag) {
                        var str = {
                            "pro_id": proID - 0,
                            "pro_num": 1
                        };
                        res.data[0].product.push(str);
                    }
                    axios.patch("http://localhost:3000/user/" + userID, {
                        "product": res.data[0].product
                    });
                    alert("加入购物车成功！");
                });
                setCookie("userNum", getCookie("userNum") - 0 + 1);
                $(".logo3_num").text(getCookie("userNum"));
            }
        })
    });
    $(".logo3_num").text(getCookie("userNum"));
})