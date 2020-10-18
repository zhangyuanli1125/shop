<template>
  <div class=''>
      <el-card>
          <el-form :model="ruleForm" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
               <el-form-item label="活动名称" prop="title">
    <el-input v-model="ruleForm.title"></el-input>
  </el-form-item>
    <el-form-item label="活动时间" >
   <div class="block">
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
   </el-form-item>
  <el-form-item label="一級分类" prop="first_cateid">
    <el-select v-model="ruleForm.first_cateid" placeholder="请选择" @change="firstCateChange">
      <el-option label="请选择" value></el-option>
       <el-option
                v-for="item in cateList"
                :key="item.id"
                :value="item.id"
                :label="item.catename"
              ></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="二級分类" prop="second_cateid">
    <el-select v-model="ruleForm.second_cateid" placeholder="请选择">
      <el-option label="请选择" value></el-option>
       <el-option
                v-for="item in secondCateList"
                :key="item.id"
                :value="item.id"
                :label="item.catename"
              ></el-option>
    </el-select>
  </el-form-item>
     <el-form-item label="选择商品" prop="goodsid">
    <el-select v-model="ruleForm.goodsid" placeholder="请选择">
      <el-option label="请选择" value></el-option>
       <el-option
                v-for="item in secondCateList"
                :key="item.id"
                :value="item.id"
                :label="item.catename"
              ></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="状态" prop="status">
    <el-radio-group v-model="ruleForm.status">
      <el-radio :label="1">已启用</el-radio>
      <el-radio :label="2">已禁用</el-radio>
    </el-radio-group>
  </el-form-item>
      <el-form-item>
    <el-button type="primary" @click="submitForm">立即添加</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
      </el-card>
  </div>
</template>

<script>
import vueWangeditor from "vue-wangeditor"

export default {
  name: '',
  data(){
   const validDesc=(rule,value,callback)=>{
       const html=this.$refs.editor.getHtml();
       if(html.trim()=='<p><br></p>'){
          return callback(new Error('请输入商品介绍'))
       }
       callback();
    }
    return {
        specsAttr:[],
        specsList:[],
        cateList:[],
        secondCateList:[],
         activeName: "first",
      //  图片上传组件
      dialogImageUrl: "",
      dialogVisible: false,
      activeName:'first',
         ruleForm: {
           title:'',
            first_cateid: "", //一级分类id
        second_cateid: "", // 二级分类id
        status: "", // 状态
        goodsid:''
        },
        rules:{
              first_cateid: [{ required: true, message: '请选择一级分类', trigger: 'blur' } ],
              second_cateid: [{ required: true, message: '请选择二级分类', trigger: 'blur' } ],
              goodsid: [{ required: true, message: '请输入商品名称', trigger: 'blur' } ],
              title: [{ required: true, message: '请输入商品价格', trigger: 'blur' } ],
        }
    }
  },
  components: {
      vueWangeditor
  },
  async created(){
      const res=await $axios.all([getCateList(),getSpecsList()])
      if(res){
        [this.cateList,this.specsList]=res
      }
  },
  mounted(){},
  methods: {
        submitForm() {
        this.$refs.addForm.validate(async valid => {
          if (valid) { 
            const fd=new FormData()
            for(let key in this.ruleForm){
              fd.append(key,this.ruleForm[key])
            }
            fd.append('description',this.$refs.editor.getHtml())
            const res=await this.$axios.post('/api/goodsadd',fd)
            if(res.code==200){
              this.$success('添加成功')
              this.$router.push('/goods')
            }else{
              this.$error('添加失败')
            }
          }else{
            this.$error('请完善所有表单的信息')
          } 
        });
      },
      resetForm() {
        this.$refs[addForm].resetFields();
      },
       //tab标签页
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //图片上传组件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    firstCateChange(id){
      const index=this.cateList.findIndex(item=>item.id==id)
      this.secondCateList=this.cateList[index].children
    } ,
     fileChange(file){
          this.ruleForm.img=file.row
    },
     changeSpecs(id){
      const index=this.specsList.findIndex(item=>item.id==id)
      this.specsAttr=this.specsList[index].attrs
      this.ruleForm.specsattr=[]
    },
    pickerOptions(){

    }

    },
    
 
  }

</script>
<style scoped>
.el-form{
    width: 400px;
    margin: auto;

}
.el-input{
  width: 400px;
}
</style>
