# 数据结构与算法

### 冒泡排序

**个人理解：**
比较2个元素，如果顺序错误就把他们交换过来，这个名字的由来就是较小的元素慢慢"浮动"到数列的顶端。

**算法步骤：**
- 比较相邻的两个元素，如果第一个比第二个大，就交换它俩的位置。
- 对每一对相邻元素同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一堆数字需要比较。

**案例：给随机数组进行排序[3,2,1,5,4]**

``` js
let arr = [3,2,1,5,4]
function bubbleSort1(src) {
  let arr = [...src]
  let len = arr.length
  let current
  for(let i=0;i<len;i++) {
    //为什么len-1-i?
    //因为每次变量完最大的值肯定在最右边,数组的后面的那段其实已经是排序好的，无需在排序。
    for(let j=0;j<len-1-i;j++) {
      if(arr[j] > arr[j+1]) {
        current = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = current
      }
    }
  }
  return arr
}

/*
反向遍历实现
- 冒泡排序第一次遍历后将最大的值放到最右边，这个值是全局的最大值
- 标准的冒泡排序的每次遍历都会比较全部元素，虽然右侧的值已经是最大值了
- 改进之后，每次遍历后的最大值，次大值，等等都会固定在右侧，避免重复比较。
*/
function bubbleSort2(src) {
  let arr = [...src]
  for(let i=arr.length-1;i>0;i--) {
    for(let j=0;j<i;j++) {
      if(arr[j]>arr[j+1]) {
        [arr[j],arr[j+1]] = [arr[j+1], arr[j]]
      }
    }
  }
  return arr
}

console.log(bubbleSort1(arr))
console.log(bubbleSort2(arr))
//两个方法都会循环10次

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


## 插入排序
插入排序、二分查找
