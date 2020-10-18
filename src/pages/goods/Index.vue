<template>
  <div>
    <el-button type="primary" icon="el-icon-circle-plus-outline"
      @click="$router.push('/goods/add')">添加</el-button
    >
    <el-card style="margin-top:20px">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="firstcatename" label="一级分类" min-width="120">
        </el-table-column>
        <el-table-column prop="secondcatename" label="二级分类" min-width="120">
        </el-table-column>
        <el-table-column prop="goodsname" label="商品名称" min-width="120">
        </el-table-column>
        <el-table-column prop="img" label="商品图片" min-width="120">
          <template v-slot="$scope">
            <el-image :src="imgUrl + $scope.row.img" class="bt"> </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="销售价格" min-width="120">
            <template v-slot="$scope">
                <span style="color:red">￥{{$scope.row.price}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="market_price" label="市场价格" min-width="120">
         <template v-slot="$scope">
                <span style="color:red">￥{{$scope.row.market_price}}</span>
            </template>
        </el-table-column>
        <!-- <el-table-column prop="description" label="商品描述" min-width="120">
        </el-table-column> -->
        <el-table-column prop="isnew" label="是否新品" min-width="120">
          <template v-slot="$scope">
               <el-tooltip :content="$scope.row.isnew==1?'是':'否'" placement="top">
            <el-switch
              v-model="$scope.row.isnew"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="updateGoodaInfo($scope.row,'isnew')"
            >
            </el-switch>
               </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="ishot" label="是否热卖" min-width="120">
          <template v-slot="$scope">
               <el-tooltip :content="$scope.row.ishot==1?'是':'否'" placement="top">
            <el-switch
              v-model="$scope.row.ishot"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="updateGoodaInfo($scope.row,'ishot')"
            >
            </el-switch>
               </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="120">
          <template v-slot="$scope">
            <el-tag v-if="$scope.row.status == 1" type="success">已启用</el-tag>
            <el-tag v-else type="danger">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120" fixed="right">
           <template v-slot="$scope">
          <el-button
            icon="el-icon-edit"
            type="success"
            circle
            @click="$router.push('/goods/'+$scope.row.id)"
            size="mini"
          ></el-button>
          <el-button
            icon="el-icon-delete"
            type="danger"
            circle
            @click="del($scope.row.id)"
            size="mini"
          ></el-button>
           </template>
        </el-table-column>
      </el-table>
       <el-pagination
      background
      :page-size="size"
      :page-sizes="[2,4,6,8,10]"
      layout="sizes,prev, pager, next"
      :total="total"
      @current-change="pageChange"
      @size-change="sizeChange"
    ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList ,updateGoodaInfo, getGoodsTotal} from "../../request/goods";
export default {
  name: "",
  data() {
    return {
      list: [],
      page: 1,
      size: 5,
      total:0,
    };
  },
   async created() {
    this.getGoodsList();
   this.total= await getGoodsTotal()
  },
  mounted() {},
  methods: {
    async getGoodsList() {
      const res = await getGoodsList({ page: this.page, size: this.size });
      if (res) {
        this.list = res;
      }
    },
    async updateGoodaInfo(info,attr){
       let postData={id:info.id}
       postData[attr]=info[attr]
       const res=await updateGoodaInfo(postData)
       if(res){
           this.$success('更新成功')
       }else{
           this.$error('更新失败')
       }
    },
    del(id){
         this.$myConfirm(async ()=>{
        // 1-请求数据接口,删除服务端的数据
        const res=await this.$axios.post('/api/goodsdelete',{id});
        // 2-更新视图
        if(res.code==200){
            const index=this.list.findIndex(item=>item.id==id);
            this.list.splice(index,1);
            this.$success('删除成功');
        }else{
          this.$error('删除失败');
        }
      });

    },
    pageChange(page){
       this.page = page;
       this.getGoodsList()
    },
    sizeChange(size){
        this.size=size
        this.getGoodsList()
    }
  }
};
</script>
<style scoped>
.bt {
  width: 100px;
  border: 1px solid rgb(238, 238, 238);
}
</style>
