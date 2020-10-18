<template>
  <div class="">
    <el-card>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="addForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级" prop="pid" v-if="ruleForm.type == 2">
    <el-select v-model="ruleForm.pid" placeholder="请选择目录">
      <el-option value="" label="请选择"></el-option>   
     <el-option
              v-for="i in menuList"
              :key="i.id"
              :label="i.title"
              :value="i.id"
            ></el-option>
    </el-select>
  </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" v-if="ruleForm.type == 1">
          <el-input v-model="ruleForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url" v-if="ruleForm.type == 2">
          <el-input v-model="ruleForm.url"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm"
            >立即修改</el-button
          >
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import  {getMenuList,getMenuById} from "../../request/menu"

export default {
  name: "",
  data() {
    return {        
      menuList:[],
      ruleForm: {
        id:this.$route.params.id,
        pid:"",
        title: "",
        type: 1,
        status: 1,
        icon: "",
        url: ""
      },
      rules: {
        title: [{ required: true, message: "标题必须写", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  components: {},
  created() {
    this.getMenuList()
    this.getMenuId()
  },
  mounted() {},
  methods: {
    submitForm() {
     this.$refs.addForm.validate(async valid=>{
        if (valid) {
            const res=await this.$axios.post("/api/menuedit",{...this.ruleForm,id:this.$route.params.id})
            if(res.code==200){
              this.$success("修改成功")
                 this.$router.push('/menu')
            }
        } else {
          console.log("表单校验失败");
        }
      });
    },
    resetForm() {
      this.$refs.addForm.resetFields();
    },
    async getMenuList(){
      const res=await getMenuList()
      if(res){
        this.menuList=this.list
      }
    },
    async getMenuId(){
      const res=await getMenuById(this.ruleForm.id)
      if(res){
        this.ruleForm=res
      }
    }
  }
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: 0 auto;
}
.btn{
    width: 200px;
}
.el-dropdown-menu{
    width: 200px;
}
</style>
