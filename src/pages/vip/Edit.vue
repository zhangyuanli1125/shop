<template>
  <div class="">
    <el-card>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
      <el-form-item label="编号" prop="uid">
          <el-input
            v-model="ruleForm.uid"
            placeholder="请输入编号"
          ></el-input>
          </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="ruleForm.nickname"
            placeholder="请输入昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
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
import { getVipInfo,getVipList } from "../../request/vip";
export default {
  name: "",
  data() {
    return {
      ruleForm: {
         uid: this.$route.params.id,
        uid:'',
        nickname: "",
        phone: "",
        password: "",
        status: true,
        
      },
      rules: {
        uid: [{ required: true, message: "请输入名称", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const res = await $axios.post("/api/memberedit", this.ruleForm
          );
          if (res.code == 200) {
            this.$success("修改成功");
            this.$router.push("/vip");
          } else {
            this.$error("修改失败");
          }
        } else {
          this.$error("表单校验失败");
        }
      });
    },
    resetForm() {
      this.$resetForm.addForm.resetFields();
    },
    async getVipInfo() {
      const res = await getVipInfo(this.ruleForm.uid,);
          console.log(res);
      if (res) {
        this.ruleForm = res;
      }
    }
  },
  created() {
    this.getVipInfo();
  }
};
</script>
<style scoped>
.el-form {
  width: 400px;
  margin: auto;
}
.el-input {
  width: 400px;
}
</style>
