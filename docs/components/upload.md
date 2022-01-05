# upload 组件

> 基于element-ui的文件上传

``` vue
<template>
  <el-dialog
        title="上传节点"
        :visible.sync="dialogVisible"
        custom-class="entry-dialog"
        @close="close"
    >
    <el-upload
      class="upload-file"
      ref="upload"
      action="#"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="httpRequest"
      :auto-upload="false"
      :show-file-list="false">
      <el-button slot="trigger" size="small" type="primary" v-if="!filename">选取文件</el-button>
      <el-button size="small" class="trigger-file" @click.stop  v-if="filename">
        <span>{{filename}}</span>
        <i class="el-input__icon el-icon-circle-close" @click.stop="resetFileName"></i>
      </el-button>
      <div slot="tip" class="el-upload__tip" v-if="!filename">只能上传yaml/yml文件，且不超过100MB</div>
    </el-upload>

    <div class="toast-content">
      <span
        v-if="isShowReason === true"
        class="error"
        @click="reasonDetail = !reasonDetail"
      >
        上传失败，点击查看失败原因
        <i class="el-collapse-item__arrow el-icon-arrow-right" :class="{'is-active': reasonDetail}" style="cursor: pointer;"></i>
      </span>
      <el-input
        v-if="reasonDetail"
        v-model="reason"
        disabled
        type="textarea"
        class="textarea"
      />
    </div>

        <template v-slot:footer class="dialog-footer">
      <el-button size="mini" type="primary" @click="submitUpload" :disabled="!filename">
                确定
            </el-button>
            <el-button size="mini" @click="close">
                取消
            </el-button>
        </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
      filename: '',
      fileList: [],
      fileData: null,
      isShowReason: null,
      reason: '',
      reasonDetail: false
    }
  },

  methods: {
    viewErrorDetail() {

    },
    // 上传到服务器
        submitUpload() {
      if (this.fileList.length === 0) {
        this.$message({
          message: '请先选取文件',
          type: 'warning'
        })
      } else {
        const isLt100M = this.fileList.every(file => file.size / 1024 / 1024 < 100);
        if (!isLt100M) {
          this.uploadFail('请检查，上传文件大小不能超过100MB!');
          return false;
        }else {
          this.fileData = new FormData();
          this.$refs.upload.submit();
          this.loading = true;
          this.$http.post(this.api.QUERY_PROCESS_IMPORT, this.fileData).then((resp) => {
            let {code, msg, data} = resp.data;
            if (+code === 0) {
              this.$message.success('上传成功');
              this.$emit('success');
              this.fileList = [];
              this.loading = false;
              this.isShowReason = false;
              this.close();
            } else {
              this.isShowReason = true;
              this.uploadFail(msg);
              this.loading = false;
            }
          }).catch(error => {
            this.isShowReason = true;
            this.reason = error;
            this.loading = false;
          });
        }
      }
    },
    // 自定义上传
    httpRequest(file) {
      this.fileData.append('file', file.file);
    },
    // 上传失败事件
    uploadFail(msg, wait) {
      this.$message({
        message: msg || '上传失败，请重新上传',
        type: 'error',
        duration: wait || 3000
      });
    },
    // 选择文件
    onChange(file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
      if (existFile) {
        this.uploadFail('当前文件已经存在!');
        fileList.pop();
      }
      this.fileList = fileList;
      this.filename = fileList[0].name;
    },
    resetFileName() {
      this.filename = '';
      this.fileList = [];
      this.isShowReason = null;
      this.reasonDetail = false;
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="less">
  .entry-dialog {
  min-width: 500px;
  max-width: 500px;
    .el-dialog__body {
    padding: 30px 80px;
    .upload-file {
      text-align: center;
      .trigger-file {
        padding: 0 2px !important;
      }
    }
        .toast-content {
      font-size: 12px;
      text-align: center;
      .error {
        display: block;
        margin: 10px 0;
        color: #F56C6C;
      }
    }
  }
}
</style>
```

``` vue
<entry-dialog 
  v-if="showEntryDialog" 
  @success="fetchData()"
  @close="closeEntryDialog"
>
<entry-dialog>
```
