<template>
<div>
    <el-button class="but" @click="$router.push('/admin/add')" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
  <el-card>
  <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
 >
    <el-table-column
      prop="id"
      label="用户名ID"
      min-width="80">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      min-width="80">
    </el-table-column>
      <el-table-column
      prop="rolename"
      label="角色名称"
      min-width="80">
    </el-table-column>
     <el-table-column
      prop="status"
      label="状态"
     min-width="80">
     <template v-slot="$scope">
        <el-tag type="success" v-if="$scope.row.status==1">已启用</el-tag>
        <el-tag type="danger" v-else>已禁用</el-tag>
     </template>
    </el-table-column>
     <el-table-column
      label="操作"
      min-width="80">
      <template v-slot="$scope">
      <el-button type="success" circle size="mini" icon="el-icon-edit" @click="edit($scope.row.uid)"></el-button>
       <el-button type="danger" circle size="mini" icon="el-icon-delete" @click="del($scope.row.uid)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
  <el-pagination @current-change="pageChange" :page-size="size" background layout="prev, pager, next" :total="total"></el-pagination>
  </div>
</template>

<script>
import {getAdminList,getAdminCount} from "../../request/admin"
export default {
  name: "",
  data() {
    return {
    list:[],
    page:1,
    size:2,
    total:100
    }
  },
  components: {},
  created() {
      this.queryList()
      this.getCount()
  },
  mounted() {},
    methods: {
        del(uid){
         this.$myConfirm(async ()=>{
             const res=await this.$axios.post('/api/userdelete',{uid})
                  if(res.code==200){
                      this.$success("删除成功")
                      const index=this.list.findIndex(item=>item.uid==uid)
                      this.list.splice(index,1)
                 }else{
                     this.$error('删除失败')
                 }

         })
    },
    edit(uid){
      this.$router.push('/admin/'+uid)
    }
    ,
    // 获取管理员列表
    async queryList() {
      const list = await getAdminList({ page: this.page, size: this.size });
      if (list) {
        // 更新列表数据
        this.list = list;
      }
    },
    // 获取数据总条数
    async getCount(){
      const total=await getAdminCount()
      this.total=total[0].total
    },
    // 更新页码
    pageChange(page){
       this.page=page
       this.queryList()
    },

    },
  
};
</script>
<style scoped>
.el-button--primary{
    margin-bottom: 20px;
}
</style>
