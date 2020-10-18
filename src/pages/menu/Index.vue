<template>
<div>
    <el-button class="but" @click="$router.push('/menu/add')" type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
  <el-card>
  <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
     :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
 >
    <el-table-column
      prop="id"
      label="ID"
      min-width="80">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      min-width="80">
    </el-table-column>
     <el-table-column
      prop="type"
      label="类型"
      min-width="80">
     <template v-slot="$scope">
        <el-tag type="success" v-if="$scope.row.type==1">目录</el-tag>
        <el-tag type="primary" v-else>菜单</el-tag>
     </template>
    </el-table-column>
    <el-table-column
      prop="icon"
      label="图标"
       min-width="80"
      >
      <template v-slot="$scope">
          <i :class="$scope.row.icon"></i>
      </template>
    </el-table-column>
     <el-table-column
      prop="url"
      label="地址"
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
       <el-button type="danger" circle size="mini" icon="el-icon-delete" @click="del($scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
  </div>
</template>

<script>
// import {getMenuList} from "../../request/menu"
export default {
  name: "",
  data() {
    return {
    list:[],
    // ruleForm:{
    //   id:"",
    //   title:"",
    //   type:1,
    //   icon:"",
    //   url:"",
    //   status:1
    // }
    }
  },
  created() {
      this.getMenuList()
  },
  mounted() {},
    methods: {
     async getMenuList(){
         const res=await this.$axios.get("/api/menulist?istree=1")
         if(res.code==200){
           this.list=res.list
         }
      },
        del(id){
         this.$myConfirm(async ()=>{
             const res=await this.$axios.post('/api/menudelete',{id})
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
      this.$router.push('/menu/'+id)
    }
    },
  
};
</script>
<style scoped>
.el-button--primary{
    margin-bottom: 20px;
}
</style>
