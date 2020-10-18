<template>
  <div class=''>
      <el-card>
           <el-form
        :model="ruleForm"
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="轮播图名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
       <el-form-item label="商品图片">
  <el-upload
  action="#"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :auto-upload="false"
  :on-change="fileChange"
  :limit="1"
  :on-exceed="limitTips">
  
  <i class="el-icon-plus"></i>
</el-upload>
</el-form-item>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
      </el-card>
  </div>
</template>

<script>
import {getBannerById,getLunboList} from "../../request/lunbo"
export default {
  name: '',
  data(){
    return {
      list:[],
      dialogImageUrl: "",
      dialogVisible: false,
        ruleForm: {
        title:'',
        status:1,
        id:this.$route.params.id,

      },
      rules: {
        title: [{ required: true, message: "请选择", trigger: "blur" }],
        img: [{ required: true, message: "请选择", trigger: "blur" }],
       status: [{ required: true, message: "请选择", trigger: "blur" }]
      }
    }
  },
  components: {},
  created(){
    this.getBannerById()
  },
  mounted(){},
  methods: {
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
    submitForm(){
        this.$refs.addForm.validate(async valid=>{
            if(valid){
                const fd=new FormData()
                for(let key in this.ruleForm){
                    fd.append(key,this.ruleForm[key])
                }
                fd.append('id',this.$route.params.id)
                const res=await this.$axios.post('/api/banneredit',fd)
                if(res.code==200){
                    this.$success('添加成功')
                    this.$router.push('/lunbo')
                }else{
                    this.$error('添加失败')
                }
            }else{
                this.$error('失败')
            }
        })
    },
    resetForm(){
        this.$refs.addForm.resetFields()
    },
    limitTips(){
        this.$error('此处只能放一张图片')
    },
    fileChange(file){
     this.ruleForm.img=file.row
    },
    async getBannerById(){
      const res=await getBannerById(this.ruleForm.id)
      if(res){
        this.ruleForm=res
      }
    },
    
  }
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
