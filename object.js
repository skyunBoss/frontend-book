// 手写assign
Object.assign2 = function (target, ...source) {
    if (!target) throw new TypeError("Cannot convert undefined or null to object");

    let result = Object(target);

    source.forEach(obj => {
        if (!obj) return;

        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result[key] = obj[key];
            }
        }
    });

    return result;
};