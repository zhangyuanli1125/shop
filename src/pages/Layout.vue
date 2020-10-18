<template>
  <fullscreen ref="fullscreen">
    <el-container>
    <el-aside width="226px">
      <!-- 左侧边栏 -->
      <el-col>
        <h3>小U商城后台</h3>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#262a32"
          text-color="#f1f1f1"
          active-text-color="#FFF"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              系统设置
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/admin">管理员管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              商城设置
            </template>
            <el-menu-item index="/category">商品分类</el-menu-item>
            <el-menu-item index="/specs">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/vip">会员管理</el-menu-item>
            <el-menu-item index="/lunbo">轮播图管理</el-menu-item>
            <el-menu-item index="/active">秒杀活动</el-menu-item>
            <el-menu-item index="/echart">echart</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-left">
          <el-button
            type="primary"
            icon="el-icon-s-fold"
            size="mini"
          ></el-button>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-button @click="$router.go(-1)" size="mini" circle plain icon="el-icon-back"></el-button>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">
              <i class="el-icon-user"></i>
              个人信息</el-dropdown-item
            >
            <el-dropdown-item command="fullScreen">
              <i class="el-icon-full-screen"></i>
              全屏操作</el-dropdown-item
            >
            <el-dropdown-item command="logout">
              <i class="el-icon-switch-button"></i>
              退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </fullscreen>
</template>

<script>
import Vue from "vue"
 import Fullscreen from "vue-fullscreen"
 Vue.use(Fullscreen)
export default {
  name: "",
  data() {
    return {};
  },


  created() {
  
  },
  mounted() {},
  methods: {
      fullScreen() {
      this.$refs.fullscreen.toggle();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      this[command]();
    },
    logout() {
      sessionStorage.removeItem("userinfo");
      this.$router.push("/login");
    },
    fullscreen() {
                this.$refs.fullscreen.toggle()
            },
    
  }

}
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
}
h3 {
  line-height: 60px;
  background: #444;
  color: white;
  font-weight: normal;
  letter-spacing: 2px;
  text-align: center;
}
.el-menu {
  background: #262a32;
  height: calc(100vh - 60px);
}
.el-menu-item.is-active {
  background: #409eff !important;
}
.el-submenu .el-menu-item {
  padding-left: 55px !important;
}
.el-menu-vertical-demo {
  border-right: 0;
}
.el-header {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-left {
  display: flex;
  align-items: center;
}
.el-breadcrumb {
  margin: 0 10px;
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-header,
.el-footer {
  line-height: 0;
}
</style>
