;
$(function () {
    $("#logo_input").focus(function () {
        $("#logo_input_show").css("display", "block");
        if ($("#logo_input_show").html() == "") {
            $("#logo_input_show").css("display", "none");
        }
    })
    $("#logo_input").keyup(function () {
        $("#logo_input_show").css("display", "block");
        if ($("#logo_input_show").html() == "") {
            $("#logo_input_show").css("display", "none");
        }
    })
    $("#logo_input").blur(function () {
        $("#logo_input_show").css("display", "none");
    })
})

// 输入框
var logo_input = document.getElementById("logo_input");
var logo_input_show = document.getElementById("logo_input_show");

logo_input.oninput = function () {
    var val = this.value;
    var oScript = document.createElement("script");
    oScript.src = `https://suggest.taobao.com/sug?code=utf-8&q=${val}&callback=foo`;
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);
}

function foo(data) {
    var listData = data.result;
    var str = "";
    for (let i = 0; i < listData.length; i++) {
        str += `<li>${listData[i][0]}</li>`
    }
    logo_input_show.innerHTML = str;
}

