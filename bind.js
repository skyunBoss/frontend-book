// 修改函数this指向
// 返回一个绑定this指向的函数
// 支持函数柯里化
// this指向不可修改
Function.prototype._bind = function(obj, ...args) {
    var fn = this;

    var fn_ = function () {};

    var bound = function() {
        const newArgs = Array.prototype.slice.call(arguments);

        fn.apply(this.constructor === fn ? this : obj, args.concat(newArgs));
    };

    fn_.prototype = fn.prototype;

    bound.prototype = new fn_();
    
    return bound;
}

// bind传入两次this，执行哪个this
// 第一次绑定完this返回一个函数，后续再绑定多少次都无效，但是后面传入的参数会生效

// new的过程，其返回的是一个对象
function _new(constr, ...args) {
    // 创建一个空对象
    var obj = Object.create();
    // 将obj的原型指向构造函数，这样obj就可以访问构造函数原型中的属性
    obj.__proto__ = constr.prototype;
    // 将构造函数的this指向obj，这样obj就可以访问构造函数的属性
    var result = constr.apply(obj, args);
    // 判断返回值是否是对象
    return result instanceof Object ? result : obj;
}


var obj = {
    a: 1,
};

var fn = function(b, c) {
    console.log(this.a);
    console.log(b);
    console.log(c);
};

var bound = fn._bind(obj, 2);

var newBound = new bound(3);

// newBound;