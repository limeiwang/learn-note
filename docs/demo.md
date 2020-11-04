# 前端面试题

---
引用拷贝
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