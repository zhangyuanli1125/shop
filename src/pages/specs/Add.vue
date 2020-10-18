<template>
  <div class=''>
    <el-card>
    <el-form :model="ruleForm" :rules="rules" ref="addForm"  label-width="100px" class="demo-ruleForm">
    <el-form-item label="属性名" prop="specsname">
    <el-input v-model="ruleForm.specsname"></el-input>
    </el-form-item>
    <el-form-item label="属性值" prop="attrs">
        <div class="div" v-for="(item,index) in attrList" :key="index">
          <el-input class="inp" placeholder="请输入属性值" v-model="item.value"></el-input>
          <el-button type="success" v-if="index==0" @click="add">添加</el-button>
          <el-button type="danger" v-else @click="del(index)">移除</el-button>
        </div>
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
export default {
  name: '',
  data(){
    var  validateAttr= (rule, value, callback) => {
          this.attrList.forEach(item=>{
              if(item.value==''){
                  callback(new Error('请输入属性值!'));
              }
          })
          callback()
    };
    return {
         attrList:[{value:''}],
          ruleForm: {
            specs:"",
            status:1,
            attrs:""
        },
        rules:{
             attrs:{ validator:validateAttr,  trigger: 'change' }
          ,
           catename:{ required: true, message: '请输入', trigger: 'change' }
          ,
           status:{ required: true, message: '请选择', trigger: 'change' }
          ,
        },
         dialogImageUrl: "",
      dialogVisible: false
    }
  },
  components: {},
 
  mounted(){},
  methods: {
     submitForm() {
        this.$refs.addForm.validate(async valid => {
          if(valid){
            this.ruleForm.attrs=this.attrList.map(item=>item.value).join(',')
          const res=await this.$axios.post('/api/specsadd',this.ruleForm)
          if (res.code=200) {
            this.$success('添加成功')
            this.$router.push('/specs')
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
        this.attrList=[{value:''}]
      },
          handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      add(){
          if(this.attrList.length>=5){
              return false
          }
          this.attrList.push({value:''})
      },
      del(index){
          this.attrList.splice(index,1)
      }
   
    
  }
}
</script>
<style scoped>
.el-form{
  width: 600px;
  margin: auto;
}
.div{
     width: 600px;
     display: flex;
     margin: 8px 0;
}
.inp{
    width: 300px;
    margin: 0 10px 0 0;
}
</style>
