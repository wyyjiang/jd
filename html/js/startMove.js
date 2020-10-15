function startMove(domobj, json, fn) {
    clearInterval(domobj.timer);
    domobj.timer = setInterval(function () {
        //假设都达到目标值了
        let flag = true;
        //让样式发生改变
        for (let attr in json) {
            let iTarget = json[attr]; //目标值
            if (attr == "opacity") { //判断是否是透明度的改变
                var iCur = parseInt(getStyle(domobj, "opacity") * 100);
            } else {
                var iCur = parseInt(getStyle(domobj, attr));
            }
            let iSpeed = (iTarget - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (attr == "opacity") {
                domobj.style.opacity = (iCur + iSpeed) / 100;
                domobj.style.filter = "alpha(opacity=" + (iCur + iSpeed) + ")";
            } else {
                domobj.style[attr] = iCur + iSpeed + "px";
            }

            if (iSpeed != 0) { //只要有没达到目标值的
                flag = false;
            }

        }

        if (flag) {
            clearInterval(domobj.timer);
            if (fn) { //传了第3个参数，才去执行
                fn();
            }
        }

    }, 20);

}

function getStyle(domobj, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(domobj, null)[attr];
    }

    return domobj.currentStyle[attr];
}