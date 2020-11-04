# RequestJs

requestjs   是一个模块载入框架，它遵循的是AMD规范，异步加载规定。

node  ---  commonjs   同步加载

requirejs 全局变量：require	define

require（[], function() {}）引入加载模块

default（name, [], fn）定义模块

优点:
1. 异步加载模块，防止阻塞页面的渲染;
2. 有效管理模块之间的依赖;
3. 防止命名冲突。

--- 
开始使用
---
``` js
<script   sync="true" defer data-main> // 异步加载requirejs
// sync="true"  defer    异步加载
// data-main 	指定项目的主入口文件
```
``` js
require.config({数据类型: object});
```

---
起服务
---
cnpm install http-server  -g

