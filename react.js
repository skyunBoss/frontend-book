// https://fe.azhubaby.com/React/%E9%9D%A2%E8%AF%95%E9%A2%98/

// super()和super(props)区别
// 使用constructor构造函数，super()为了初始化this。若在constructor中调用this.props，则需要super(props)

// swr缓存策略
// 优先从缓存中获取数据，同时发送请求获取最新的数据进行验证

// useState
// 原理：闭包实现，接受一个参数initalValue，参数类型可以是基础类型和函数

// useEffect useLayoutEffect 区别
// 前者异步 后者同步（同componentDidMount）
// 后者解决闪烁问题
// 原理：接受两个参数callback 和 deps，如果deps存在，只有当它发生了变化，callback才会执行；如果deps不存在，那么callback每次render都会执行；如果是空数组，那么只有在Mounted阶段才会执行

// useCallback
// 工作遇到问题
//  1、使用不合理，反而会使性能下降
//  2、依赖state变更解决闭包问题，那么就失去函数本身的意义。可以通过useRef实例存储state

// hooks优势
// 可读性高，也易于维护
// 不会侵入代码， 不会造成嵌套
// UI和逻辑彻底拆分，更容易复用

// 自定义hooks
// useState回调，通过useStateWithCallback方法解决回调取最新的state
// useTable
// useRequest

// hook为什么不能在循环、条件语句、嵌套语句中使用
// react用链表来严格保证hooks的顺序
// hook 在每次渲染时的查找是根据一个“全局”的下标对链表进行查找的，如果放在条件语句中使用，有一定几率会造成拿到的状态出现错乱

// hook 闭包的陷阱
// 函数、控制块执行时会产生新的词法环境
// 当前词法环境找不到的变量会继续外外部词法环境寻找

// hooks 原理
// 源码解析图：https://upload-images.jianshu.io/upload_images/14361446-21c256663f9ea235.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp

// 高阶函数
// 函数接收的参数为函数，也可以返回一个函数的函数

// fiber
// react 16之前的stack架构，递归遍历组件树成本很高，会造成主线程被持续占用，结果就是主线程上的布局、动画等生命周期性任务就无法立即得到处理，造成视觉上的卡顿，从而影响用户体验
// 执行setState之后，react会立即开始reconciliation（协调）过程，从父节点开始遍历，以找出不同。将所有的Virtual Dom遍历完后，reconciler才能给出当前需要修改真是的Dom信息，并传递给renderer，进行渲染，然后显示此次更新的内容。对于庞大的Dom树来说，reconciliation（协调）过程会很长，在这期间，主线程一直被占用，因此任何交互，布局，渲染都会停止，一直在等待加载。

// fiber架构就是用异步的方式解决旧版本同步递归导致的性能问题
// fiber架构任务分解，避免主线程的持续占用造成卡顿问题
// 增量渲染把任务拆分成多块
// 更新的时候能够暂停，终止，复用渲染任务
// 给不同类型的更新赋予优先级
// fiber架构就是把一个耗时长的任务分解成一个个工作单元（每个工作单元运行时间很短，不过总时间依然很长）。在执行每个工作单元前，由浏览器判断是否有空余时间执行，有时间就执行工作单元，执行完成后，继续判断是否有空余时间执行下一个工作单元，如果没有时间就终止执行让浏览器执行其他任务（如GUI线程等）。等到下一帧执行时判断是否有空余时间，有时间就从终止的地方继续执行工作单元，一直重复到任务结束
// GUI渲染线程负责渲染浏览器界面，解析html、css，构建dom

// 虚拟dom（Virtual Dom）
// 虚拟dom是react的fiber，diff算法是react的协调
// 频繁操作dom会导致大量的回流和重绘，造成卡顿
// 虚拟dom操作时，会对比抽象树下的节点更新，最细粒度更新
// 虚拟dom跨端优势
// DOM 引擎、JS 引擎 相互独立，但又工作在同一线程（主线程）

// diff算法
// 新旧vnode变化的过程需要大量时间的计算工作，diff来比较差异的算法

// react diff 特点
// 仅向右移动

// useMemo实现原理
// https://github.com/brickspert/blog/issues/26

// hooks实现封装异步请求
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useRequest = (url, data, config) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const request = useCallback(() => {
        setLoading(true);

        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();

        axios({
          url,
          params: data,
          method: 'get',
          cacelToken: source.token,
        }).then(result => {
            setResult(result.data);
            setLoading(false);
        }).catch(error => {
            if (!axios.isCancel(error)) {
                setError(error);
                setLoading(false);
            }
        });

        return source;
    }, [url, loading]);

    useEffect(() => {
        if (!config || !config.manual || (config.manual && config.ready)) {
            return () => request().cancel('request cancel');
        }
    }, [config]);

    return {
        loading,
        result,
        error,
    };
}

export default useRequest;