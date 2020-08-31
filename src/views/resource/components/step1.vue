<template>
  <div>
    <!--step1-->
    <el-form ref="form" :model="resource" label-width="80px">
        <el-form-item label="剧名">
            <el-col :span="5">
                <el-input v-model="resource.title"></el-input>
            </el-col>
        </el-form-item>
       
        <el-form-item label="主演">
            <el-select v-model="resource.actorId" placeholder="请选择主演">
                <el-option v-for="actor in actors" :label="actor.name" :value="actor.id" :key="actor.id"></el-option>
            </el-select>
        </el-form-item>

        
        <el-form-item label="所属分类">
            <el-col :span="5">
                <el-select v-model="resource.classifictionParentId" placeholder="一级分类">
                    <!-- <el-option v-for="classifiction in classifictions" :label="classifiction.title" :value="classifiction.id" :key="classifiction.id"></el-option> -->
                     <el-option v-for="(item,index) in oneList" :key="index" :label="item.title" :value="item.id" @click.native="showTwoList(item.id)"></el-option>
                </el-select>
            </el-col>
            
            <el-col :span="5">
                <el-select v-model="resource.classifictionId" placeholder="二级分类">
                    <el-option v-for="item in twoList" :label="item.title" :value="item.id" :key="item.id" ></el-option>
                </el-select>
            </el-col>
            <el-col class="line" :span="14"></el-col>
        </el-form-item>
        <el-form-item label="资源价格">
            <el-col :span="3">
                <el-input v-model="resource.price" placeholder="请输入价格/元"></el-input>
            </el-col>
            <!-- <el-col :span="21">
            </el-col> -->

        </el-form-item>
        
         <el-form-item label="资源简介">
                <el-input v-model="resource.description"></el-input>
        </el-form-item>
         <el-form-item label="资源数">
             <el-col :span="3">
                <el-input v-model="resource.totalNum"></el-input>
             </el-col>
        </el-form-item>
        <el-form-item label="默认封面(点击修改)">

            <el-upload
                class="avatar-uploader"
                :action="BASE_API+'/oss/upload'" 
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="resource.cover" :src="resource.cover" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认并下一步</el-button>
        </el-form-item>
    </el-form>
    <!-- <step2 :resourceId="resourceId" v-show="step2Show"></step2> -->
    
  
  </div>
</template>

<script>
import classifictionApi from '@/api/classification/classification'
import actor from '@/api/actor/index'
import resourceApi from '@/api/resource/resource'
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API,
      step1: true,
      step2: false,
      active: 1,
      resourceId: '',
      resource: {
        cover: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        totalNum: 0
      },
      actors:[],
      classifiction: [],

      title: [],
      oneList: [],
      twoList: []
    }
  },
  components:{
  //   step2
  },
  created(){
      this.getactors()
      this.getclassifictionList()
  },
  methods: {
    //封面上传成功调用
    //select选择器
    handleChange(){
    },   
          //获取资源分类
    getclassifictionList(){
        classifictionApi.getList()
        .then(
            response => {
                this.oneList = response.data.list
            }
        )
    },
      //获取主演
    getactors(){
        actor.getList()
        .then(
            response => {
              this.actors = response.data.list
            }
        )
    },
    //点击一级分类，显示二级分类
    showTwoList(id){
      for (let i = 0; i < this.oneList.length; i++) {
        const element = this.oneList[i];
        if(element.id == id){
          this.twoList = element.list
        }
      }
    },
    next() {
      if (this.active++ > 2) this.active = 1;
    },
    onSubmit() {
      resourceApi.addresource(this.resource)
      .then(
        (response) =>{
          this.$emit('resourceId',response.data.resourceId)
          this.$parent.next()
          this.step2 = true
          this.step1 = false          
          this.$emit('translation',this.step1,this.step2,false)    
        }
      )
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