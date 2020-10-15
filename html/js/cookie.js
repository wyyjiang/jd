//key value time
function setCookie(k, v, t) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + t);
    document.cookie = k + "=" + v + ";expires=" + oDate;
}
//key
function getCookie(k) {
    var str = document.cookie;
    var arr = str.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var newArr = arr[i].split("=");
        if (newArr[0] == k) {
            return newArr[1];
        }
    }
}
//key
function removeCookie(k) {
    setCookie(k, 1, -1);
}