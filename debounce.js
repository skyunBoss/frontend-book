// 防抖
// 触发高频事件在一定时间内执行，如在一定时间内再次触发，则重新计算时间
// 场景：搜索框联想、窗口resize
function debounce(fn, delay = 500) {
    let timer = null;

    return function() {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
}