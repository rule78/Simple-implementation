// 简实现
class NPromise {
    constructor(fn) {
        this.callbacks = [];
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        this.callbacks.push(onFulfilled);
        return this;
    }
    _resolve(value) {
        // 保证在 resolve 执行之前，then 方法已经注册完所有的回调
        setTimeout(() => {
            this.callbacks.forEach(fn => fn(value));
        });
    }
}

const timeOutStuctor = (log, time = 2000) => {
    return new NPromise((resolve) => {
        setTimeout(() => {
            resolve(log);
        }, time);
    })
};

//Promise应用
timeOutStuctor('第一次promise', 1000).then((tip) => {
    console.log(tip);
    return timeOutStuctor('第二次promise', 1000).then((tip) => {
        console.log(tip);
    });
});
