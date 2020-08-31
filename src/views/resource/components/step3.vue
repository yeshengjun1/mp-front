<template>
<div>
  <div class="ccInfo">
      <img :src="resourcePublish.cover" alt="">
      <div class="main">
        <h2>{{ resourcePublish.title }}</h2>
        <p class="gray"><span>共{{ resourcePublish.totalNum }}集</span></p>
        <p><span>所属分类：{{ resourcePublish.oneLevelClassification }} — {{ resourcePublish.twoLevelClassification }}</span></p>
        <p>主演：{{ resourcePublish.actorName }}</p>
        <h3 class="red">￥{{ resourcePublish.price }}</h3>
      </div>
    </div>
    <div>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布资源</el-button>
    </div>
  </div>
</template>

<script>
import resourceApi from '@/api/resource/resource'
export default {
    props: {
      rid: {
        // resourceId
        type: String,
      }
    },
    data(){
        return {
          resourcePublish: {
            cover: '',
            title: '',
            totalNum: '',
            oneLevelClassification: '',
            twoLevelClassification: '',
            actorName: '',
            price: 0
          }
        }
    },
    created() {
      this.getResourceInfo()
    },
    methods: {
      //发布资源
      publish(){
        resourceApi.publishResource(this.rid)
        .then(
          () => {
            //成功，跳转到资源列表
            this.$router.push('/mv/list')
          }
        )
      },
      //获取要发布的资源信息
      getResourceInfo(){
        resourceApi.queryResourceInfo(this.rid)
        .then(
          response => {
            this.resourcePublish.cover = response.data.resourceInfo.cover
            this.resourcePublish.title = response.data.resourceInfo.title
            this.resourcePublish.totalNum = response.data.resourceInfo.totalNum
            this.resourcePublish.oneLevelClassification = response.data.resourceInfo.oneLevelClassification
            this.resourcePublish.twoLevelClassification = response.data.resourceInfo.twoLevelClassification
            this.resourcePublish.actorName = response.data.resourceInfo.actorName
            this.resourcePublish.price = response.data.resourceInfo.price
          }
        )
      }
    }
}
</script>

<style>
  .ccInfo {
      background: #f5f5f5;
      padding: 20px;
      overflow: hidden;
      border: 1px dashed #DDD;
      margin-bottom: 40px;
      position: relative;
  }
  .ccInfo img {
      background: #d6d6d6;
      width: 500px;
      height: 278px;
      display: block;
      float: left;
      border: none;
  }
  .ccInfo .main {
      margin-left: 520px;
  }

  .ccInfo .main h2 {
      font-size: 28px;
      margin-bottom: 30px;
      line-height: 1;
      font-weight: normal;
  }
  .ccInfo .main p {
      margin-bottom: 10px;
      word-wrap: break-word;
      line-height: 24px;
      max-height: 48px;
      overflow: hidden;
  }

  .ccInfo .main p {
      margin-bottom: 10px;
      word-wrap: break-word;
      line-height: 24px;
      max-height: 48px;
      overflow: hidden;
  }
  .ccInfo .main h3 {
      left: 540px;
      bottom: 20px;
      line-height: 1;
      font-size: 28px;
      color: #d32f24;
      font-weight: normal;
      position: absolute;
  }   
</style>