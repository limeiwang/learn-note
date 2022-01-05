# dialog 弹窗组件

> 基于antdv组件

``` vue
<template lang="pug">
    .model-dialog
        a-modal(v-model="visible" :title="title" :class="isSpreadForm && 'dialog-form '" :destroy-on-close="true")
            message(v-if="message" :items="messageItems")
            template(slot="footer")
                a-button(key="back" @click="handleCancel") 取消
                a-button(key="submit" type="primary" :loading="loading" @click="handleOk") {{confirmText}}
            .insert-info
                slot(name="insertInfo")
</template>


<script>
import message from '../message/message';
import {EventTypes, EventBus} from '../../event/event-bus';
export default {
  name: 'modelDialog',

  components: {
    message
  },

    data() {
        return {
      loading: false,
      messageItems: []
        };
  },

    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '对话框'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        isSpreadForm: {
            type: Boolean,
            default: false
        },
        loadingFlag: {
            type: Boolean,
            default: true
        },
    message: {
      type: Boolean,
            default: false
    }
  },

  computed: {
    visible: {
      get () {
        return this.isShow;
      },
      set () {
                this.$emit('closemodel');
            }
    }
  },

  methods: {
      handleOk(e) {
          if(!this.loadingFlag) {
              this.$emit('handleok') 
              return
          }
          this.loading = true;
          setTimeout(() => {
              this.loading = false;
              this.$emit('handleok');
          }, 1500);
      },
      handleCancel(e) {
          // 关闭模态对话框
          this.$emit('closemodel');
      }
  },

  mounted() {
    EventBus.$on(EventTypes.SYNCLINK_MESSAGE, ({type, message, duration}) => {
      // A发送来的消息
      this.messageItems = [{
        type,
        message,
        duration
      }];
    });
  }
};
</script>


<style lang="less">
  .ant-modal  {
    &-body {
      position: relative;
      .message {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9999;
      }
    }
  }
</style>
```
