// history hash路由

// history底层方法
// pushState、replaceState、popState

// hash底层方法
// window.location.hash、onhashchange

// history模式
// history.push = window.history.pushState
// history.replace = window.history.replaceState

// hash模式
// history.push = window.location.href
// history.replace = window.location.replace

// react router源码分析
// history是react-router的核心库，react-router是react-router-dom的核心库
// react-router提供hash、browser两种路由模式。hash调用createHashHistory，browser调用createBrowserHistory


// monorepo项目管理方式，packages下面的文件夹相互依赖