// background conic-gradient 圆锥渐变（饼图、切角）
// clip-path 裁剪（切角）

// css动画
// transform
// 用于元素旋转、缩放、移动、倾斜等效果
// 属性：scale()、rotate()、translate()、matrix()、skew()
// transition
// 用于较为单一的动画
// animation
// 用于较为复杂、有中间态的动画

// flex布局
// 在 flex 中，最核心的概念就是容器和轴，所有的属性都是围绕容器和轴设置的。其中，容器分为父容器和子容器。轴分为主轴和交叉轴（主轴默认为水平方向，方向向右，交叉轴为主轴顺时针旋转 90°）

// flex父容器属性
// flex-direction：主轴的方向，默认值row
// flex-wrap：超出父容器子容器的排列方式，默认值nowrap
// flex-flow：flex-direction和flex-wrap的简写，默认值row nowrap
// justify-content：子容器在主轴的排列方向，默认值flex-start
// align-items：子容器在交叉轴的排列方向，默认值stretch
// align-content：多根轴线的对齐方式，默认值stretch

// flex子容器属性
// order：子容器的排列顺序
// flex-grow：子容器剩余空间的拉伸比例
// flex-shrink：子容器超出空间的压缩比例
// flex-basis：子容器在不伸缩的情况下的原始尺寸
// flex：flex-grow、flex-shrink、flex-basis的简写
// align-self：子容器允许与其他子容器对齐方式不同，可覆盖父容器的align-items属性

// flex: initial === flex: 0 1 auto
// flex: 0 === flex: 0 1 0%
// flex: 1 === flex: 1 1 0%
// flex: none === flex: 0 0 auto
// flex: auto === flex: 1 1 auto
// flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
// flex-sharink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
// flex-basis：flex-basis给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小

// css开启GPU加速
// css3硬件加速也叫GPU加速，是利用GPU进行渲染，减少CPU操作的一种优化方案。由于GPU中的transform等css属性不会触发repaint（重绘），所以能大大提高网页的性能
// transform
// opacity
// filter
// will-change

// 圣杯布局和双飞翼布局的区别
// 圣杯布局：为了让中间div内容不被遮挡，将中间div设置了左右padding-left和padding-right后，将左右两个div用相对布局position: relative并分别配合right和left属性，以便左右两栏div移动后不遮挡中间div
// 双飞翼布局：为了让中间div内容不被遮挡，直接在中间div内部创建子div用于放置内容，在该div里用margin-left和margin-right为左右两栏div留出位置。双飞翼布局把定位优化掉了
// 圣杯布局缺点：当center < right会变形
// 双飞翼布局缺点：多添加一个dom

// bfc
// bfc是一个独立的布局环境，bfc内部的元素布局与外部互不影响
// 触发bfc方法：https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context
// 解决浮动元素使父元素高度坍塌
// 解决非浮动元素被浮动元素覆盖
// 解决两栏自适应布局
// 解决垂直方向重合

// 浏览器的重绘和回流
// 回流必将引起重绘，重绘不一定引起回流，回流比重绘的代价更大
// 回流的动作
//  页面首次渲染
//  浏览器窗口大小发生变化
//  元素尺寸或位置发生改变
//  元素内容发生变化
//  元素字体大小变化
//  添加或者删除可见的dom元素
//  激活css伪类
// 重绘的动作
//  页面中的元素样式的改变并不影响它在文档流中的位置，比如color、background-color等

// canvas 和 svg区别
// canvas是h5标签，svg是矢量图形，放大缩小不会失真由dom组成
// canvas主要是用笔刷来绘制2D图形
// svg主要是用标签来绘制不规则矢量图
// canvas画的位图，svg画的是矢量图
// svg节点过多时渲染慢，canvas性能更好，但写起来更复杂
// svg支持分层和事件，canvas不支持，但可以用库实现

// rem适配
// 设置根字体大小再计算
// 设计稿除以100，等分为7.5份来实现移动端不同屏幕尺寸适配的原理
// 各大浏览器厂商，已经支持viewport
// postcss-px-to-viewport-8-plugin：px -> vw
// vue模板中的px单位不会被转换，如需转换请使用postcss-style-px-to-viewport工具

// px rem em的区别
// px是固定像素，一旦设置就无法因适应页面大小而改变
// em和rem是相对长度单位，更适合响应式布局
// em相对于父元素，rem相对于根元素