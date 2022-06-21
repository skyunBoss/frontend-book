// 输入一串字符串，根据字符串求出每个字母的数量并返回结果对象。（数字为1时可省略）
// 输入：A3B2，输出：{"A": 3, "B": 2}
// 输入：A(A(A2B)2)3C2，输出：{"A": 16, "B": 6, "C": 2}
var strToObjResult = () => {
    // return 
}

// 洗牌
// 从原始数组中随机抽取一个新的元素到新数组中
function shuffle(arr) {
    let n = arr.length, random;
    while(0 != n){
        random = (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
        [arr[n], arr[random]] = [arr[random], arr[n]] // ES6的结构赋值实现变量互换
    }
    return arr;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        const random = Math.floor(Math.random() * i + 1);
        const temp = arr[i];
        arr[i] = arr[random];
        arr[random] = temp;
    }
}

// 反转链表
var reverseList = function(head) {
    let prev = null;
    let current = head;

    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
};

// 类实现链式延迟调用：boy.sayHi().sleep(1000).play('王者').sleep(2000).play('跳一跳')
class PlayBoy {
    constructor(name) {
        this.name = name;

        setTimeout(() => {
            this.run();
        });
    }

    task = [];

    run() {
        const fn = this.task.shift();
        
        if (fn) fn();
    }

    sayHi() {
        const that = this;

        this.task.push(() => {
            console.log(`大家好我是${this.name}`);
            that.run();
        });

        return this;
    }

    sleep(delay) {
        const that = this;

        this.task.push(() => {
            setTimeout(() => {
                console.log('timeout');
                that.run();
            }, delay);
        });

        return this;
    }

    play(name) {
        const that = this;

        this.task.push(() => {
            console.log(`我在玩${name}`);
            that.run();
        });

        return this;
    }
}

const boy = new PlayBoy('Tom');

boy.sayHi().sleep(1000).play("王者").sleep(2000).play("跳一跳");

/**
 * 实现一个组合compose的方法，使其可以正确调用每个中间件
 *
 * 规定中间件写法：
 * function(val, next) {
 *    // 前置操作
 *    next(val + 1); // 触发下一个中间件
 *    // 后续操作
 * }
 * 
 * 输出：add1 before -> add2 before -> output: 3 -> add2 after -> add1 after
 */
function compose(...middlewares) {
    return function(x) {
        function disptach(index) {
            middlewares[index].call(this, x, (result) => {
                x = result;
                disptach(++index);
            });
        };

        disptach(0);
    };
}

function add1(x, next) {
    console.log('add1 before');
    next(x + 1); // -> add2
    console.log('add1 after');
}

function add2(x, next) {
    console.log('add2 before');
    next(x + 2); // -> output
    console.log('add2 after');
}

function output(x){
    console.log('output:', x)
}

const input = 0;
compose(add1, add2, (output) => {
    console.log('output:', output);
})(input);


// 查找连续数组中的缺失数
// [1, 2, 3, 4, 5, 6, 8, 9]
function missingNumber(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== i + 1) {
            return i + 1;
        };
    };
};

missingNumber([1, 2, 3, 4, 5, 6, 8, 9]);

// LRU缓存算法
// Least Recently Used 最近最少使用
class LRUCache {
    constructor(length) {
        this.length = length;
        this.data = new Map();
    }

    set(key, value) {
        const data = this.data;

        if (data.has(key)) {
            data.delete(key);
        }

        data.set(key, value);

        if (data.size > this.length) {
            data.delete(data.keys().next().value);
        }
    }

    get(key) {
        const data = this.data;

        if (!data.has(key)) return null;

        const value = data.get(key);

        data.delete(key);

        data.set(key, value);
    }
}

const lruCache = new LRUCache();
lruCache('name', 'sky');
lruCache('age', 20);