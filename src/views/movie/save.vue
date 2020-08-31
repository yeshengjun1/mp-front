<template>
  <div class="app-container">
    <el-button type="primary"><a href="./static/demo.xlsx">点击下载模版</a></el-button>
    
    <p></p>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="http://www.mp.com/mp_movie/classifications/upload" 
      :on-success="success"
      :auto-upload="false"
      multiple>
      <el-button slot="trigger" size="medium" type="primary" >选取文件</el-button>
      <el-button style="margin-left: 10px;" size="medium" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import subject from '@/api/classification/classification'
export default {
  data() {
      return {
        
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      success(response){
          if(response.success){
            this.$message({
            message: '导入成功',
            type: 'success'
          })
          this.$router.push({path: '/movie/list'})
          }
          
      }
    }
}
</script>

<style>

</style>