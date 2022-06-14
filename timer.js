// setTimeout最低延迟4ms
// 嵌套层数超过5层，默认设置4ms，如不超过，则默认设置1ms
// 不同浏览器最低延迟也不同

// 手写setTimeout
function setTimeout(fn, interval) {
    let now = Date.now();
    let bool = true;

    while(bool) {
        if(Date.now() - now >= interval) {
            bool = true;
            fn();
        }
    }
}

// 手写setInterval
function cSetInterval(fn, interval) {
    // let timerId = null;
    // let bool = false;

    // const loop = () => {
    //     if (!bool) {
    //         fn();
    //         timerId = setTimeout(loop, interval);
    //     } else {
    //         bool = true;
    //         clearTimeout(timerId);
    //     }
    // }

    // timerId = setTimeout(loop, interval);

    // return () => { bool = false };

    cSetInterval.timer = setTimeout(() => {
        fn();
        cSetInterval(fn, interval);
    }, interval);
}

function cClearInterval() {
    clearTimeout(cSetInterval.timer);
}