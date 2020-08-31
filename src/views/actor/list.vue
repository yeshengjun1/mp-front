<template>
  <div class="app-container">
      演员列表
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="演员姓名">
          <el-input v-model="pageInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="演艺地位">
          <el-select v-model="pageInfo.level" placeholder="知名度">
            <el-option label="一线演员" value= 1></el-option>
            <el-option label="其他" value= 2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getActorList">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
      :data="actorList"
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        label="级别"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.level === 1? '一线演员': '其他'}}
        </template>
        <!-- {{level === 1? '高级演员':'首席演员'}} -->
      </el-table-column>
      <el-table-column
        prop="intro"
        label="简介"
        >
      </el-table-column>
      <el-table-column
        property="gmtCreate"
        label="添加时间"
        width="250">
      </el-table-column>
      <el-table-column
        property="sort"
        label="排序"
        width="60">
      </el-table-column>

      <!--操作-->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <router-link :to="'/actor/save?id='+scope.row.id">
            <el-button
            size="mini">编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="dialogVisible = true">删除</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>确认删除</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleDelete(scope.row.id)">确 定</el-button>
            </span>
          </el-dialog>
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
import actor from '@/api/actor/index'
export default {
    data(){
    return {
      actorList: [],
      dialogVisible: false, //确认对话框
      pageInfo: {
          name: '',
          level: '',
          page: 1,
        },
      total: 100
    }
  },
  created() {
    this.getActorList()
  },
  methods: {
    //换页
    handleCurrentChange(){
      this.getActorList()
    },
    //条件分页查询
    //获取演员列表
    getActorList(){
      actor.queryByPage(this.pageInfo)
      .then(
          response => {
            this.total = response.data.total
            this.actorList = response.data.list
          }
      )
    },
    //根据id删除演员
    handleDelete(id){
      actor.delectbyId(id).then(
        () => {
          this.getActorList()
          this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.dialogVisible = false
        }
      )
    },
  }
}
</script>

<style>
    #pageBox {
    margin-top: 20px;
    text-align: center;
  }
</style>