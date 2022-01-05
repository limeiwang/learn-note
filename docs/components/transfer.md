# transfer 穿梭框

> 基于ant-design-vue

``` vue
<!-- 自定义公共组件: transfer
    @leftData 左侧数据
    @rightData 右侧数据
    @titles 数组数据,可以不设置，左右穿梭框的标题
    @sortType 上下排序的类型，可选值为： left、right、both三选一，可以不选，默认右侧可进行上下排序
 -->
<template>
  <div class="transfer">
    <div class="transfer-panel">
      <div class="transfer-panel-header">
        <div class="title" v-if="titles && titles.length">{{titles[0]}}</div>
      </div>
      <div class="transfer-panel-body">
        <div class="transfer-panel-content">
          <a-radio-group v-model="left">
            <a-radio v-for="(item, index) in leftData" :value="index" :key="item.id">{{item.name}}</a-radio>
          </a-radio-group>
        </div>
      </div>
    </div>
    <div class="transfer-operation">
      <a-button size="small" v-if="left || left === 0" @click="transferData('left')">左</a-button>
      <a-button size="small" disabled v-else>左</a-button>
      <a-button size="small" v-if="right || right === 0" @click="transferData('right')">右</a-button>
      <a-button size="small" disabled v-else>右</a-button>
    </div>
    <div class="transfer-panel">
      <div class="transfer-panel-header">
        <div class="title" v-if="titles && titles.length">{{titles[1]}}</div>
      </div>
      <div class="transfer-panel-body">
        <div class="transfer-panel-content">
          <a-radio-group v-model="right">
            <a-radio v-for="(item, index) in rightData" :value="index" :key="item.id">{{item.name}}</a-radio>
          </a-radio-group>
        </div>
      </div>
    </div>
    <div class="transfer-operation">
      <a-button size="small" v-if="upActive" @click="handleSort('up')">上移</a-button>
      <a-button size="small" disabled v-else>上移</a-button>
      <a-button size="small" v-if="downActive" @click="handleSort('down')">下移</a-button>
      <a-button size="small" disabled v-else>下移</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transfer',

  props: {
    leftData: {
      type: Array,
      default: () => []
    },
    rightData: {
      type: Array,
      default: () => []
    },
    titles: {
      type: Array,
      default: () => ['左边数据', '右边数据']
    },
    sortType: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      left: '',
      right: ''
    }
  },

  computed: {
    upActive() {
      return !this.sortType || this.sortType == 'right' ? this.right : (this.sortType == 'left' ? this.left : this.left || this.right);
    },
    downActive() {
      let con = false;
      if (!this.sortType || this.sortType == 'right') {
        con = (this.right || this.right === 0) && (this.right !== this.rightData.length - 1)
      } else if (this.sortType == 'left') {
        con = (this.left || this.left === 0) && (this.left !== this.leftData.length - 1)
      } else {
        con = (this.right || this.right === 0) && (this.right !== this.rightData.length - 1) || (this.left || this.left === 0) && (this.left !== this.leftData.length - 1)
      }
      return con;
    }
  },

  methods: {
    // 穿梭的回调
    transferData(type) {
      this.$emit('transfer', type, this[type], this.callback)
    },
    // 选中的索引置空
    callback(type) {
      this.cancel(type)
    },
    cancel(type) {
      if (type == 'both') {
        this.left = '';
        this.right = '';
      } else {
        this[type] = '';
      }
    },
    // 排序的回调
    handleSort(type) {
      let data = [this.left, this.right];
      this.$emit('handleSort', type, this.sortType, data, this.handleNewSort);
    },
    handleNewSort(sortType, array) {
      if (!sortType || sortType == 'right') {
        this.right = array[1]
      } else if (sortType == 'left') {
        this.left = array[0];
      } else if (sortType == 'both') {
        this.left = array[0];
        this.right = array[1];
      }
    }
  }
}
</script>

<style lang="less">
  .transfer {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: "tnum";
    position: relative;
    .transfer-panel {
      position: relative;
      display: inline-block;
      width: 180px;
      height: 200px;
      padding-top: 40px;
      vertical-align: middle;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      &-header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 8px 12px 9px;
        overflow: hidden;
        color: rgba(0,0,0,.65);
        background: #fff;
        border-bottom: 1px solid #e8e8e8;
        border-radius: 4px 4px 0 0;
      }

      &-body {
        position: relative;
        height: 100%;
        font-size: 14px;
      }

      &-content {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: auto;
        list-style: none;
      }

      &-item {
        min-height: 32px;
        padding: 6px 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all .3s;				
      }

      .ant-radio-wrapper {
        height: 32px;
        min-height: 32px;
        padding: 6px 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        transition: all .3s;
      }
    }
    
    .transfer-operation {
      display: inline-block;
      margin: 0 8px;
      overflow: hidden;
      vertical-align: middle;
      .ant-btn {
        display: block;
      }

      .ant-btn:first-child {
        margin-bottom: 4px;
      }
    }
  }
</style>
```

``` vue
<template>
    <div class="detail-modal">
        <transfer
            sort-type="right"
            :titles="['首页模块', '编辑首页']"
            :left-data="leftData" 
            :right-data="rightData"
            @transfer="handleTransfer" 
            @handleSort="handleSort"
        />
    </div>
</template>
<script>
import transfer from './transfer';
export default {
    name: "detailModal",

    components: {
        transfer
    },
    
    data() {
        const leftData = [];
        for (let i = 0; i < 20; i++) {
            leftData.push({
                    id: i.toString(),
                    name: `content${i + 1}`,
                    description: `description of content${i + 1}`,
                    disabled: i % 3 < 1,
            });
        }

        const rightData = leftData.filter(item => +item.id % 3 > 1);
        return {
                leftData: [
                    { name: '北京', id: 1 }, { name: '上海', id: 2 }, { name: '南京', id: 3 }, { name: '天津', id: 4 }, { name: '广东', id: 5 }
                ],
                rightData: [{ name: '杭州', id: 6 }, { name: '越南', id: 7 }, { name: '厦门', id: 8 }]
            };
    },
    methods: {
        handleTransfer(type, data, callback) {
            if (type == 'left') {
                this.rightData = this.rightData.concat(this.leftData[data]);
            } else {
                this.leftData = this.leftData.concat(this.rightData[data])
            }
            this[type + 'Data'].splice(data, 1);
            callback(type);
        },
        handleSort(type, sortType, data, callback) {
            if (!sortType || sortType == 'right') {
                if (type == 'up') {
                    this.rightData = this.swapItems(this.rightData, data[1], data[1] - 1)
                    callback(sortType, [data[0], data[1] - 1]);
                } else {
                    this.rightData = this.swapItems(this.rightData, data[1], data[1] + 1)
                    callback(sortType, [data[0], data[1] + 1])
                }
            } else if (sortType == 'left') {
                if (type == 'up') {
                    this.leftData = this.swapItems(this.leftData, data[0], data[0] - 1)
                    callback(sortType, [data[0] - 1, data[1]]);
                } else {
                    this.leftData = this.swapItems(this.leftData, data[0], data[0] + 1)
                    callback(sortType, [data[0] + 1, data[1]])
                }
            } else if (sortType == 'both') {
                if (type == 'up') {
                    data[0] == 0 ? '' : this.leftData = this.swapItems(this.leftData, data[0], data[0] - 1)
                    data[1] == 0 ? '' : this.rightData = this.swapItems(this.rightData, data[1], data[1] - 1)
                    callback(sortType, [data[0] == 0 ? data[0] : (data[0] - 1), data[1] == 0 ?  data[1] : (data[1] - 1)]);
                } else {
                    data[0] == (this.leftData.length - 1) ? '' : this.leftData = this.swapItems(this.leftData, data[0], data[0] + 1)
                    data[1] == (this.rightData.length - 1) ? '' : this.rightData = this.swapItems(this.rightData, data[1], data[1] + 1)
                    callback(sortType, [data[0] == (this.leftData.length - 1) ? data[0] : (data[0] + 1), data[1] == (this.rightData.length - 1) ? data[1] : (data[1] + 1)])
                }
            }
        },
        swapItems(arr, index1, index2) {
            arr[index1] = arr.splice(index2, 1, arr[index1])[0];
            return arr;
        }
    },
};
</script>
```
