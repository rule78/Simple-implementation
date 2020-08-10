// 摘自文章https://mp.weixin.qq.com/s/gX89lZyfsGCqIfaS8LJ73Q

function debounce(fn, interval) {
    let timer = null;
    return function() {
        // 如果用户在设定的时间内再次触发,就清除掉
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    }
}

// 不考虑定时器的情况 直接加一个节流阀
function throttle(fn, interval) {
    let canRun = true; //节流阀
    return function() {
        if(!canRun) {
            return '';
        }
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, interval);
    };
}

window.onResize = throttle(function () {
    console.log(1);
}, 1000);