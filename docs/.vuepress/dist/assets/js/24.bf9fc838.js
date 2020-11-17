(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{384:function(v,e,_){"use strict";_.r(e);var o=_(42),t=Object(o.a)({},(function(){var v=this,e=v.$createElement,_=v._self._c||e;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"面试问题"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#面试问题"}},[v._v("#")]),v._v(" 面试问题")]),v._v(" "),_("blockquote",[_("p",[v._v("总结出去面试所被问到的问题")])]),v._v(" "),_("h3",{attrs:{id:"vue数据双向绑定原理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#vue数据双向绑定原理"}},[v._v("#")]),v._v(" vue数据双向绑定原理")]),v._v(" "),_("p",[v._v("附上链接: https://juejin.im/post/6850418111985352711")]),v._v(" "),_("h3",{attrs:{id:"vue的生命周期"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#vue的生命周期"}},[v._v("#")]),v._v(" vue的生命周期")]),v._v(" "),_("blockquote",[_("p",[v._v("浏览器有8个钩子，但是node中做服务端渲染的时候只有beforeCreate和created")])]),v._v(" "),_("ol",[_("li",[_("code",[v._v("beforeCreate")]),v._v("是new Vue()之后触发的第一个钩子，在当前阶段data、methods、computed以及watch上的数据和方法"),_("code",[v._v("都不能")]),v._v("被访问。")]),v._v(" "),_("li",[_("code",[v._v("created")]),v._v("在实例创建完成后发生，当前阶段已经完成了"),_("code",[v._v("数据观测")]),v._v("，也就是可以使用数据，更改数据，在这里更改数据不会触发"),_("code",[v._v("updated函数")]),v._v("。可以做一些初始数据的获取，在当前阶段"),_("code",[v._v("无法与Dom进行交互")]),v._v("，如果非要想，可以通过"),_("code",[v._v("vm.$nextTick")]),v._v("来访问Dom。")]),v._v(" "),_("li",[_("code",[v._v("beforeMount")]),v._v("发生在"),_("code",[v._v("挂载之前")]),v._v("，在这之前template模板已导入渲染函数编译。而当前阶段"),_("code",[v._v("虚拟Dom")]),v._v("已经创建完成，即将开始渲染。在此时也可以对数据进行更改，"),_("code",[v._v("不会触")]),v._v("发updated。")]),v._v(" "),_("li",[_("code",[v._v("mounted")]),v._v("在"),_("code",[v._v("挂载完成后")]),v._v("发生，在当前阶段，真实的Dom"),_("code",[v._v("挂载完毕")]),v._v("，数据完成双向绑定，可以访问到"),_("code",[v._v("Dom节点")]),v._v("，使用$refs属性对Dom进行操作。")]),v._v(" "),_("li",[_("code",[v._v("beforeUpdate")]),v._v("发生在"),_("code",[v._v("更新之前")]),v._v("，也就是响应式数据发生更新，虚拟dom"),_("code",[v._v("重新渲染之前")]),v._v("被触发，你可以在当前阶段进行更改数据，不会造成重渲染。")]),v._v(" "),_("li",[_("code",[v._v("updated")]),v._v("发生在"),_("code",[v._v("更新完成之后")]),v._v("，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致"),_("code",[v._v("无限循环")]),v._v("的更新。")]),v._v(" "),_("li",[_("code",[v._v("beforeDestroy")]),v._v("发生在"),_("code",[v._v("实例销毁之前")]),v._v('，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器，销毁父组件对子组件的重复监听。beforeDestroy(){Bus.$off("saveTheme")}')]),v._v(" "),_("li",[_("code",[v._v("destroyed")]),v._v("发生在"),_("code",[v._v("实例销毁之后")]),v._v("，这个时候只剩下了"),_("code",[v._v("dom空壳")]),v._v("。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。")])]),v._v(" "),_("h3",{attrs:{id:"vue的单向数据流"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#vue的单向数据流"}},[v._v("#")]),v._v(" vue的单向数据流")]),v._v(" "),_("p",[v._v("所有的 prop 都使得其父子 prop 之间形成了一个"),_("code",[v._v("单向下行绑定")]),v._v("：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件"),_("code",[v._v("意外改变")]),v._v("父级组件的状态，从而导致你的应用的"),_("code",[v._v("数据流向")]),v._v("变的混乱。")]),v._v(" "),_("h3",{attrs:{id:"v-if-vs-v-show"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#v-if-vs-v-show"}},[v._v("#")]),v._v(" v-if vs v-show")]),v._v(" "),_("ol",[_("li",[v._v("v-if是"),_("code",[v._v("真正")]),v._v("的条件渲染，因为它会确保在切换的过程中条件块内的事件监听器和子组件适当地被撤销和重建。")]),v._v(" "),_("li",[v._v("v-if也是"),_("code",[v._v("惰性")]),v._v("的：如果在渲染的时条件为假，则什么也不做--直到条件第一次变为真时，才会开始渲染条件块。")]),v._v(" "),_("li",[v._v("相比之下，v-show就简单得多--不管初始条件是什么，元素总是会被渲染，并且只是简单地基于CSS进行切换。")])]),v._v(" "),_("blockquote",[_("p",[v._v("v-if有更高的切换开销，而v-show有更高的初始化渲染开销。因为，如果需要非常频繁地切换，则使用v-show较好；如果在运行时条件很少改变，则v-if较好。")])]),v._v(" "),_("h3",{attrs:{id:"link标签-vs-import"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#link标签-vs-import"}},[v._v("#")]),v._v(" link标签 vs @import")]),v._v(" "),_("ol",[_("li",[v._v("link属于html标签，而@import是css提供的")]),v._v(" "),_("li",[v._v("页面被加载时，link会同时被加载，而@import引用的css会等到页面加载结束后加载。")]),v._v(" "),_("li",[v._v("link是html标签，因此没有兼容性，而@import只有IE5以上才能识别。")]),v._v(" "),_("li",[v._v("link方式样式的权重高于@import的。")]),v._v(" "),_("li",[v._v("link可以使用 js 动态引入，@import不行")])])])}),[],!1,null,null,null);e.default=t.exports}}]);