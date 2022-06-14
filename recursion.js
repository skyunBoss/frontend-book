// 递归
// 递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误

// 尾调用
// 一个函数最后返回另一个函数

// 尾递归
// 递归是函数调用自身，如果尾调用自身，那就是尾递归
// 各大浏览器（除了safari）根本就没部署尾调用优化
// ES6的尾调用优化只在严格模式下开启，正常模式下是无效的
// 因为在正常模式下函数内部有两个变量，可以跟踪函数的调用栈：func.arguments func.caller
// 尾调用优化发生时，函数的调用栈会改写，因此上面两个变量会失真。严格模式禁用这两个变量，所有尾调用模式尽在严格模式下生效