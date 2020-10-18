<template>
  <div class=''>
      <el-card>
           <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="uid"
        label="用户ID"
        min-width="320">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="会员姓名"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
         min-width="120">
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="注册日期"
         min-width="120">
         <template v-slot="$scope">
           {{$scope.row.addtime|time}}
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
              <el-button type="success" size="mini" circle icon="el-icon-edit" @click="$router.push('/vip/'+$scope.row.id)"></el-button>
               </template>
      </el-table-column>
    </el-table>
      </el-card>
  </div>
</template>

<script>
import {getVipList} from "../../request/vip"
export default {
  name: '',
  data(){
    return {
        list:[]
    }
  },
  components: {},
  created(){
      this.getVipList()
      
  },
filters:{
  time(val){
      const zctime=new Date(parseInt(val)).toLocaleDateString()
      return zctime
  }
},
  methods: {
     async getVipList(){
         const res=await getVipList()
         if(res){
             this.list=res
         }
     }
  }
}
</script>
<style scoped>
</style>
