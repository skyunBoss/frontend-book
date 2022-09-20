// 生命周期
// 大致：创建前后、挂载前后、更新前后、销毁前后
// Vue 实例有⼀个完整的⽣命周期，也就是从开始创建、初始化数据、编译模版、挂载Dom -> 渲染、更新 -> 渲染、卸载 等⼀系列过程，称这是Vue的⽣命周期。
// 1、beforeCreate（创建前） ：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到data、computed、watch、methods上的方法和数据，通常用于插件开发中执行一些初始化任务。
// 2、created（创建后） ：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 `$el` 属性，通常用于获取接口。
// 3、beforeMount（挂载前） ：在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。此时还没有挂载html到页面上。
// 4、mounted（挂载后） ：在el被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html 页面中。此过程中进行ajax交互，通常用于获取访问数据和dom元素、访问子组件。
// 5、beforeUpdate（更新前） ：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染，通常用于获取更新前各种状态。
// 6、updated（更新后）：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
// 7、beforeDestroy/beforeUmmout（销毁前） ：实例销毁之前调用。这一步，实例仍然完全可用，`this` 仍能获取到实例，通常用于一些定时器或订阅的取消。
// 8、destroyed/unmounted（销毁后） ：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用，通常用于清理它与其它实例的连接、解绑它的全部指令及事件监听器。
// 另外还有 `keep-alive` 独有的生命周期，分别为 `activated` 和 `deactivated` 。用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `activated` 钩子函数。

// 父子生命周期
// 子mouted优先父mouted

// computed和watch区别
// 区别
//   computed 计算属性：依赖其它属性值，并且computed的值有缓存，只有它依赖的属性值发生改变，下一次获取computed的值时才会重新计算computed的值。
//   watch 侦听器：更多的是观察的作用,无缓存性,类似与某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作

// watch会不会立即执行
// 设置immediate true

// watch watchEffect区别
// watch是惰性执行，也就是只有值变化时才会执行，但watchEffect不同，每次加载都会执行
// watch需要传递监听的对象，watchEffect不需要
// watch不能监听reactive里面的属性，只能监听ref、reactiveObject、function、array，需要通过函数转一下
// watchEffect不能获取oldValue
// watchEffect只能监听对象中的属性

//运用场景
//   当需要进行数值计算,并且依赖与其它数据时,应该使用computed,因为可以利用computed的缓存属性,避免每次获取值时都要重新计算。
//   当需要在数据变化时执行异步或开销较大的操作时,应该使用watch,使用watch选项允许执行异步操作（访问一个API),限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

// vue 2.0核心思想
// 通过数据双向绑定实现数据驱动，双向绑定通过数据劫持、发布订阅模式实现，基于Object.defineProperty方法进行依赖收集
// Object.defineProperty缺点：修改数组和对象，无法重新触发组件的渲染
// 由于 Object.defineProperty 只能对属性进行劫持，需要遍历对象的每个属性，如果属性值也是对象，则需要深度遍历。而 Proxy 直接代理对象，并返回一个新对象，不需要遍历操作

// 组件通信
// 父子组件：props/$emit/$parent/ref/$attrs
// 兄弟组件：$parent/$root/eventbus/vuex
// 跨组件：eventbus/vuex/provide+inject
//  var Event = new Vue();
//  Event.$emit('data', [{ name: '小明', age: 10 }]);
//  Event.$on('data', data => {});

// v-for 和 v-if哪个优先级高
// 代码中不要把v-for和v-if放在一起
// vue2中v-for优先级高于v-if，则vue3相反v-if优先级高于v-for

// setup和created谁先执行
// setup函数比beforeCreate和created都先执行
// setup props参数结构需要通过toRefs解构，context参数是一个普通对象（attrs、slots、emit）
// setup没有this

// setup中为什么没有beforeCreate和created
// 因为setup是围绕beforeCreate和created生命周期钩子运行的，所以不需要显式地定义它们

// 双向绑定原理
// 双向绑定是指一个v-model，可以绑定一个响应式数据到视图，同时视图变化也能改变数据
// v-model是语法糖相当于:value和@input（vue3中:modelValue和@update:modelValue），可以减少大量繁琐的时间处理，提高开发效率

// v-model 和 sync 有什么区别
// .sync相当于:value.sync和@update:value
// v-model只能用一次（vue3中可以多个），.sync可以有很多个

// 自定义组件使用v-model如果想要改变事件名或者属性名应该怎么做
// 通过model属性修改
// model: {
//     prop: 'checked',
//     event: 'change',
// }

// 组件扩展
// 逻辑扩展：mixins、extends、composition api
// 内容扩展：slots

// data 为什么必须是函数
// 组件需要复用，如果是对象，会指向同一个引用地址，从而修改会影响所有的组件

// 响应式原理
// 响应式只是一种机制，一种数据变化的监测机制
// 数据是可以进行监测的，也就是说在读取和设置的时候可以劫持它来做其他操作
// Object.defineProperty无法监听数组下标的修改，对属性的添加、删除动作，不支持Map、Set、WeakMap和WeakSet，需要通过Vue.set修改
// vue3响应式方式
//  composition api的reactive构建响应式
//  data兼容，提供applyOptions来处理options形式的vue组件

// vue3新特性
// api：composition api、teleport、fragments、emit、sfc composition api（<script setup>编译setup()）、sfc css、createRenderer api
// proxy
// vite

// nextTick原理
// 应用场景：created中想要获取DOM时、响应式数据变化后获取DOM更新后的状态，比如希望获取列表更新后的高度
// promise、mutationObserver（HTML5 API 监听dom变动）、setTimeout、setImmediate
// 利用  Event loop  事件线程去异步操作
function nextTick(cb, ctx) {
    let _resolve;

    // 队列
    calllbacks.push(function() {
        if (cb) {
            try {
                cb.call(ctx);
            } catch (e) {
                handleError(e, ctx, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(ctx);
        }
    });

    if (!pengding) {
        // 异步执行队列
        pengding = true;
        timerFunc();
    }

    if (!cb && typeof Promise !== 'undefined') {
        return new Promise((resolve) => {
            _resolve = resolve;
        });
    }
}

// vue 2.0 和 3.0区别
// 打包速度更快
// 生命中周期
//  Vue2 ~~~~~~~~~~~ vue3
//  beforeCreate  -> setup()
//  created       -> setup()
//  beforeMount   -> onBeforeMount
//  mounted       -> onMounted
//  beforeUpdate  -> onBeforeUpdate
//  updated       -> onUpdated
//  beforeDestroy -> onBeforeUnmount
//  destroyed     -> onUnmounted
//  activated     -> onActivated
//  deactivated   -> onDeactivated
// 组合式api
// ts更加友好
//  跨vue文件会丢失ts类型
//  ts类型推导，template里面的类型推导失效
//  tsx 本质上是 ts 团队给开了后门直接把 tsx 的推导做进了 ts 本身
//  defineComponent不支持泛型，defineComponent主要是为了ts类型推导
//  Vue.extend或者vue-class-component/vue-property-decorator都不能完整推导类型
//  vue2使用flow类型

// vue实现原理

// keep-alive实现原理
// https://juejin.cn/post/6844903837770203144
// keep-alive用于保存组件的渲染状态
// include（匹配组件才会缓存）、exclude（匹配组件不会缓存）、max（最多缓存的组件）
// keep-alive缓存路由和组件的功能，避免重复创建和销毁
// 通过隐藏容器，标记上下文active和deactive
// keep-alive渲染的vnode是子节点的children的第一个元素，它是函数的返回值。因此我们说keep-alive是抽象组件，它本身不渲染成实体节点，而是渲染它的第一个节点

// 源码剖析：src/core/components/keep-alive.js
export default {
  name: 'keep-alive',
  abstract: true, // 判断当前组件虚拟dom是否渲染成真实dom的关键

  props: {
    include: patternTypes, // 缓存白名单
    exclude: patternTypes, // 缓存黑名单
    max: [String, Number] // 缓存的组件实例数量上限
  },

  created () {
    this.cache = Object.create(null) // 缓存虚拟dom
    this.keys = [] // 缓存的虚拟dom的健集合
  },

  destroyed () {
    for (const key in this.cache) { // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    // 实时监听黑白名单的变动
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    // 第一步：获取keep-alive包裹着的第一个子组件对象及其组件名
    // 第二步：根据设定的黑白名单（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例（VNode），否则执行第三步
    // 第三步：根据组件ID和tag生成缓存Key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该key在this.keys中的位置（更新key的位置是实现LRU置换策略的关键），否则执行第四步
    // 第四步：在this.cache对象中存储该组件实例并保存key值，之后检查缓存的实例数量是否超过max的设置值，超过则根据LRU置换策略删除最近最久未使用的实例（即是下标为0的那个key）
    // 第五步：最后并且很重要，将该组件实例的keepAlive属性值设置为true。这个在@不可忽视：钩子函数 章节会再次出场
  }
}

// vuex原理


// vue2 diff 特点
// 双端比较

// vue3 diff 特点
// 最长递增子序列
// key存在用于diff算法，key不存在直接patch

// 为什么不要用index作为key
// 性能消耗
//  使用 index 做 key，破坏顺序操作的时候， 因为每一个节点都找不到对应的 key，导致部分节点不能复用,所有的新 vnode 都需要重新创建
// 数据错位
//  如果结构中包含输入类的 DOM，会产生错误的 DOM 更新

// 虚拟dom
// 虚拟dom是一个对象，通过不同的属性去描述一个视图结构
// 将真实元素节点抽象成VNode，有效减少操作dom的次数，从而提高性能
// 跨平台

// diff算法
// diff算法也称patching算法
// diff是在组件内响应式数据变更触发实例执行其更新函数，更新函数会再次触发render函数获得最新的虚拟dom，然后执行patch函数，并传入新老虚拟dom，通过比对找到两者变化的地方，最后将其转化为对应的dom操作
// patch内部通过递归实现，深度优先、同层比较的策略
//  首先判断两个节点是否为相同同类节点，不同则删除重新创建
//  如果双方都是文本则更新文本内容
//  如果双方都是元素节点则递归更新子元素，同时更新元素属性
// snabbdom.js
//  compile，如何把真实DOM编译成vnode虚拟节点对象。（通过h函数）
//  diff，通过算法，我们要如何知道oldVnode和newVnode之间有什么变化。（内部diff算法）
//  patch， 如果把这些变化用打补丁的方式更新到真实dom上去。

// 实现最简 vue3 模型，用于深入学习 vue3， 让你更轻松的理解 vue3 的核心逻辑
// https://github.com/cuixiaorui/mini-vue

// vue3 ref toRef toRefs区别
// ref本质是深拷贝，与原始数据没有引用关系
// toRef本质是引用，与原始数据有关联

// vue3响应式原理
// vue3通过proxy拦截数据的读取和设置，当读取数据时，通过track函数触发依赖的收集，当设置数据时，通过trigger函数取派发更新

// template转换