// cache持久化缓存
// webpack 4.x cache-loader
// webpack 5.x filesystem cache

// loader 和 plugin区别
// loader转换器，将A文件转换成B文件，如A.less转换成B.css
// plugin扩展器，扩展webpack本身，针对loader结束后，webpack打包的整个过程，它并不是直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务

// webpack HMR热更新
// 必须设置 devServer.hot = true，启动 HMR 功能
// 实现原理步骤：
// 使用 webpack-dev-server (后面简称 WDS)托管静态资源，同时以 Runtime 方式注入 HMR 客户端代码
// 浏览器加载页面后，与 WDS 建立 WebSocket 连接
// Webpack 监听到文件变化后，增量构建发生变更的模块，并通过 WebSocket 发送 hash 事件
// 浏览器接收到 hash 事件后，请求 manifest 资源文件，确认增量变更范围
// 浏览器加载发生变更的增量模块
// Webpack 运行时触发变更模块的 module.hot.accept 回调，执行代码变更逻辑
// done

// sourcemap 映射 快速定位源码位置

// Tree Shaking
// 剔除没有无用的代码，必须ES6模块语法（即import 和 export）
// 实现原理：Tree-shaking 的实现一是先标记出模块导出值中哪些没有被用过，二是使用 Terser 删掉这些没被用到的导出语句
// Make 阶段，收集模块导出变量并记录到模块依赖关系图 ModuleGraph 变量
// 标记过程大致可划分为三个步骤：
// Seal 阶段，遍历 ModuleGraph 标记模块导出变量有没有被使用
// 生成产物时，若变量没有被其它模块使用则删除对应的导出语句
// 标记功能需要配置 optimization.usedExports = true 开启
// 实现原理步骤：
// 在 FlagDependencyExportsPlugin 插件中根据模块的 dependencies 列表收集模块导出值，并记录到 ModuleGraph 体系的 exportsInfo 中
// 在 FlagDependencyUsagePlugin 插件中收集模块的导出值的使用情况，并记录到 exportInfo._usedInRuntime 集合中
// 在 HarmonyExportXXXDependency.Template.apply 方法中根据导出值的使用情况生成不同的导出语句
// 使用 DCE 工具（Terser、UglifyJS等）删除 Dead Code，实现完整的树摇效果

// webpack打包链路
// 初始化参数：读取配置文件的参数
// 开始编译：通过参数初始化Compiler对象，加载plugin，执行run方法开始编译
// 确定入口：通过参数的entry找到入口文件
// 编译模块：从入口文件开始，通过loader对模块的转译，再找出模块对应的模块，进行递归，直到所有依赖的文件都处理完
// 完成编译模块：得到每个模块转译后和它们之间的依赖关系
// 输出资源：通过入口和模块之间的依赖关系，组成一个个包含多个模块的Chunk，再将Chunk转换成一个单独的文件加入到输出列表
// 完成输出资源：通过参数的output确定输出的路径和文件名，将内容写入到文件系统

// webpack plugin生命周期
// run：在编译器开始读取记录前执行
// compile：在一个新的compilation创建之前执行
// compilation：在一次compilaction创建后执行
// make：完成一次编译之前执行
// emit：在生成文件到output目录之前执行
// afterEmit：在生成文件到output目录之后执行
// done：一次编译完成后执行

// compiler是webpack从启动到关闭的生命周期，compilation是修改一次，就会创建一次

// 编写去除注释的plugin
// 通过compiler.hooks.emit.tap()触发生成文件的钩子
// 通过compilaction.assets获取生成后的文件，然后遍历每个文件
// 通过source()获取文件的内容，用正则relace注释的代码
// 更新构建对象
// 执行回调

// vite
// 基于koa构建的开发服务器，通过koa中间件请求body，es-module-lexer解析资源ast，如import的是绝对路径，那么就视为npm模块，例如：vue => /@modules/vue
// 支持裸模块导入：通过开发服务器拦截请求并转换成浏览器可运行的esm语句，达到按需打包的目标
// 生产环境引入rollup打包
// 预构建通过esbuild实现快速冷启动，esbuild用Go开发

// webpack 和 rollup 区别
// 两者在不同场景下展现优势
// 开发应用时推荐webpack，开发库时推荐rollup
// rollup代码效率更简洁、效率更高
// rollup不需要额外配置tree-shake

// npm run xxx执行逻辑
// npm install会创建软连接，其实是一种映射，然后执行npm run xxx会先在当前目录的node_moudules/.bin目录查找要执行的程序，如果找到则运行，如果没找到就去全局的node_moudules/.bin目录查找，如果全局也没有找到，就去path环境变量找

// commonjs 和 esmodule 区别
// 两者的模块导入导出语法不同：commonjs是module.exports，exports导出，require导入；esmodule则是export导出，import导入
// commonjs是单值导出，esmodule可以导出多个
// commonjs是运行时加载模块，esmodule是在静态编译期间就确定模块的依赖
// esmodule在编译期间会将所有import提升到顶部，commonjs不会提升require
// commonjs导出的是一个值拷贝，会对加载结果进行缓存，一旦内部再修改这个值，则不会同步到外部。esmodule是导出的一个引用，内部修改可以同步到外部
// commonjs中的变量esmodule没有：arguments、require、module、exports、__filename
// commonjs的一个模块就是一个脚本文件
// {
//   id: '...',
//   exports: { ... },
//   loaded: true,
//   ...
// }

// es6 和 commonjs对循环引用的处理有什么不同
// 循环加载指的是a脚本的执行依赖b脚本，b脚本的执行依赖a脚本
// commonjs模块是加载时执行。一旦出现某个模块被“循环加载”，就只输出已经执行的部分，没有执行的部分不会输出
// es6模块对导出模块，变量，对象是动态引用，遇到模块加载命令import时不会去执行模块，而只是生成一个指向被加载模块的引用，等到真的需要用到时，再到模块里面去取值