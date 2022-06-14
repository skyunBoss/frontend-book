// 函数柯里化
// 把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术

// var curry = function(fn) {
//     var args = Array.prototype.slice.call(arguments, 1);
    
//     return function() {
//         var newArgs = args.concat(Array.prototype.slice.call(arguments));

//         return fn.apply(this, newArgs);
//     }
// };


// 支持多参数
var curry = function(fn, args = []) {
    var length = fn.length;

    return function() {
        var newArgs = args.concat(Array.prototype.slice.call(arguments));

        if (newArgs.length < length) {
            return curry.call(this, fn, newArgs);
        }

        return fn.apply(this, newArgs);
    }
}

var addCurry = curry(function(a, b, c) {
    return a + b + c;
});

console.log(addCurry(1, 2, 3));