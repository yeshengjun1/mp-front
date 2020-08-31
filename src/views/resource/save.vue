<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新剧</h2>
    <el-steps :active="active" finish-status="success" align-center>
        <el-step title="编辑资源基本信息"></el-step>
        <el-step title="编辑资源大纲"></el-step>
        <el-step title="资源最终发布"></el-step>
    </el-steps>
    <!--step1-->
    <step1 v-if="step1Show" @translation="translation(arguments)" @resourceId="getResourceId"></step1>
    <step2 v-if="step2Show" @translation="translation(arguments)" :rid="resourceId"></step2>
    <step3 v-if="step3Show" :rid="resourceId"></step3>    
  </div>
</template>

<script>

import step1 from './components/step1'
import step2 from './components/step2'
import step3 from './components/step3'
export default {
    data() {
      return {
        resourceId: '',
        active: 1,
        step1Show: true,
        step2Show: false,
        step3Show: false
      }
    },
    components:{
       step1,
       step2,
       step3
       //todo 点击step1的下一步，step2获取resourceId操作
    },
    
    methods: {
      //父组件获取resourceId
      getResourceId(data){
        this.resourceId = data
      },
      translation(params){
        this.step1Show = params[0]
        this.step2Show = params[1]
        this.step3Show = params[2]
      },
      next() {
        if (this.active++ > 2) this.active = 1;
      },
      
      //封面上传成功钩子
      handleAvatarSuccess(data) {
        this.resource.cover = data.data.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 300px;
    height: 178px;
    display: block;
  }
</style>