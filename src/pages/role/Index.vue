<template>
<div>
    <el-button class="but" @click="$router.push('/role/add')" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
  <el-card>
  <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
 >
    <el-table-column
      prop="id"
      label="ID"
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
      <el-button type="success" circle size="mini" icon="el-icon-edit" @click="edit($scope.row.id)"></el-button>
       <el-button type="danger" circle size="mini" icon="el-icon-delete"  @click="del($scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
  </div>
</template>

<script>
import {getRoleList} from "../../request/role"
export default {
  name: "",
  data() {
    return {
    list:[]
    }
  },
  components: {},
  created() {
      this.getList()
  },
  mounted() {},
    methods: {
        del(id){
         this.$myConfirm(async ()=>{
             const res=await this.$axios.post('/api/roledelete',{id})
                  if(res.code==200){
                      this.$success("删除成功")
                      const index=this.list.findIndex(item=>item.id==id)
                      this.list.splice(index,1)
                 }else{
                     this.$error('删除失败')
                 }
         })
    },
    edit(id){
      this.$router.push('/role/'+id)
    }
    ,
   async getList(){
     const res=await getRoleList()
     if(res){
       this.list=res
     }
   }
    },
  
};
</script>
<style scoped>
.el-button--primary{
    margin-bottom: 20px;
}
</style>
