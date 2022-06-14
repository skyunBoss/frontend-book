// 节流
// 触发高频时间在一定时间内只会执行一次
// 场景：发送验证码、表单提交、滚动条触底监听
function throttle(fn, delay = 500) {
    let flag = true;

    return function() {
        if (!flag) return;
        
        flag = false;

        setTimeout(() => {
            fn.apply(this, arguments);
            
            flag = true;
        }, delay);
    }
}