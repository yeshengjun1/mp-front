<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="剧名">
          <el-input v-model="pageInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="发布状态">
          <el-select v-model="pageInfo.status" placeholder="全选">
            <el-option label="已发布" value= 'Normal'></el-option>
            <el-option label="未发布" value= 'Draft'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryResourceByPage">查询</el-button>
        </el-form-item>
      </el-form>  
      <!--========================显示数据=======================-->
      <el-table
        :data="resources"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="title"
          label="剧名"
          width="180">
        </el-table-column>
        <el-table-column
          label="主演"
          width="180"
          prop="actorName"
        >
          
        </el-table-column>
        <el-table-column
          prop="description"
          label="简介"
          >
        </el-table-column>
        
        <el-table-column
          prop="totalNum"
          label="总集数"
          width="100">
        </el-table-column>

        <!--操作-->
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" disabled="disabled">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            <!-- <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              >
              <span>确认删除</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDelete(scope.row)">确 定</el-button>
              </span>
            </el-dialog> -->
          </template>
        </el-table-column>  
      </el-table>
      <div id="pageBox">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.page"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import resourceApi from '@/api/resource/resource'
export default {
  data(){
    return {
      dialogVisible: false,
      pageInfo: {
        title: '',
        status: '',
        page: 1
      },
      total:0,
      resources: []
    }
  },
  created(){
    //初始化页面
    this.queryResourceList()
  },
  methods: {

    queryResourceByPage(){
      this.pageInfo.page = 1
      this.queryResourceList()
    },
    //换页
    handleCurrentChange(){    
      this.queryResourceList()
    },
    //删除数据
    handleDelete(id){
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resourceApi.deleteResource(id)
          .then(
            () => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.queryResourceByPage()
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //分页查询数据
    queryResourceList(){
      resourceApi.queryResources(this.pageInfo)
      .then(
        response => {
          this.resources = response.data.resources
          this.total = response.data.total
        }
      )
    }
  },

}
</script>

<style>
  #pageBox {
      margin-top: 20px;
      text-align: center;
    }
</style>