// requestAnimationFrame 请求动画帧率，告诉浏览器执行动画，并且在下一次重绘前调用回调函数

// 获取每秒的帧率
var frame = 0; // 帧数
var lastTime = Date.now();
var preFps = 0;

// 固定时间法
var getFPS = () => {
    var nowTime = Date.now(); // 获取当前时间
    var diffTime = nowTime - lastTime; // 计算时间差

    frame++;

    if (diffTime > 1000) {
        var fps = Math.round((frame * 1000) / (nowTime - lastTime)); // 计算每秒帧率

        if (preFps !== fps) {
            console.log(fps);
            preFps = fps;
        }

        frame = 0;
        lastTime = nowTime;
    }

    window.requestAnimationFrame(getFPS);
}
