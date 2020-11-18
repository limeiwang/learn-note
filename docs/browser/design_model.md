# 设计模式
在程序设计中有很多实用的设计模式，而其中大部分语言的实现都是基于“类”。
在JavaScript中并没有类这种概念，JS中的函数属于一等对象，在JS中定义一个对象非常简单（var obj = {}），而基于JS中闭包与弱类型等特性，在实现一些设计模式的方式上与众不同。
本文基于《JavaScript设计模式与开发实践》一书，用一些例子总结一下JS常见的设计模式与实现方法。

### 设计原则

1. 单一职责原则（SRP）

一个对象或方法只做一件事情。如果一个方法承担了过多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。
应该把对象或方法划分成较小的粒度

2. 最少知识原则（LKP）

一个软件实体应当 尽可能少地与其他实体发生相互作用 
应当尽量减少对象之间的交互。如果两个对象之间不必彼此直接通信，那么这两个对象就不要发生直接的 相互联系，可以转交给第三方进行处理

3. 开放-封闭原则（OCP）

软件实体（类、模块、函数）等应该是可以 扩展的，但是不可修改
当需要改变一个程序的功能或者给这个程序增加新功能的时候，可以使用增加代码的方式，尽量避免改动程序的源代码，防止影响原系统的稳定

作者的这个说明解释得挺好

>假设有一个空房间，我们要日复一日地往里 面放一些东西。最简单的办法当然是把这些东西 直接扔进去，但是时间久了，就会发现很难从这 个房子里找到自己想要的东西，要调整某几样东 西的位置也不容易。所以在房间里做一些柜子也 许是个更好的选择，虽然柜子会增加我们的成 本，但它可以在维护阶段为我们带来好处。使用 这些柜子存放东西的规则，或许就是一种模式

学习设计模式，有助于写出可复用和可维护性高的程序
设计模式的原则是“找出 程序中变化的地方，并将变化封装起来”，它的关键是意图，而不是结构。
不过要注意，使用不当的话，可能会事倍功半。

### 一、单例模式
1. 定义: 保证一个类仅有一个实例，并提供一个访问它的全局访问点
2. 核心: 确保只有一个实例，并提供全局访问

#### 实现
假设要设置一个管理员，多次调用也仅设置一次，我们可以使用闭包缓存一个内部变量来实现这个单例

``` js
function SetManager(name) {
    this.manager = name;
}

SetManager.prototype.getName = function() {
    console.log(this.manager);
};

var SingletonSetManager = (function() {
    var manager = null;

    return function(name) {
        if (!manager) {
            manager = new SetManager(name);
        }

        return manager;
    } 
})();

SingletonSetManager('a').getName(); // a
SingletonSetManager('b').getName(); // a
SingletonSetManager('c').getName(); // a
```

这是比较简单的做法，但是假如我们还要设置一个HR呢？就得复制一遍代码了
所以，可以改写单例内部，实现地更通用一些
``` js
// 提取出通用的单例
function getSingleton(fn) {
    var instance = null;

    return function() {
        if (!instance) {
            instance = fn.apply(this, arguments);
        }

        return instance;
    }
}
```
再进行调用，结果还是一样
``` js
// 获取单例
var managerSingleton = getSingleton(function(name) {
    var manager = new SetManager(name);
    return manager;
});

managerSingleton('a').getName(); // a
managerSingleton('b').getName(); // a
managerSingleton('c').getName(); // a
```

这时，我们添加HR时，就不需要更改获取单例内部的实现了，仅需要实现添加HR所需要做的，再调用即可

``` js
function SetHr(name) {
    this.hr = name;
}

SetHr.prototype.getName = function() {
    console.log(this.hr);
};

var hrSingleton = getSingleton(function(name) {
    var hr = new SetHr(name);
    return hr;
});

hrSingleton('aa').getName(); // aa
hrSingleton('bb').getName(); // aa
hrSingleton('cc').getName(); // aa
```

或者，仅想要创建一个div层，不需要将对象实例化，直接调用函数
结果为页面中仅有第一个创建的div

``` js 
function createPopup(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    document.body.append(div);

    return div;
}

var popupSingleton = getSingleton(function() {
    var div = createPopup.apply(this, arguments);
    return div;
});

console.log(
    popupSingleton('aaa').innerHTML,
    popupSingleton('bbb').innerHTML,
    popupSingleton('bbb').innerHTML
); // aaa  aaa  aaa
```

### 工厂模式

> 一个工厂(类) 能生产各种零件(实例)

##### 简单的工厂模式

通过一个类获取不同类的实例

``` js
    class Cat {}
    class Dog {}
    class Pig {}
    
    function Factory(type, args) {
        switch (type){
            case 'cat':
                return new Cat(args);
                break;
            case 'dog':
                return new Dog(args);
                break;
            default:
                return new Pig(args);
                break;
        }
    }
    
    const cat = new Factory('cat', {name: 'cat'});
    const dog = new Factory('dog', {name: 'dog'});
    const pig = new Factory('pig', {name: 'pig'});
    
    console.log(cat, dog, pig)
```


##### 抽象工厂模式

通过继承抽象的类（含有未实现的方法）、结合简单工厂模式，生成抽象工厂

抽象工厂的好处：通用方法写在工厂函数中，不需要重复实现，不同个性化代码在子类中实现

实现：省略...


##### 复杂工厂模式

允许工厂产生的不同零件一起工作：

``` js
    class Wheel {
        turn() {
            console.log('轮子开始转动啦');
        }
    }
    
    class Oil {
        warn() {
            console.log('汽油不足')
        }
    }
    
    class Cart {
        constructor() {
            this.cart = {}
        }
        
        getPart(name, args) {
            return this.cart[name] ? new this.cart[name](args) : null;
        }
        
        setPart(name, Part) {
            this.cart[name] = Part;
        }
    }
    
    const cart = new Cart();
    
    cart.setPart('wheel', Wheel)
    cart.setPart('oil', Oil)
    
    const wheel = cart.getPart('wheel', {name: '轮子A'});
    const oil = cart.getPart('oil', {name: '汽油A'});
    
    wheel.turn();
    oil.warn();
```