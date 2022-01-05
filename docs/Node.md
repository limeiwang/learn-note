# Node

### node.js是什么?
1. Node.js 是一个JavaScript的运行环境(runtime)。
2. 实际上它是对 Google  V8引擎（由c++语言编写的一个JavaScript引擎）进行了封装。
3. V8引擎执行JS的速度非常快，性能非常好。

### 使用node.js有什么好处？
1. Nodejs让JavaScript流畅的运行在服务器端，打破了语言的边界，解放了前端程序员的职业约束，走向了一个崭新的舞台。
2. 可以解析JavaScript代码（没有浏览器的安全限制），还提供了一套API，例如：文件的读写，进程的管理，网络通信等。

## 特点
1. 异步I/O
2. 事件与回调函数
3. 单线程
4. 跨平台

#### 异步I/O
提升总体的并行处理能力，达到充分利用CPU（处理器）的效果。

#### 事件与回调函数
Node.js异步编程的直接体现就是回调，Node所有API都支持回调函数，在执行代码时没有阻塞或等待文件I/O操作，这大大提高了Node.js的性能可以处理大量的并发请求

## Commonjs
>概述：有多人协助或或大量的js文件批量

### require
1. 返回值是当前所引模块的 module.exports（初始值是{}）的属性值
2. require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的modul.export对象


### module
1. module对象，代表当前模块
2. module.exports 初始是一个空{}
