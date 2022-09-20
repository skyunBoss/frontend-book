// nuxt.js
//  nuxt.config.js
//  modern 提供现代化浏览器和旧浏览器（如IE）版本的依赖
//  buildModules 该配置项用来开发过程中需要的模块，需要nuxt > 2.9
//  render 允许您自定义渲染页面的运行时选项

// nuxt 2.x sass-loader版本不能高于 10.1.1

// hardsource Cannot read property 'hash' of undefined
// rm -rf node_modules/.cache/hard-source

// Memory usage 内存溢出
// node中js使用内存只能使用部分内容（64位系统下约为1.4 GB，32位系统下约为0.7 GB）
// 项目越大 打包就会占用很多的系统资源
// 终端执行 export NODE_OPTIONS="--max-old-space-size=8192"

//  vuex
