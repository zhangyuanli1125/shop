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
        <el-form-item label="角色名称" prop="roleid">
          <el-select v-model="ruleForm.roleid" placeholder="请选择">
           <el-option value="" label="请选择"></el-option> 
            <el-option
              v-for="i in roleList"
              :key="i.id"
              :label="i.rolename"
              :value="i.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
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
import  {getRoleList} from "../../request/role"
import  {getInfoById} from "../../request/admin"
export default {
  name: "",
  data() {
    return {
      roleList: [],
      ruleForm: {
        uid:this.$route.params.id,
        username:"",
        roleid:"",
        password:"",
        status:1
      },
      rules: {
        roleid: [{ required: true, message: "请选择", trigger: "blur" }],
        username: [{ required: true, message: "请输入", trigger: "blur" }],
       password: [{  message: "请输入", trigger: "blur" }],
       status: [{ required: true, message: "请选择", trigger: "blur" }]
      }
    };
  },
  components: {},

  mounted() {},
  methods: {
    submitForm() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const res = await this.$axios.post("/api/useredit", this.ruleForm);
          if (res.code == 200) {
         this.$success("修改成功");
             this.$router.push('/admin')
          }
          this.$refs.addForm.resetFields();
        } else {
          console.log("表单校验失败");
        }
      });
    },
    resetForm() {
      this.$refs.addForm.resetFields();
    },
    async getRoleList(){
      const res=await getRoleList()
      if(res){
        this.roleList=res
      }
    },
    async getInfoById(){
      const res=await getInfoById(this.ruleForm.uid)
      if(res){
        res.password=''
        this.ruleForm=res
      }
   }
  },
  created() {
   this.getRoleList()
   this.getInfoById()
    // getMenuId(this.ruleForm.id).then(res=>{
    //      this.ruleForm=res
    // })
  }
};
</script>
<style scoped>
.el-form {
  width: 600px;
  margin: 0 auto;
}
.btn {
  width: 200px;
}
.el-dropdown-menu {
  width: 200px;
}
</style>
