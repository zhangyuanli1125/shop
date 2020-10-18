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
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="ruleForm.rolename"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="defaultProps"
            :default-checked-keys="ruleForm.menus.split(',')"
            ref="tree"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即更新</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getMenuList } from "../../request/menu";
import { getRoleById } from "../../request/role";
export default {
  name: "",
  data() {
    return {
      menuList: [],
      ruleForm: {
        id: this.$route.params.id,
        rolename: "",
        menus: "",
        status: 1
      },
      rules: {
        rolename: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          const menus = this.$refs.tree.getCheckedKeys();
          this.ruleForm.menus = menus.join(",");
          this.$axios
            .post("/api/roleedit", {
              ...this.ruleForm,
              id: this.$route.params.id
            })
            .then(res => {
              if (res.code == 200) {
                this.$success("修改成功");
                this.$router.push("/role");
              } else {
                this.$error("修改失败");
              }
            });
        } else {
          console.log("表单校验失败");
        }
      });
    },
    resetForm() {
      this.$refs.addForm.resetFields();
    },
    async getMenuList() {
      const res = await getMenuList();
      if (res) {
        this.menuList = res;
      }
    },
    async getRoleById() {
      const res = await getRoleById(this.ruleForm.id);
      if (res) {
        this.ruleForm = res;
      }
    }
  },
  created() {
    this.getMenuList();
    this.getRoleById();
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
