<template>
  <div class=''>
       <el-button icon="el-icon-circle-plus-outline" type="primary" @click="$router.push('/lunbo/add')">添加轮播</el-button>
      <el-card style="margin-top:20px">
          <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="轮播图名称"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="img"
        label="图片"
        min-width="120">
        <template v-slot="$scope">
            <el-image :src="imgUrl+$scope.row.img" style="width:80px"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
         min-width="120">
         <template v-slot="$scope">
             <el-tag type="success" v-if="$scope.row.status==1">已启用</el-tag>
             <el-tag type="danger" v-else>已禁用</el-tag>
         </template>
      </el-table-column>
      <el-table-column
        label="操作"
         min-width="180">
          <template v-slot="$scope">
              <el-button type="success" size="mini" circle icon="el-icon-edit" @click="$router.push('/lunbo/'+$scope.row.id)"></el-button>
              <el-button type="danger" size="mini" circle icon="el-icon-delete" @click="del($scope.row.id)"></el-button>
               </template>
      </el-table-column>
    </el-table>
      </el-card>
  </div>
</template>

<script>
import {getLunboList} from '../../request/lunbo'
export default {
  name: '',
  data(){
    return {
        list:[]
    }
  },
  components: {},
  created(){},
  mounted(){
      this.getLunboList()
  },
  methods: {
      async getLunboList(){
          const res=await getLunboList()
          if(res){
              this.list=res
          }
      },
      del(id){
          this.$myConfirm(async ()=>{
             const res=await this.$axios.post('/api/bannerdelete',{id})
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
