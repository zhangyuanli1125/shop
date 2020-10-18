<template>
  <div class="contenter">
    <div class="box">
      <h4 class="title">小U商城后台管理系统</h4>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            autocomplete="off"
            v-model="ruleForm.username"
          >
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            autocomplete="off"
            v-model="ruleForm.password"
          >
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/userlogin", this.ruleForm).then(res => {
            if (res.code == 200) {
              this.$success("登录成功");
              sessionStorage.setItem("userInfo", JSON.stringify(res.list));
              this.$router.push("/");
            } else {
              this.$error("登录失败");
            }
          });
          // alert("登录成功!");
        } else {
          console.log("登录失败!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.contenter {
  background: url("../assets/img/loginbg.jpeg") no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 370px;
  padding: 0 30px;
  height: 300px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.6);
}
.el-form-item,
.el-button {
  width: 100%;
}
.title {
  font-size: 22px;
  margin-top: 40px;
  margin-bottom: 30px;
  color: #409eff;
}
</style>
