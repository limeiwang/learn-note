(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{352:function(v,_,l){v.exports=l.p+"assets/img/interweb.40bd3632.png"},370:function(v,_,l){"use strict";l.r(_);var e=l(42),t=Object(e.a)({},(function(){var v=this,_=v.$createElement,e=v._self._c||_;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("h1",{attrs:{id:"页面加载过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#页面加载过程"}},[v._v("#")]),v._v(" 页面加载过程")]),v._v(" "),e("blockquote",[e("p",[v._v("抛开了对页面的具体分析，任何的性能优化都是站不住脚的，盲目的使用一些优化措施，结果可能会适得其反。因此切实的去分析页面的实际性能表现，不断的改进测试，才是正确的优化途径。")])]),v._v(" "),e("h3",{attrs:{id:"从输入url到页面展示的大致流程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#从输入url到页面展示的大致流程"}},[v._v("#")]),v._v(" 从输入url到页面展示的大致流程")]),v._v(" "),e("ol",[e("li",[v._v("浏览器主进程会校验"),e("code",[v._v("url")]),v._v(" "),e("ol",[e("li",[v._v("输入内容是url：则转换成完整的url")]),v._v(" "),e("li",[v._v("如果非url则使用默认的搜索引擎进行搜索")])])]),v._v(" "),e("li",[v._v("当按下回车键后，在当前页面会尝试调用"),e("code",[v._v("beforeunload")]),v._v(" "),e("ol",[e("li",[v._v("如果有 addEventListener + beforeunload 并且有设置 preventDefault 那么会弹窗提示")]),v._v(" "),e("li",[v._v("若用户确认则启动新页面导航")])])]),v._v(" "),e("li",[v._v("浏览器进入loading状态，主进程构建请求行信息，通过IPC将url发送给"),e("code",[v._v("网络进程")])]),v._v(" "),e("li",[v._v("网络进程首先会去查找本地缓存（也就是强缓存）\n"),e("ol",[e("li",[v._v("有缓存：拦截请求，返回200")])])]),v._v(" "),e("li",[v._v("若无缓存则开始DNS域名解析，拿到ip\n"),e("ol",[e("li",[v._v("有DNS缓存：取缓存")])])]),v._v(" "),e("li",[v._v("尝试建立"),e("code",[v._v("TCP")]),v._v("连接\n"),e("ol",[e("li",[v._v("浏览器有tcp最大并发限制（大部分是6个），如果当前tcp队列超过最大限制则请求会排队等待")]),v._v(" "),e("li",[v._v("ps：TCP 包头很复杂，但是主要关注五个问题，顺序问题，丢包问题，连接维护，流量控制，拥塞控制")])])]),v._v(" "),e("li",[v._v("tcp"),e("code",[v._v("三次握手")]),v._v("，然后tcp包装数据（添加tcp头），将数据发送至传输层")]),v._v(" "),e("li",[v._v("若是"),e("code",[v._v("https")]),v._v("则需要发起"),e("code",[v._v("SSL/TLS")]),v._v("握手\n"),e("ol",[e("li",[e("code",[v._v("SSL/TLS")]),v._v("采用对称加密和非对称加密")])])]),v._v(" "),e("li",[v._v("传输层将数据发送给目标服务器，目标服务器解析")]),v._v(" "),e("li",[v._v("目标服务器检查是否需要重定向\n"),e("ol",[e("li",[v._v("若需要：返回301或302")])])]),v._v(" "),e("li",[v._v("目标服务器尝试读取"),e("code",[v._v("协商缓存")])]),v._v(" "),e("li",[v._v("服务器发送数据")]),v._v(" "),e("li",[v._v("tcp"),e("code",[v._v("四次挥手")]),v._v("（关闭连接）\n"),e("ol",[e("li",[v._v("如果是keep-alive什么的就不需要挥手了")])])]),v._v(" "),e("li",[v._v("网络进程拿到数据包进行解析，根据响应头做对应处理，遇到"),e("code",[v._v("text/html")]),v._v("就通知浏览器进程准备渲染")]),v._v(" "),e("li",[v._v("浏览器进程判断url是否同一站点\n"),e("ol",[e("li",[v._v("同一站点：复用渲染进程")]),v._v(" "),e("li",[v._v("否则：创建新渲染进程")])])]),v._v(" "),e("li",[v._v("浏览器进程通知渲染进程"),e("code",[v._v("接收网络进程数据")])]),v._v(" "),e("li",[v._v("渲染进程接收完数据后通知浏览器主进程"),e("code",[v._v("更新页面状态")])]),v._v(" "),e("li",[v._v("渲染进程对页面进行"),e("code",[v._v("加载、解析")]),v._v(" "),e("ol",[e("li",[v._v("构建DOM树和styleSheet（CSSOM）")]),v._v(" "),e("li",[v._v("合并DOM和CSSOM，生成 "),e("code",[v._v("computedStyle")]),v._v(" 得到 layout tree")])])]),v._v(" "),e("li",[v._v("画布绘制\n"),e("ol",[e("li",[v._v("绘制会有分层、分块、合成")]),v._v(" "),e("li",[v._v("如果需要3d渲染，会通知主进程调用 GPU进程")]),v._v(" "),e("li",[v._v("JS资源要等脚本下载完成并执行后才会继续解析HTML（此时可以使用defer和async）\n"),e("ul",[e("li",[v._v("defer是延迟执行。类似放在body后面")]),v._v(" "),e("li",[v._v("async是异步执行。下载完毕执行")])])])])])]),v._v(" "),e("p",[v._v("其实最根本的原理是：代码经过ast语法解析生成字节码，最后编译成二进制码（机器码）然后存入内存，系统将第一条内存指令存入cpu的寄存器中，cpu进行读取、分析、执行指令。")]),v._v(" "),e("h3",{attrs:{id:"网络传输过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#网络传输过程"}},[v._v("#")]),v._v(" 网络传输过程")]),v._v(" "),e("p",[e("img",{attrs:{src:l(352),alt:"因特网"}})])])}),[],!1,null,null,null);_.default=t.exports}}]);