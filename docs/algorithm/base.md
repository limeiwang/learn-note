# 排序算法

### 冒泡排序
``` js
// 实现方式1
let arr = [7, 4, 3, 67, 34, 1, 8]
function buddle_sort(arr) {
  let len = arr.length - 1
  for (let j = 0; j < len; j++) {
    for (let i = 0; i < len - j; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
  }
}
buddle_sort(arr)

// 实现方式2
let arr1 = [7, 4, 3, 67, 34, 1, 8]
function buddle_sort(arr, fn) {
  let len = arr.length
  let count = 0
  while (len--) {
    for (let i = 0; i < len; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
        count++
      }
    }
    if (count == 0) {
      return
    }
  }
}
buddle_sort(arr1)

// 蚂蚁金服面试
function buddle_sort(arr, fn) {
  let len = arr.length
  while (len--) {
    for (let i = 0; i < len; i++) {
      if (fn(arr[i], arr[i + 1]) > 0) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
  }
}

let arr = [7, 4, 3, 67, 34, 1, 8]
buddle_sort(arr, (a, b) => a - b)
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

### todo

插入排序、二分查找、选择排序、希尔排序、归并排序、堆排序、计数排序、桶排序、基数排序
