;
$(function () {
    // 导航
    $(".header_menu").hover(function () {
        $(this).children("div").css("display", "block");
    }, function () {
        $(this).children("div").css("display", "none");
    })
    // 登录
    if (getCookie("userID")) {
        axios.get("http://localhost:3000/user?id=" + getCookie("userID")).then(res => {
            var str = `<span>${res.data[0].username}</span>
                        <i class="iconfont icon-zhankaixiajiantou-"></i>`;
            $(".user").html(str);
        })
    }
});