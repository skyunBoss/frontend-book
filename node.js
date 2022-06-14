// session和jsonwebtoken区别
// session存储服务端，jwt存储客户端（无状态），可以降低服务器查数据库的次数
// jwt一次性，适合有效期短的场景

// jwt认证机制
// 客户端携带用户提交的登录信息请求
// 服务端收到登录请求，验证凭证正确性，如果正确则按照协议规定生成token信息，经过签名并返回给客户端
// 客户端收到token，可以进行保存，以后每次请求都带上token信息
// 业务服务器收到请求，验证token的正确性，如果正确则进行下一步操作

// process.nextTick和setTimmediate区别
// process.nextTick 定义一个动作，且让这个动作在下一次事件轮询的时间点上执行
// setTimmediate 用来把一些需要长时间运行的操作放在一个回调函数中，在下一次tick执行这个回调函数
// process.nextTick（idle观察者）执行优先于setTmmediate（check观察者）
// 嵌套一层，执行优先级就会降一层

// 进程和线程区别
// 一个进程至少有一个线程，线程是进程的子任务
// 进程切换代价大，线程切换代价小
// 进程拥有资源多，线程拥有资源少
// 进程是资源分配的基本单位，线程是任务调度和执行的基本单位

// koa洋葱模型

// node 异步I/O执行流程
// node核心是异步，可以异步调用的都会异步化，磁盘I/O 网络I/O

// node server 运行php文件
const cprocess = require("child_process");
const path = require('path');
const fs = require('fs');

const fpath = path.resolve(__dirname, 'demo.php');

fs.chmod(fpath, '775', err => {
    if (err) return err;

    cprocess.exec(`php ${fpath}`, (err, stdout, stderr) => {
        if (err) throw(err);

        console.log(stdout);
        console.log(stderr);
    });
});