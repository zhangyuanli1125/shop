<template>
  <div class=''>
      <el-button icon="el-icon-circle-plus-outline"  type="primary" @click="$router.push('/category/add')">添加</el-button>
      
      <el-card
      style="margin-top: 20px;">
      <el-table
    :data="list"
    style="width: 100%;"
    row-key="id"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="id"
      label="ID"
      min-width="80">
    </el-table-column>
    <el-table-column
      prop="catename"
      label="分类名称"
      min-width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      min-width="180">
      <template v-slot="$scope">
        <el-tag v-if="$scope.row.type=1"  type="success"  >已启用</el-tag>
        <el-tag v-else type="danger" size="mini">已禁用</el-tag>
      </template>

    </el-table-column>
    <el-table-column
      prop="img"
      label="分类图片"
      min-width="180"
      >
      <template v-slot="$scope">
<el-image v-if="$scope.row.img!=''" :src="imgUrl+$scope.row.img" :style="{width:'100px'}"></el-image>
      </template>
    
    </el-table-column>
     <el-table-column
      label="操作"
      min-width="180">
      <template v-slot="$scope">
        <el-button @click="edit($scope.row.id)" circle type="success" icon="el-icon-edit" size="mini"></el-button>
        <el-button @click="del($scope.row.id)" circle type="danger" icon="el-icon-delete" size="mini"></el-button>
      </template>

    </el-table-column>
  </el-table>
  </el-card>
  </div>
</template>

<script>
import {getCateList} from '../../request/category'
export default {
  name: '',
  data(){
    return {
        list:[]
    }
  },
  components: {},
  created(){
      this.getCateList()
  },
  mounted(){},
  methods: {
     async getCateList(){
          const res=await getCateList()
          if(res){
            this.list=res
            console.log(res);
          }
      },
      edit(id){
          this.$router.push("/category/"+id)

      },
      del(id){
        this.$myConfirm(async ()=>{
             const res=await this.$axios.post('/api/catedelete',{id})
             if(res.code==200){
                 this.$success('删除成功')
                 const index=this.list.findIndex(item=>item.id==id)
                 this.list.splice(index,1)
             }else{
               this.$error('删除失败')
             }
        })
      }
  }
}
</script>
<style scoped>
</style>
