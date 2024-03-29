# 页面加载过程

> 抛开了对页面的具体分析，任何的性能优化都是站不住脚的，盲目的使用一些优化措施，结果可能会适得其反。因此切实的去分析页面的实际性能表现，不断的改进测试，才是正确的优化途径。

### 从输入url到页面展示的大致流程
1. 浏览器主进程会校验`url`
    1. 输入内容是url：则转换成完整的url
    2. 如果非url则使用默认的搜索引擎进行搜索
2. 当按下回车键后，在当前页面会尝试调用`beforeunload`
    1. 如果有 addEventListener + beforeunload 并且有设置 preventDefault 那么会弹窗提示
    2. 若用户确认则启动新页面导航
3. 浏览器进入loading状态，主进程构建请求行信息，通过IPC将url发送给`网络进程`
4. 网络进程首先会去查找本地缓存（也就是强缓存）
    1. 有缓存：拦截请求，返回200
5. 若无缓存则开始DNS域名解析，拿到ip
    1. 有DNS缓存：取缓存
6. 尝试建立`TCP`连接
    1. 浏览器有tcp最大并发限制（大部分是6个），如果当前tcp队列超过最大限制则请求会排队等待
    2. ps：TCP 包头很复杂，但是主要关注五个问题，顺序问题，丢包问题，连接维护，流量控制，拥塞控制
7. tcp`三次握手`，然后tcp包装数据（添加tcp头），将数据发送至传输层
8. 若是`https`则需要发起`SSL/TLS`握手
    1. `SSL/TLS`采用对称加密和非对称加密
9. 传输层将数据发送给目标服务器，目标服务器解析
10. 目标服务器检查是否需要重定向
    1. 若需要：返回301或302
11. 目标服务器尝试读取`协商缓存`
12. 服务器发送数据
13. tcp`四次挥手`（关闭连接）
    1. 如果是keep-alive什么的就不需要挥手了
14. 网络进程拿到数据包进行解析，根据响应头做对应处理，遇到`text/html`就通知浏览器进程准备渲染
15. 浏览器进程判断url是否同一站点
    1. 同一站点：复用渲染进程
    2. 否则：创建新渲染进程
16. 浏览器进程通知渲染进程`接收网络进程数据`
17. 渲染进程接收完数据后通知浏览器主进程`更新页面状态`
18. 渲染进程对页面进行`加载、解析`
    1. 构建DOM树和styleSheet（CSSOM）
    2. 合并DOM和CSSOM，生成 `computedStyle` 得到 layout tree
19. 画布绘制
    1. 绘制会有分层、分块、合成
    2. 如果需要3d渲染，会通知主进程调用 GPU进程
    3. JS资源要等脚本下载完成并执行后才会继续解析HTML（此时可以使用defer和async）
        * defer是延迟执行。类似放在body后面
        * async是异步执行。下载完毕执行

其实最根本的原理是：代码经过ast语法解析生成字节码，最后编译成二进制码（机器码）然后存入内存，系统将第一条内存指令存入cpu的寄存器中，cpu进行读取、分析、执行指令。

### 网络传输过程

![因特网](../img/interweb.png)


### 域名解析

IP 查找顺序（查询到就返回）

1. 首先从`浏览器缓存`中查找 IP
2. 从`Host文件`中查找 IP
3. 从`路由器`缓存中查找 IP
4. 发送`DNS请求`到 本地DNS服务器（运营商）
5. 从`本地DNS服务器`缓存中查找 IP
6. 以`递归`的方式往`根DNS服务器`发起请求
7. 以`迭代`的方式获取能查询的`顶级域名服务器`位置
8. 顶级服务器告诉本地DNS到`权限服务器`上查询
9. 权限服务器将IP返回给本地DNS
10. 本地DNS将IP保存到自己的缓存中

概念：

* DNS 即 (domain name system，域名系统)，一个域名和IP地址相互映射的分布式数据库。
* 根域名：全球共13个根服务器 (包含所有顶级域名服务器的域名和IP地址)
* 顶级域名：域名的最后一部分（如：.com、.cn、.net 等）
* 二级域名：域名的倒数第二个部分，如：example.baidu.com中，二级域名是Baidu


### TCP三次握手

1. 客户端请求建立连接
2. 服务端确认应答
3. 客户端确认应答

    → ← →

> 目的：应对网络延迟问题，防止网络资源浪费，甚至死锁

三次握手期间，任何1次未收到对面的回复，则都会重发。因此需要确认TCP包的序号问题，所以在IP 包头里面有个 TTL，也即生存时间。


### TCP四次挥手

1. 客户端请求断开连接
2. 服务端应答
3. 服务端请求断开连接
4. 客户端应答

    → ← ← →

> 目的：保证双方都断开连接


### 关于缓存

浏览器缓存策略相关：比如Cache-Control、~~Pragma~~、ETag、Expires、Last-Modified

**强缓存**是利用`Expires`或者`Cache-Control`这两个http header实现的，命中缓存会返回`200`
* 强缓存是不会产生 DNS 解析的，更不会发送请求（**不请求服务器**）
* `expires` 有 **服务器时间** 和 **客户端时间** 不一致导致失效的问题
* `Cache-Control` 在`HTTP 1.1`中为了解决expires的问题而诞生
  * 单位为秒，**不依赖客户端时间**
  * `Cache-Control` 优先级高于 `Expires`


**协商缓存**利用`Last-Modified`或者`Etag`这两个http header实现，命中缓存会返回`304`
* 协商缓存由服务器验证缓存的有效性（**请求服务器**）
* Last-Modified 比较前一个响应头的`Last-Modified`和新请求头的`if-modified-since`（单位秒）
  * 根据时间来缓存
  * 最后修改只能精确到`秒`级
  * 定期生成文件内容没变化时 Last-Modified 改变
* Etag在 `HTTP 1.1` 中出现：比较前一个响应头的 `Etag` 和新请求头的 `If-None-Match`，
  * 优先级高于Last-Modified
  * 基于资源的内容编码生成一串唯一的标识`字符串`来缓存
  * `ETag` 优先级高于 `Last-Modified`


在文件变动的时候需要清除缓存。比如：在webpack打包的时候一般会给JS、CSS、图片的文件名添加`chunkhash`。


[参考](https://www.jianshu.com/p/65605622234b)


### 关于浏览器进程

浏览器是多进程的

多进程的优势
1. 避免单个标签页影响整个浏览器
2. 避免第三方插件影响整个浏览器
3. 利用 cpu 的多核优势

浏览器进程：主要进程
1. 主进程（Browser进程/控制进程）
   * 负责界面展示，与用户交互（前进、后退等）
   * 负责各个页面的管理，创建和销毁其他进程
   * 将渲染经常的结果绘制到页面上
   * 网络资源的管理、下载等
2. 插件进程
   * 为浏览器插件创建的进程
3. GPU进程
   * 用于 3D 绘制
4. 渲染进程
   * 页面渲染，脚本执行，事件处理
   * 每个浏览器标签页都是一个 render进程
5. 网络进程

所以：打开浏览器最少会出现2个进程（主进程和标签页的渲染进程）

PS：浏览器还有 `SharedWorker`进程，方便各页面间的交互


### 渲染进程

渲染进程主要包含以下线程： 主要线程
1. GUI 渲染线程
   * 负责渲染浏览器页面（解析HTML、CSS 构建DOM和 RenderObject树，布局和绘制等）
   * 当然：重绘(Repaint)和回流(Reflow) 也会触发该线程
   * 重点：**GUI渲染线程和JS引擎线程是互斥的**，会在JS引擎空闲时执行
2. JS 引擎线程
   * JS内核（例如: V8引擎）：负责解析、运行 JS脚本程序
   * 如果使用 `WebWorker` 那么JS引擎线程会 向浏览器申请开一个子线程
     * `WebWorker` 是渲染进程开的子线程，不受JS引擎线程管理
     * JS线程 和 Worker线程的通信通过 `postMessage API`
     * `postMessage` 交互数据需要序列化对象
3. 事件触发线程
   * 宏任务、微任务、事件（比如点击）、AJAX请求等 被事件符合条件触发时。会将任务添加到事件线程中
   * 事件触发线程会把事件添加到待处理队列的队尾，等待 JS 引擎处理
4. 定时器线程
   * 定时器所在的线程（`setInterval`和`setTimeout`等）
   * 因为JS引擎线程处于阻塞状态会影响计时的准确性，所以单独作为一个线程
   * W3C标准：setTimeout最小间隔为 4ms
5. 异步http请求线程
   * 处理请求的线程，如果有请求回调函数，会将该回调放入事件队列中，由 JS引擎执行

PS：
1. `DOMContentLoaded` 事件触发时：仅 `DOM` 加载完成（不包括css、图片资源、async脚本）
2. `onload` 事件触发时：所有资源都加载完成且渲染完毕

### 页面渲染

![页面加载](../img/page_load.png)

CSS加载是否阻塞渲染？（**是否阻塞根据是否需要重绘/回流决定**）
* CSS加载 **不会阻塞 DOM树的解析**
  * CSS的加载是由**主进程的下载线程**异步下载的，解析过程不影响渲染流程
* CSS加载 **会阻塞 Render树渲染**
  * 渲染时需要等CSS加载完毕，以获取CSS信息
  * css加载阻塞DOM树渲染，可以减少重绘/回流
* css加载 **会阻塞 后续js语句的执行**
  * js可能会去获取或改变元素的样式，等所有的css加载渲染完成后在执行js，可以减少重绘/回流

为何 GUI渲染线程 和 JS引擎线程会产生互斥？

因为JavaScript是可以操作DOM的，如果再修改这些元素属性的同时渲染页面，那么渲染线程获得的元素数据可能会不一致，（如果不一致那么渲染线程怎么知道该做什么事情？），因此为防止渲染出现异常，所以**当JS引擎执行时 GUI线程 会被挂起，GUI更新会等JS引擎线程空闲时执行**。


##### css图层

在页面渲染时：有分层、分块、合成的操作。因此**利用css实现的动画性能大于直接使用js实现的动画**

css图层分为：普通图层和复合图层

复合图层就是传说中的硬件加速技术，独立于普通文档流中，改动后可以避免整个页面重绘，提升性能，但是也不能大量使用，会导致资源消耗过度。

如果变成复合图层？
1. `translate3d`、`translateZ`
2. `will-change`(提前告诉浏览器需要优化) 和 `opacity`/过渡动画(如：transform) 在动画期间是复合图层
3. `video`、`iframe`、`canvas`、`webgl`

PS：
1. `absolute` 虽然可以脱离普通文档流，但是无法脱离默认复合层。
2. 复合图层的隐式合成：如果a是一个复合图层，而且b在a上面，那么b也会被隐式转为一个复合图层

