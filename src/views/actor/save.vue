<template>
  <div class="app-container">
    添加演员
    <el-form ref="form" :model="actor" label-width="80px">
      <el-form-item label="演员姓名">
        <el-input v-model="actor.name"></el-input>
      </el-form-item>
      <el-form-item label="演员分类">
        <el-input v-model="actor.career"></el-input>
      </el-form-item>
      
      <el-radio-group v-model="actor.level">
        <el-radio :label="1">一线演员</el-radio>
        <el-radio :label="2">其他</el-radio>
      </el-radio-group>
      <el-form-item label="演员排序">
        <el-input-number v-model="actor.sort" :min="0" :max="10" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label=演员简介>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="actor.intro">
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="演员头像">
        <el-avatar :src="actor.avatar" size="large"></el-avatar>
        <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-form-item> -->
      <el-form-item label="演员头像">
        <!-- 头衔略缩图 -->
        <pan-thumb :image="actor.avatar"/>
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>
        <image-cropper v-show="imagecropperShow" 
                      :width="300" 
                      :height="300" 
                      :key="imagecropperKey" 
                      :url="BASE_API+'/oss/upload'" 
                      field="file" 
                      @close="close" 
                      @crop-upload-success="cropSuccess"
        ></image-cropper>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import actorApi from '@/api/actor/index'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components:{
    ImageCropper,
    PanThumb
  },
  created(){
    this.showUpdate()
  },
  data(){
    return {
      actor: {
        name: '',
        sort: 0,
        career: '',
        intro: '',
        level: 1,
        avatar: '',
        sort: 0
      },
      imagecropperShow: false,
      BASE_API: process.env.BASE_API,
      imagecropperKey: 0
    }
  },
  methods: {
    //判断是修改还是新增
    showUpdate(){
      if(this.$route.query.id){
        console.log(this.$route.query.id);
        this.getUpdateactorInfo(this.$route.query.id);
      }else{
        
      }
    },
    //获取要修改的演员信息
    getUpdateactorInfo(id){
      actorApi.getInfoById(id)
      .then(
        response => {
          this.actor = response.data.item;
        }
      )
    },
    //关闭弹窗方法
    close(){
      this.imagecropperShow = false
      //弹窗初始化 
      this.imagecropperKey ++
    },
    // 上传成功方法
    cropSuccess(data){
      this.actor.avatar = data.url
    },
    onSubmit(){
      //判断是新增还是修改
      if(this.$route.query.id){
        actorApi.updateactor(this.actor)
        .then(
            () => {
              this.$message({
              message: '成功',
              type: 'success'
            })
            this.$router.push('/actor/table')
          }
        )
      }else{
        actorApi.addactor(this.actor)
        .then(
          () => {
            this.$message({
            message: '成功',
            type: 'success'
          })
            this.$router.push('/actor/table')
          }
        )
      }
    }
  }
}
</script>

<style>

</style>