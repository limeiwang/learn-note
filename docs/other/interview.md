# 面试问题
> 总结出去面试所被问到的问题


### vue数据双向绑定原理
>Vue的双向绑定是利用订阅-发布者模式+数据劫持实现的

使用`Object.defineProperty`和ES6的`Proxy`，这就是进行数据劫持或数据代理。

利用`Object.defineProperty`的`getter`方法：由`Deps`收集`Watcher`对象，在`setter`中`notify`。

在`getter`中实现绑定的而不是`setter`，这样可以只劫持被使用的数据。

双向绑定实现原理图：

![render](../img/render.png)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta http-equiv="X-UA-Compatible" content="ie=edge" />
	<title>Document</title>
</head>
<body>
	
	<div id="app">
		<div>
			<input v-model="num"/>
			<p v-bind="num"></p>
		</div>
		<div>
			<button @click="addNum">
				加一次
			</button>
		</div>
	</div>
	
	<script>

		let protoToString = Object.prototype.toString;

		function isArray(value) {
			return protoToString.call(value) === '[object Array]'
		}

		class Watcher {
			constructor(node, cb, key){
				this.node = node;
				this.cb = cb;
				this.key = key;
			}

			update () {
				this.cb(this.node);
			}
		}
		
		class Vue {
			constructor({el, data, methods, render}) {
				this.$ele = document.querySelector(el);
				// x
				this.$dep = {};
				this.$data = this._obs(data);
				this.$methods = methods;
				this._compileHtml(this.$ele);
			}

			// 数据劫持
			_obs(data) {
				let _that = this
				return new Proxy(data, {
					get(target, key) {
						return target[key];
					},
					set(target, key, value) {
						let val = Reflect.set(target, key, value);
						_that.$dep[key].forEach(item => item.update());
						return val;
					}
				});
			}

      // 订阅
			_pushWatcher(watcher) {
				if (!this.$dep[watcher.key]) {
					this.$dep[watcher.key] = [];
				}
				this.$dep[watcher.key].push(watcher);
			}

			// 解析html
			_compileHtml(ele) {
				const nodes = Array.from(ele.children);
				let data = this.$data;
				for(let node of nodes) {
					let attrs = Array.from(node.attributes);
					// 判断是否input???
					if (node.getAttribute('v-model')) {
						const key = node.getAttribute('v-model');
						let cb = () => {
							node.value = this.$data[key];
						}
						cb();
						this._pushWatcher(new Watcher(node, cb, key));
						node.addEventListener('input', () => {
							data[key] = node.value;
						});
					}
					if (node.getAttribute('v-bind')) {
						const key = node.getAttribute('v-bind');
						let cb = () => {
							node.innerHTML = this.$data[key];
						}
						cb();
						this._pushWatcher(new Watcher(node, cb, key));
					}
					if (node.getAttribute('@click')) {
						const key = node.getAttribute('@click');
						node.addEventListener('click', () => {
							this.$methods[key].call(this);
						});
					}
					// 子元素递归
					if (node.children && node.children.length) {
						this._compileHtml(node);
					}
				}
			}
		}

    // 使用
		var app = new Vue({
			el: '#app',
			data: {
				num: 0
			},
			methods: {
				addNum() {
					this.$data.num++
				}
			}
		})
		
	</script>
</body>
</html>
```

**注意点：**
* Vue在初始化组件数据(data、props、computed、methods、events、watch)时，发生在create时期（beforeCreate与created之间）
* render(渲染)触发的是Data的getter操作（保证视图中用到的数据改变才触发后续的重新渲染）
* Vue2.0的数据劫持`Object.defineProperty`方法是无法监听`Array`变化的
  * 尤大使用了hack手法，重写了['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']，
  * 同时使用`const arrayMethods = Object.create(arrayProto)`确保不污染原生数组方法



### Object.defineProperty vs Proxy

#### Vue2.0
1. 基于Object.defineProperty，不具备监听数组的能力，需要重新定义数组的原型来达到响应式。
2. Object.defineProperty 无法检测到对象属性的添加和删除 。
3. 由于Vue会在初始化实例时对属性执行getter/setter转化，所有属性必须在data对象上存在才能让Vue将它转换为响应式。
4. 深度监听需要一次性递归，对性能影响比较大。
#### Vue3.0
1. 基于Proxy和Reflect，可以原生监听数组，可以监听对象属性的添加和删除。
2. 不需要一次性遍历data的属性，可以显著提高性能。
3. 因为Proxy是ES6新增的属性，有些浏览器还不支持,只能兼容到IE11 。




### vue的生命周期
>浏览器有8个钩子，但是node中做服务端渲染的时候只有beforeCreate和created
#### 初始化阶段
1. `beforeCreate`是new Vue()之后触发的第一个钩子，在当前阶段data、methods、computed以及watch上的数据和方法`都不能`被访问。
2. `created`在实例创建完成后发生，当前阶段已经完成了`数据观测`，也就是可以使用数据，更改数据，在这里更改数据不会触发`updated函数`。可以做一些初始数据的获取，在当前阶段`无法与Dom进行交互`，如果非要想，可以通过`vm.$nextTick`来访问Dom。
#### 挂载阶段
3. `beforeMount`发生在`挂载之前`，在这之前template模板已导入渲染函数编译。而当前阶段`虚拟Dom`已经创建完成，即将开始渲染。在此时也可以对数据进行更改，`不会触`发updated。
4. `mounted`在`挂载完成后`发生，在当前阶段，真实的Dom`挂载完毕`，数据完成双向绑定，可以访问到`Dom节点`，使用$refs属性对Dom进行操作。
#### 更新阶段
5. `beforeUpdate`发生在`更新之前`，也就是响应式数据发生更新，虚拟dom`重新渲染之前`被触发，你可以在当前阶段进行更改数据，不会造成重渲染。
6. `updated`发生在`更新完成之后`，当前阶段组件Dom已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致`无限循环`的更新。
#### 销毁阶段
7. `beforeDestroy`发生在`实例销毁之前`，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器，销毁父组件对子组件的重复监听。beforeDestroy(){Bus.$off("saveTheme")}
8. `destroyed`发生在`实例销毁之后`，这个时候只剩下了`dom空壳`。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

### vue的单向数据流
所有的 prop 都使得其父子 prop 之间形成了一个`单向下行绑定`：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件`意外改变`父级组件的状态，从而导致你的应用的`数据流向`变的混乱。

### v-if vs v-show
1. v-if是`真正`的条件渲染，因为它会确保在切换的过程中条件块内的事件监听器和子组件适当地被撤销和重建。
2. v-if也是`惰性`的：如果在渲染的时条件为假，则什么也不做--直到条件第一次变为真时，才会开始渲染条件块。
3. 相比之下，v-show就简单得多--不管初始条件是什么，元素总是会被渲染，并且只是简单地基于CSS进行切换。
> v-if有更高的切换开销，而v-show有更高的初始化渲染开销。因为，如果需要非常频繁地切换，则使用v-show较好；如果在运行时条件很少改变，则v-if较好。


### link标签 vs @import
1. link属于html标签，而@import是css提供的 
2. 页面被加载时，link会同时被加载，而@import引用的css会等到页面加载结束后加载。 
3. link是html标签，因此没有兼容性，而@import只有IE5以上才能识别。 
4. link方式样式的权重高于@import的。
5. link可以使用 js 动态引入，@import不行

