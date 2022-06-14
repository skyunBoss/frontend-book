// http 面试题：https://zhuanlan.zhihu.com/p/135947893

// http 1.0 1.1 2.0 区别

// http 1.0 特性
//  无状态
//      服务器不跟踪不记录请求过的状态
//  无连接
//      每次发起请求会重新建立一个TCP请求
//      上一次请求失败，下一次请求会阻塞
//  支持基本的 get post 方法

// http 1.1 特性
//  缓存策略 cache-control E-tag 等
//  长连接
//      connection: keep-alive，一次 tcp 连接多次请求
//  管道化
//      可以接上一次请求之后继续发送请求，不需要等上一次请求响应，按顺序请求，按顺序响应
//  缓存处理
//  断点续传
//      状态码 206
//  支持新的方法 put delete 等，可用于 restful api

// http 2.0 特性
//  多路复用
//      一次 tcp 连接中可以多个 http 并行请求
//  可压缩 header ，减少体积
//  服务端推送

// https证书
// https://juejin.cn/post/6844904065227292685

// https 安全
// 数据传输是用对称加密，防止传输过程被监听、窃取
// 防止中间人攻击，提供网站身份证明

// https 传输过程
// 客户端发起https请求，服务端返回https证书，客户端验证证书合法性，验证通过后生成加密算法的随机数，通过证书的公钥对随机数进行对称加密传输到服务端，服务端接收后通过私钥解密

// https 抓包
// 只会防止用户在不知情的情况下监听，若用户主动授权，就会被中间人抓包

// tcp
// tcp需要三次握手才能建立连接

// tcp三次握手
// https://juejin.cn/post/6844904194764177416

// udp
// udp无需建立连接、会出现丢包、顺序不一致情况

// http状态码
// 1xx：指示消息,表示请求已接收，继续处理

// 2xx：成功,表示请求已被成功接收，处理
//  200 OK：客户端请求成功
//  204 No Content：无内容。服务器成功处理，但未返回内容。一般用在只是客户端向服务器发送信息，而服务器不用向客户端返回什么信息的情况。不会刷新页面。
//  206 Partial Content：服务器已经完成了部分GET请求（客户端进行了范围请求）。响应报文中包含Content-Range指定范围的实体内容

// 3xx 重定向
//  301 Moved Permanently：永久重定向，表示请求的资源已经永久的搬到了其他位置。
//  302 Found：临时重定向，表示请求的资源临时搬到了其他位置
//  303 See Other：临时重定向，应使用GET定向获取请求资源。303功能与302一样，区别只是303明确客户端应该使用GET访问
//  304 Not Modified：表示客户端发送附带条件的请求（GET方法请求报文中的IF…）时，条件不满足。返回304时，不包含任何响应主体。虽然304被划分在3XX，但和重定向一毛钱关系都没有
//  307 Temporary Redirect：临时重定向，和302有着相同含义。POST不会变成GET

// 4xx：客户端错误
//  400 Bad Request：客户端请求有语法错误，服务器无法理解。
//  401 Unauthorized：请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用。
//  403 Forbidden：服务器收到请求，但是拒绝提供服务
//  404 Not Found：请求资源不存在。比如，输入了错误的url
//  415 Unsupported media type：不支持的媒体类型
//  499 服务端还未返回，客户端主动断开连接
//      nginx proxy_ignore_client_abort: on 在客户端主动关闭连接后， nginx 与分发服务器的连接是否保持连接

// 5xx：服务器端错误，服务器未能实现合法的请求
//  500 Internal Server Error：服务器发生不可预期的错误。
//  503 Server Unavailable：服务器当前不能处理客户端的请求，一段时间后可能恢复正常

// http字段
// 通用标头
//  Cache-Control
//      可缓存性：no-cache（为了防止从缓存中返回过期的资源）、no-store（不缓存）、private（私有缓存）、public（共享缓存）
//      缓存有效性时间：max-age（判断大小是否取缓存中的数据）、s-maxage（类似max-age，不能用于私有缓存）、max-stale（只会在请求头，返回时间内包含过期的缓存数据）、min-fresh（返回时间内的缓存数据）
//      重新验证并重新加载：must-revalidate（缓存过期后校验）、proxy-revalidate（需要再次校验缓存的有效性）
//      其他：only-if-cached（只会在请求头，直接取缓存，缓存没有返回503）、no-transform（不得对资源进行转换）

//  Connection
//      持久性连接：tcp连接未关闭，第二次再发送请求后，就不再需要建立tcp连接，而是可以直接进行请求和响应
//          keep-alive：timeout空闲时间连接必须打开的最短时间，max连接关闭之前服务器所能够接受的最大请求数
//      非持久性连接：请求/响应后就关闭连接
//          close

//  Date
//      请求/响应时间

//  Pragma
//      兼容http 1.0，Pragma: no-cache与Cache-Control: no-cache一致

//  Trailer
//      Trailer 是一个响应首部，允许发送方在分块发送的消息后面添加额外的元信息，这些元信息可能是随着消息主体的发送动态生成的，比如消息的完整性校验，消息的数字签名，或者消息经过处理之后的最终状态等

//  Transfer-Encoding
//      chunked：数据按照一系列块发送，在这种情况下，将省略 Content-Length 标头，并在每个块的开头，需要以十六进制填充当前块的长度，后跟 '\r\n'，然后是块本身，然后是另一个'\r\n'。当将大量数据发送到客户端并且在请求已被完全处理之前，可能无法知道响应的总大小时，分块编码很有用。例如，在生成由数据库查询产生的大型 HTML 表时或在传输大型图像时。分块的响应看起来像这样

// 实体标头
//  Allow
//  Content-Encoding
//  Content-Language
//  Content-Length
//  Content-Location
//  Content-MD5
//  Content-Range
//  Content-Type
//  Expires
//  Last-Modified：服务器响应请求时，返回该资源文件在服务器最后的修改时间

// 请求标头
//  Accept
//      文本文件：text/html、text/plain、text/css、application/xhtml+xml、application/xml
//      图片文件：image/jpeg、image/gif、image/png
//      视频文件：video/mpeg、video/quicktime
//      应用程序二进制文件：application/octet-stream、application/zip

//  Accept-Charset
//  Accept-Encoding
//  Accept-Language
//  Authorization
//  Expect
//  From
//  Host
//  If-Match
//  If-Modified-Since：携带上次请求返回的Last-Modified的值
//  If-None-Match：携带上次请求返回的Etag的值
//  If-Range
//  If-Unmodified-Since
//  Max-Forwards
//  Proxy-Authorization
//  RangeReferer
//  TE
//  User-Agent

// 响应标头
//  Accept-Ranges
//  Age
//  ETag：服务器响应请求时，返回该文件的一个唯一标识，由服务器生成返回
//  Location
//  Proxy-Authenticate
//  Retry-After
//  Server
//  Vary
//      响应标头确定如何匹配请求标头，以决定是否可以使用缓存的响应，请求标头不相同，不能使用缓存，必须从源头服务器重新获取资源
//  www-Authenticate

// get 和 post区别
// 请求参数：get请求参数是通过url传递，多个参数&连接，post通过request body
// 请求缓存：get请求会被缓存，而post请求不会，除非手动设置
// 安全性：post比get安全，get请求在浏览器回退时是无害的，而post会再次请求
// 编码方式：get请求只能进行url编码，而post支持多种编码方式
// 参数数据类型：get只接受ASCLL字符，而post没有限制

// 从输入url到渲染页面都发生了什么
// 地址栏输入url
// dns解析；首先查找本地dns缓存，不同的浏览器dns设置不同，如果缓存，则返回IP，如果没有浏览器会查找本地hosts文件是否有对应的IP，如果有直接返回，如果没有就向根域名服务器发起一个dns查询
// tcp连接
// 发送HTTP请求
// 服务器处理请求并返回HTTP报文
// 浏览器解析渲染页面
// 连接结束

// dns是一种分层数据库：根域名服务器（根dns服务器）、顶级域名服务器（.com、.org...）、权威dns服务器
// dns两种查询方式：递归查询、迭代查询，两者的区别：如果根域名服务器无法告知本地dns服务器下一步该访问哪个顶级域名服务器，就会用递归查询；如果根域名服务器能够告知本地dns服务器需要访问的顶级域名服务器，就会用迭代查询

// 浏览器缓存
// https://juejin.cn/post/6844903593275817998
// 强缓存
//  强缓存字段：cache-control、expires
//  cache-control优先级高于expires
//  浏览器向服务器发起请求时，服务器会将缓存规则放入http响应头中和请求结果一起返回给浏览器
//  expires返回的绝对值，cache-control返回的相对值
//  浏览器network灰色背景请求代表强缓存 size分别为from memory cache（内存） 和 from disk cache（硬盘）
// 协商缓存
//  协商缓存是强缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程
//  协商缓存生效返回304；则失效返回200
//  协商缓存字段：Last-Modified/If-Modified-Since、Etag/If-None-Match
//  Etag/If-None-Match优先级高于Last-Modified/If-Modified-Since

// tcp为什么要三次握手
// 两次握手是最基本的，一般情况下能保证tcp连接正常进行
// 需要第三次握手是为了防止已失效的请求报文段突然又传送到了服务端而产生连接的误判
// 假如没有第三次握手，服务端接收到失效的请求报文段就会认为连接已创建，从而进入等待客户端发送数据的状态。但客户端并没有发送请求，所以不会发送数据。于是服务端就会一直处于等待状态，从而浪费资源