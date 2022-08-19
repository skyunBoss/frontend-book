// 相等== 和 全等=== 区别
// ==先转换再比较，隐式强制转型
// ===仅比较而不转换

// 基础数据类型
// 将值存储在栈中 ,栈中存放的是对应的值
// string、null、undefined、boolean、number、symbol

// 引用数据类型
// 将对应的值存储在堆中,栈中存放的是指向堆内存的地址
// array、function、object、map、set、date、regExp

// 判断数据类型的方式
// typeof
// instanceof
// Object.prototype.toString.call
// constructor
//  null和undefined没有constructor
//  (123).constructor

// this指向
// this永远指向一个对象
// this的指向完全取决于函数调用的位置

// 严格模式
// 目的是更合理、更安全、更严谨

// 0.1+0.2 !== 0.3
// 浮点数转二进制时丢失了精度，计算完再转回十进制时和理论结果不同
function add(num1, num2) {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
}
// 缺点：乘以10的幂次方这种方法对大数支持的依然不好

// cookies、sessionStorage和localStorage的区别
// cookie是网站为了标识用户身份而存储在用户本地中的数据（这些数据通常是经过加密的）
// cookie数据始终在同源的HTTP请求中携带，即使不需要也会进行传递
// sessionStorage和localStorage仅保存在本地，不会将数据发送到服务器
// cookie的存储大小不会超过4k，而sessionStorage和localStorage的存储空间为5M的字符数
// cookie在过期时间内有效、sessionStorage在关闭浏览器窗口前有效、localStorage持久有效

// cookie 和 token的区别
// token支持跨域访问，cookie不允许跨域访问

// cookie 和 session的区别
// cookie存在客户端，session存在服务端
// session 可以放在 文件、数据库、或内存中都可以

// 跨域请求带cookies
// 设置withCredentials true
// withCredentials 属性是一个Boolean类型，它指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求。在同一个站点下使用withCredentials属性是无效的
// 设置Access-Control-Allow-Origin
// 设置Access-Control-Allow-Credentials

// 序列化与反序列化缺点
// 不能处理undefined和Symbol数据类型
// 不能处理Date对象
// NaN、Infinity和-Infinity序列化的结果是null
// 不能处理函数

// 函数
// 函数执行前都会进行预编译，且会创建一个闭包
// 每一个函数都有一个 [[Scopes]] 属性，其存储的是这个函数运行时的作用域链，除了当前函数的 AO，作用域链的其他部分都会在其父函数预编译时添加到函数的 [[Scopes]] 属性上（因为父函数也需要预编译后才能确定自己的AO），所以 js 的作用域是词法作用域

// 箭头函数
// 优势：更简短、不绑定this

// 事件委托
// 把一个元素或一组元素的事件委托给另一个元素（可能是父元素，也有可能是最外层元素）
// 事件委托可以减少大量的内存消耗，节约效率

// 事件冒泡
// 阶段：捕获->目标->冒泡

// 闭包
// mdn：闭包是访问自由变量的函数
// 形成私有上下文，保护私有变量的一种机制
// 函数每一次执行都是从新形成一个全新的私有上下文，和之前执行产生的上下问没有必然的联系
// 实际：每一个函数都会产生闭包，无论闭包中是否存在内部函数 或者 内部函数中是否访问了当前函数变量 又或者 是否返回了内部函数，因为闭包在当前函数预编译阶段就已经创建了

// 闭包缺点
// 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除
// 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值

// new Object 和 Object.create()区别
// 前者继承内置对象Object，后者继承指定对象
// 前者原型永远指向Object的原型，后者可以传null创建一个干净的对象，没有原型

// for in 和 for of 区别
// for in 遍历对象
// for of 遍历数组

// reduce 和 reduceRight
// reduceRight从末尾向前累加

// Set、Map、WeakSet 和 WeakMap 的区别
// Set
// 成员不能重复
// 只有健值，没有健名，有点类似数组
// 可以遍历，方法有add,delete,has
// WeakSet
// 成员都是对象
// 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
// 不能遍历，方法有add、delete、has
// Map
// 本质上是健值对的集合，类似集合
// 可以遍历，方法很多可以跟各种数据格式转换
// WeakMap
// 只接受对象作为健名（null除外），不接受其他类型的值作为健名
// 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
// 不能遍历，方法有get、set、has、delete

// MVVM 和 MVC的区别
// MVVM优点：低耦合、复用性、独立性
// MVVM通过数据驱动改变视图
// MVVM解决MVC频繁操作dom，渲染性能降低，影响用户体验

// Object.keys 和 Reflect.ownKeys区别
// Oject.keys返回所有属性key，但不包含不可枚举的属性
// Reflect.ownKeys返回所有属性key，包含枚举的属性

// 创建不可变的对象
// Object.freeze 和 Object.seal区别
// Object.seal仅保护对象不添加和删除属性，可更新对象属性
// const 关键字只提供赋值的不变性，并不提供值的不可更改性

// Object.hasOwn
// 判断对象是否包含某个属性
// in缺点：属性在原型链中，也会返回true
// hasOwnProperty缺点：Object.create(null).hasOwnProperty会报错

// 原型和原型链
// js分为函数对象和普通对象，每个对象都有__proto__属性，但是只有函数对象才有prototype属性
// __proto__是一个对象，它有两个属性，constructor和__proto__
// 原型对象prototype有一个默认的contructor属性，用于记录实例是由哪个构造函数创建
// Person.prototype.contructor === Person
// person01.__proto__ === Person.prototype
// 除了Object的原型对象（Object.prototype）的__proto__指向null，其他内置函数对象的原型对象（例如：Array.prototype）和自定义构造函数的__proto__都指向Object.prototype, 因为原型对象本身是普通对象

// 为什么数组长度能任意变化
// length属性可读可写，大多数其他编程语言不允许直接改变数组的大小，越界访问索引会报错

// defer 和 async有什么区别
// 二者都是异步去加载外部js文件
// async是在外部js加载完成后，浏览器空闲时，Load事件触发前执行；而defer是在js加载完成后，整个文档解析完成后执行
// defer更像是将<script>标签放在</body>之后的效果，但是它由于是异步加载JS文件，所以可以节省时间

// proxy
// 代理器，外界想要访问都要经过这层拦截，proxy可以对外界的访问进行过滤和改写
// 不可配置属性：configurable
// 不可写属性：writable

// reflect
// 与proxy相似，只是保持object的默认行为
// 把object对象上一些明显属于语言内部的方法放到Reflect对象身上
// 修改了某些object方法返回的结果

// 手写ES6的模板字符串
// /\$\{(.+?)\}/g
function tplStr(str) {
    return str.replace(/\$\{(.+?)\}/g, function() {
        return eval(arguments[1]);
    });
}

// 构造函数使用#声明私有属性
class Person {
    #age = 1;

    constructor(name) {
        this.name = name;
    }
}

// 数字分隔符，有易于阅读
const number = 6000_000_000; // 6000000000
const sum = 1000 + 6000_000_000;

// BigInt 支持大数计算
BigInt(Math.pow(2, 53)) === BigInt(Math.pow(2, 53)) + BigInt(1)

// symbol
// symbol可以生成一个全局唯一的值
// symbol、bigint不能作为构造函数使用
// symbol构造函数内部 用了 this instanceof Symbol来判断this所指向的对象原型上的constuctor是否为Symbol构造函数，如果是的话，就抛出控制台打印出的错误。bigint同理

// symbol迭代器
// symbol.asyncIterator 符号指定了一个对象的默认异步迭代器。如果一个对象设置了这个属性，它就是异步可迭代对象，可用于for await...of循环
// symbol.hasInstance用于判断某对象是否为某构造器的实例
// symbol.iterator 为每一个对象定义了默认的迭代器
// iterator是一种接口，为各种不同的数据结构提供统一的访问机制（任何数据结构部署iterator接口，就可以完成遍历操作），提供给for...of消费
// 可迭代的对象：Array、Map、Set、String、TypedArray、函数的 arguments 对象、NodeList 对象
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator](); // arr[Symbol.iterator] is function

iterator.next().value; // 1
iterator.next().value; // 2
iterator.next().value; // 3

// 迭代器生成函数
function *iteratorGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const iterator2 = iteratorGenerator();

iterator2.next();

// generator语法
// function * iteratorGenerator() {}
// function *iteratorGenerator() {}
// function* iteratorGenerator() {}
// function*iteratorGenerator() {}

// 通过闭包实现生成器函数，入参是任意集合
function iteratorGenerator(list) {
    // idx记录当前访问的索引
    var idx = 0;
    // len记录传入集合的长度
    var len = list.length;

    return {
        // 自定义next方法
        next: function() {
            // 如果索引还没有超出集合长度，done为false
            var done = idx >= len;
            // 如果done为false，则可以继续取值
            var value = !done ? list[idx++] : undefined;
            
            // 将当前值与遍历是否完毕（done）返回
            return {
                done: done,
                value: value,
            };
        },
    };
}

const iterator3 = iteratorGenerator([1, 2, 3]);

iterator3.next();

// 设计模式
//  工厂模式
//  单例模式
//  观察者模式
//      定义了对象间一对多的依赖关系，当目标对象Subject的状态发生变化时，所有依赖它的对象Observer都会得到通知
//  发布订阅模式
//      订阅者把自己想订阅的事件注册到调度中心，当发布者发布该事件到调度中心，也就是该事件触发时，由调度中心统一调度订阅者注册到调度中心的事件
//  代理模式
//  装饰器模式
