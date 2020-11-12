# 各种手写代码实现
---
实现深拷贝
---
``` js
// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result = target;
    }
     // 返回最终结果
    return result;
}
let obj1 = {
    a: {
        c: /a/,
        d: undefined,
        b: null
    },
    b: function () {
        console.log(this.a)
    },
    c: [
        {
            a: 'c',
            b: /b/,
            c: undefined
        },
        'a',
        3
    ]
}
let obj2 = deepClone(obj1);
console.log(obj2);
```
---
函数防抖
---
``` js
function debounce(func, delay) {
    let timeout;
    return function(e) {
        clearTimeout(timeout);
        let context = this, args = arguments;
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    };
};

let validate = debounce(function(event) {
    console.log('change:', event);
}, 300);
```

---
函数截流
---
``` js
function throttle(fn, threshhold) {
 var timeout
 var start = new Date;
 var threshhold = threshhold || 160
 return function () {
 var context = this, args = arguments, curr = new Date() - 0
 
 clearTimeout(timeout)//总是干掉事件回调
 if(curr - start >= threshhold){ 
     console.log("now", curr, curr - start)//注意这里相减的结果，都差不多是160左右
     fn.apply(context, args) //只执行一部分方法，这些方法是在某个时间段内执行一次
     start = curr
 }else{
 //让方法在脱离事件后也能执行一次
     timeout = setTimeout(function(){
        fn.apply(context, args) 
     }, threshhold);
    }
  }
}
var mousemove = throttle(function(e) {
 console.log(e.pageX, e.pageY)
});
// 绑定监听
document.querySelector("#panel").addEventListener('mousemove', mousemove);
```

---
实现JSON.stringfiy
---
``` js
(function(NS){  
  
    //简单类型  
    var simpleTypes = ["number", "boolean", "undefined", "string", "function"];  
      
    //JSON.stringify的主函数  
    function stringify(object){  
        var type = typeof object;  
          
        //如果是简单类型，则直接返回简单类型的结果  
        if(indexOf(simpleTypes, type) > -1){  
            return parseSimpleObject(object);  
        }  
  
        //数组对象的  
        if(object instanceof Array){  
            var len = object.length;  
            var resArr = [];  
            for(var i = 0; i < len; i++){  
                var itemType = typeof object[i];  
                if(indexOf(simpleTypes, itemType) > -1){  
  
                    //undefined特殊处理，数组中变成null  
                    if(itemType !=  "undefined"){  
                        resArr.push(parseSimpleObject(object[i]));  
                    }else{  
                        resArr.push("null");  
                    }  
                      
                }else{  
                    //递归处理JS数组中的复杂元素  
                    resArr.push(stringify(object[i]));  
                }  
            }  
              
            return "[" + resArr.join(",") + "]";  
        }  
          
        //普通object对象  
        if(object instanceof Object){  
            if(object == null){  
                return "null";  
            }  
              
            var resArr = [];  
              
            for(var name in object){  
                var itemType = typeof object[name];  
                if(indexOf(simpleTypes, itemType) > -1){  
                    //undefined特殊处理，object中不编码  
                    if(itemType !=  "undefined"){  
                        resArr.push("\"" + name + "\":" + parseSimpleObject(object[name]));      
                    }  
                }else{  
                    resArr.push("\"" + name + "\":" + stringify(object[name]));  
                }  
            }  
              
            return "{" + resArr.join(",") + "}";  
        }  
    }  
      
    function parseSimpleObject(object){  
        var type = typeof object;  
        if(type == "string" || type == "function"){  
            return "\"" + object.toString().replace("\"", "\\\"") + "\"";  
        }  
          
        if(type == "number" || type == "boolean"){  
            return object.toString();  
        }  
          
        if(type == "undefined"){  
            return "undefined";  
        }  
          
        return "\"" + object.toString().replace("\"", "\\\"") + "\"";  
    }  
      
    function indexOf(arr, val){  
        for(var i = 0; i < arr.length; i++){  
            if(arr[i] === val){  
                return i;  
            }  
        }  
          
        return -1;  
    }  
      
    /** 
     * 将stringify做二次封装 
     * @param object 要处理的对象 
     * 
     */  
    NS.stringify = function(object, isEncodeZh){  
        var res = stringify(object);  
        if(isEncodeZh){  
            var encodeRes = "";  
            for(var i = 0; i < res.length; i++){  
                if(res.charCodeAt(i) < 0xff){  
                    encodeRes += res[i];  
                }else{  
                    encodeRes += "\\u" + res.charCodeAt(i).toString(16);  
                }  
            }  
            res = encodeRes;  
        }  
          
        return res;  
    };  
})(window); 
```
---
面试题
---
``` js
var obj = {
    name: 'baidu',
    arr: ['a', 'b', 'c']
}
var obj2 = obj;
var arr = obj.arr;

obj2.arr = ['a', 'b', 'c', 'd'];
obj2.name = 'lili';

console.log(arr); // ["a", "b", "c"]
console.log(obj.name); // 'lili'
console.log(obj === obj2); // true
console.log(obj.arr === obj2.arr); // true
console.log(obj.arr === arr); // false

```
---
闭包
---
``` js
var MAP = {
    onclick: function() {

    },
    curry: function(val) {
        return function(z) {
            return val++ + z;
        }
    }
};

var getInfo = function(val) {
    return MAP[val];
}
var fn = getInfo('curry');

var a = fn(100);

console.log(a(200)); // 300
console.log(a(300)); // 401
console.log(fn(100)(200)); // 300
console.log(getInfo('curry')(100)(300)); // 400
```
---
原型链
---
``` js
var name = 'oop';
var Person = function(options) {
    this.name = options.name;
};
Person.prototype.name = 'Person';
Person.prototype.getName = function() {
    return this.name;
};

var p = new Person({name: 'lili'});

console.log(p.constructor === Person);// true
console.log(p instanceof Person);// true
console.log(p.__proto__ === Person.prototype);// true

console.log(p.hasOwnProperty('name')); // true
console.log(p.hasOwnProperty('getName')); // false

var getName = p.getName;

console.log(getName === Person.prototype.getName); // true
console.log(getName()); // 'opp'

console.log(Person.prototype.getName()); // 'Person'
console.log(p.getName); // 'lili'
```