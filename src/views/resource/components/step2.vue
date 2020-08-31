<template>
  <div>
      <div>
        <el-button type="text" @click="open">添加剧集</el-button>
        <el-dialog
          title="添加剧集"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <el-form ref="form"  label-width="80px">
            <el-form-item>
              <el-col class="line" :span="2">标题</el-col> 
              <el-col :span="4">
                <el-input v-model="episode.title" size="small" style="width:100%"></el-input>
              </el-col> 
              <el-col class="line" :span="4">&nbsp;&nbsp;	第几集</el-col> 
              <el-col :span="4">
                <el-input v-model="episode.episodeNum" size="small" style="width:100%"></el-input>
              </el-col>
          </el-form-item>
          <el-form-item label="收费" prop="isFree">
            <el-switch v-model="episode.isFree"></el-switch>
          </el-form-item>
                <el-form-item>
                   <el-upload
                      :on-success="handleVodUploadSuccess"
                      :file-list="fileList"
                      action="http://www.mp.com/vodservice/vod"
                      :limit="1"
                      class="upload-demo">
                  <el-button size="small" type="primary">上传视频</el-button>
                  <el-tooltip placement="right-end">
                      <div slot="content">最大支持1G，<br>
                          支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                          GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                          MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                          SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                      <i class="el-icon-question"/>
                  </el-tooltip>
                  </el-upload>
                </el-form-item>

          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEpisode" :disabled="isDisabled">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <br/>
      <el-table ref="table" :data="tableData" style="width: 900px;">
          <el-table-column label="集数" prop="episodeNum">
          </el-table-column>
          <el-table-column label="剧集名称" prop="title">
          </el-table-column>
          
          <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteEpisode(scope.row.id,scope.row.videoSourceId)">删除</el-button>
        </template>
        </el-table-column>
        
      </el-table>
      <el-button type="primary" @click="onSubmit">确认并下一步</el-button>  </div>
</template>

<script>
import episodeApi from '@/api/episode/episode'

export default {
    props: {
      rid: {
        type: String,
      }
    },
    data() {
      return {
        activeNames: ['1'],
        tableData: [], //集列表
        episode:{
          episodeNum: 1,
          resourceId: '',
          videoSourceId:'',
          title: '',
          isFree: true,
          videoOriginalName: '',
          duration:0,
          size:0
        }, 
        dialogVisible: false,
        fileList: [],
        isDisabled: true //按钮是否禁用
      }
    },
    methods: {
      onSubmit(){
          this.$parent.next()
          this.step2 = false
          this.step1 = false 
          this.$emit('translation',this.step1,this.step2,true)  
      },
      //删除episode
      deleteEpisode(episodeId,videoSourceId){
        episodeApi.deleteEpisodeById(episodeId,videoSourceId)
        .then(
          () => {
            episodeApi.queryEpisodes(this.rid)
            .then(
                    response => {
                      //todo
                      this.tableData = response.data.list
                    }
                  )
          }
        )
      },
      //提交episode
      submitEpisode(){
        this.episode.resourceId = this.rid
          episodeApi.getVideoInfo(this.episode.videoSourceId)
          .then(
            response => {
              this.episode.duration = response.data.duration
              this.episode.size = response.data.size
              episodeApi.addEpisode(this.episode)
              .then(
                response => {
                  this.dialogVisible = false
                  this.fileList = []
                  //显示新增的内容
                  episodeApi.queryEpisodes(this.rid)
                  .then(
                    response => {
                      //todo
                      this.tableData = response.data.list
                    }
                  )
                }
              )
            }
            
          )
          

      },
      //确认关闭资源弹窗
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      toogleExpand(row) {
       let $table = this.$refs.table;
       $table.toggleRowExpansion(row)
      },
      //打开添加资源弹窗
      open(){
        this.dialogVisible = true
      },
      //文件上传成功钩子
      handleVodUploadSuccess(response,file,fileList){
          this.episode.videoSourceId = response.data.vodId
          this.episode.videoOriginalName = file.name
          this.isDisabled = false
      }
      
    }
}
</script>

<style>
.demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    
</style>