<template>
  <div class=''>
    <el-card>
    <el-form :model="ruleForm" :rules="rules" ref="addForm"  label-width="100px" class="demo-ruleForm">
    
    <el-form-item label="上级" prop="pid">
    <el-select v-model="ruleForm.pid" placeholder="请选择">
      <!-- <el-option label="请选择"></el-option> -->
      <el-option v-for="i in list"  :key="i.id" :label="i.catename"  :value="i.id"></el-option>
    </el-select>
  </el-form-item>
      <el-form-item label="分类名称" prop="catename">
    <el-input v-model="ruleForm.catename"></el-input>
  </el-form-item>
   <el-form-item label="分类图片" >
  <el-upload
  action="#"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :auto-upload="false"
  :on-change="fileChange"
  :limit="1"
  :on-exceed="limitTips"
  :file-list="imgList">
  <i class="el-icon-plus"></i>
</el-upload>
 <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
 </el-form-item>
        <el-form-item label="状态" prop="status">
         <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
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
import {getCateList,getCateById} from "../../request/category"
export default {
  name: '',
  data(){
    
    return {
         list:[],
          ruleForm: {
         pid:'',
         id:this.$route.params.id,
         catename:'',
         status:1,
         img:''
        },
        imgList:[],
        rules:{
             pid: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
           catename: [
            { required: true, message: '请输入', trigger: 'change' }
          ],
           status: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
        },
         dialogImageUrl: "",
      dialogVisible: false
    }
  },
  components: {},
  created(){
    this.getCateList()
    this.getCateById()
  },
  mounted(){},
  methods: {
     submitForm() {
        this.$refs.addForm.validate(async valid => {
          if(valid){
              const fd=new FormData()
          for(let key in this.ruleForm){
            fd.append(key,this.ruleForm[key])
          }
          fd.append('id',this.$route.params.id)
          const res=await this.$axios.post('/api/cateedit',fd)
          if (res.code=200) {
            this.$success('修改成功')
            this.$router.push('/category')
          } else {
            this.$error('添加失败')
          }
          }else{
            console.log('表单校验失败')
          }
        
        });
      },
      resetForm() {
        this.$refs.addForm.resetFields();
      },
          handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      async getCateList(){
        const res=await getCateList()
        if(res){
              this.list=res
        }
      },
      fileChange(file){
          this.ruleForm.img=file.raw
      },
      limitTips(){
        this.$error('此处只能上传一张图片')
      },
      async getCateById(){
         const res=await getCateById(this.ruleForm.id)
         if(res){
             this.ruleForm=res
             this.imgList=[{url:this.imgUrl+res.img}]
         }
      }
  }
}
</script>
<style scoped>
.el-form{
  width: 600px;
  margin: auto;
}
</style>
