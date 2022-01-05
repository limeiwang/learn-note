# utils

``` javascript
const camelizeRE = /-(\w)/g;
/**
 * @private
 * 把烤肉串命名方式转换成驼峰命名方式
 */
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
};

/**
 * @private
 * 首字母大写
 */
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @private
 * 添加 on 前缀，并且首字母大写
 */
export const toHandlerKey = (str: string) =>
  str ? `on${capitalize(str)}` : ``;

```

## 指令

``` javascript
const backTop = Vue.directive('back-top', {
    inserted (el, binding){
        let e = binding.arg || 'click';
        el.addEventListener(e, function(){
            let scrollToptimer = setInterval(function(){
                let top = document.querySelector('.contentBox').scrollTop;
                let speed = top / 4;
                top -= speed;
                document.querySelector('.contentBox').scrollTop = top;
                if(top == 0){
                    clearInterval(scrollToptimer);
                }
            }, 30)
        })
    }
})
```
