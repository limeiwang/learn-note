# 基本概念

### 冒泡排序
``` js
let arr = [3, 4, 1, 2]
let max = arr.length - 1
for (let i = 0; i < max; i++) {
    // 声明一个变量，作为标志位
    // 如果某次循环完后，没有任何两数进行交换，就将标志位设置为 true，表示排序完成
    let flag = true
    for (let j = 0; j < max - i; j++) {
        if (arr[j] > arr[j + 1]) {
            // 利用ES6数组的解构赋值交换数据
            ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            flag = false
        }
    }
    if (flag) {
        break
    }
}
```

### 快速排序

``` js
var arr = [34, 54, 25, 51, 88, 12, 21, 57];
var quickSort = function(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] < pivot) {
            left.push(arr[i]);
        }else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}
quickSort(arr);
```
