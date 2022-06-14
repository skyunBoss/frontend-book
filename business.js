// 图片压缩上传
// 获取file文件
// 获取文件类型
// file文件转base64
// 通过canvas.toDataUrl对base64进行压缩
// base64转blob二进制格式
// 封装formData数据上传

// nginx 499

// csrf
// 验证http referer
// cookie设置samesite

// 微信图片外链不显示
// img referrerPolicy no-referrer

// html2canvas原理
// html2canvas返回promise对象，通过then方法获取canvas对象，调用toDataUrl方法将其转换成图片
// options ignoreElements忽略某些元素，也可以在元素上增加data-html2canvas-ignore属性
// 基本原理：获取已经渲染后dom元素的结构和样式，通过构建截图产出canvas画布
// 将传入的dom元素的结构和样式还有options传入canvasRenderer，canvasRenderer实例用来绘制离屏canvas
// 解析节点信息：parseTree
// 渲染离屏canvas：parseStackingContexts.render
// 渲染层叠内容：renderStackContent
// 层叠顺序：https://image.zhangxinxu.com/image/blog/201601/2016-01-07_235108.png

// import html2canvas from 'html2canvas';

// html2canvas(document.getElementById('poster'), {
//     allowTaint: false,
//     useCORS: true,
//     canvas,
//     width: width * scale,
//     height: height * scale,
// }).then(function(canvas) {
//     // toImage
//     const dataImg = new Image();
//     dataImg.src = canvas.toDataURL('image/png');
//     const alink = document.createElement('a');
//     alink.href = dataImg.src;
//     alink.download = '分享.png';
//     alink.click();
// });