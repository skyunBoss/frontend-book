/*
 * moduleName:
 * description: Promise 类
 * version:
 * author: xuchao
 */
const PENDING = "pending";
const FULFAILLED = "fulfailled";
const REJECTED = "rejected";

class Promise {
    status = PENDING;

    value = undefined;

    reason = undefined;

    onResolveCallbacks = [];

    onRejectedCallbacks = [];

    constructor(executor) {
        const resolve = (value) => {
            if (this.status !== PENDING) return;

            this.status = FULFAILLED;
            this.value = value;
            this.onResolveCallbacks.forEach((fn) => fn());
        };

        const reject = (reason) => {
            if (this.status !== PENDING) return;

            this.status = REJECTED;
            this.reason = reason;
            this.onRejectedCallbacks.forEach((fn) => fn());
        };

        try {
            executor(resolve, reject);
        } catch(error) {
            reject(error);
        }
    }

    then(onFulfailled, onRejected) {
        if (this.status === FULFAILLED) {
            onFulfailled(this.value);
        }

        if (this.status === REJECTED) {
            onRejected(this.reason);
        }

        if (this.status === PENDING) {
            this.onResolveCallbacks.push(() => onFulfailled(this.value));
            this.onRejectedCallbacks.push(() => onRejected(this.reason));
        }
    }
}


// Promise.resolve()
// Promise.resolve('foo') === new Promise(resolve => resolve('foo'))

// Promise.reject()
// Promise.reject('err') === new Promise((resolve, reject) => reject('err'))

// Promise.all()
// 参数promise数组，当所有Promise对象调用resolve后返回，任意一个Promise对象被reject，取消执行并返回reject
Promise.MyAll = function (promises = []) {
    let result = [], count = 0;

    return new Promise((resolve, reject) => {
        promises.forEach((item, index) => {
            Promise.resolve(item).then(res => {
                result[index] = res;

                count += 1;

                if (count === promises.length) resolve(result);
            }, reject);
        });
    });
}

// Promise.any()
// 与promise.all相反，任意一个promise成功就成功，所有promise失败才会执行reject，

// Promise.allSettled()
// 解决Promise.all的痛点，任意一个Promise被reject直接取消执行。Promise.allSettled会继续执行返回所有Promise的状态
Promise.MyAllSettled = function (promises = []) {
    let result = [], count;

    return new Promise((resolve, reject) => {
        const handleResult = (index, status, val) => {
            result[index] = { status, val };

            count += 1;

            if (count === promises.length) resolve(result);
        };

        promises.forEach((item, index) => {
            Promise.resolve(item).then(res => {
                handleResult(index, "fulfilled", res);
            }, err => {
                handleResult(index, "rejected", err);
            });
        });
    });
}

// Promise.race()
// Promise.all在接收到的所有的对象Promise都变为FulFilled或者Rejected状态之后才会继续进行后面的处理，与之相对的是Promise.race只要有一个promise对象进入FulFilled或者Rejected状态的话，就会继续进行后面的处理
Promise.MyRace = function (promises = []) {
    return new Promise((resolve, reject) => {
        for (let item of promises) {
            Promise.resolve(item).then(resolve, reject);
        }
    });
}

// Promise.prototype.finally()
// Promise对象无论执行结果是fulfilled还是rejected，都会执行finally