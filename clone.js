// 浅拷贝
// 只拷贝引用，新旧对象共享一块内存，所以改变新对象后，旧对象也会改变
// Object.assign()
// concat
// slice
// 解构

// 深拷贝
// 循环引用通过WeakMap解决
function deepClone(obj) {
    const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];
    let result = null;

    // obj.constructor对象的构造函数
    if (reference.includes(obj?.constructor)) {
        result = new obj.constructor(obj);
    } else if (Array.isArray(obj)) {
        result = [];
        obj.forEach((e, i) => {
            result[i] = deepClone(e);
        });
    } else if (typeof obj === 'object' && obj !== null) {
        result = {};
        Object.keys().forEach(key => {
            if (Object.hasOwnProperty.call(obj, key)) {
                result[key] = deepClone(obj[key]);
            }
        });
    } else {
        result = obj;
    }

    return result;
}