<template >
  <el-container class="homecontainer">
    <el-header>
      <div class="head">
        <!-- <div class="div1">
          <img alt="Vue logo" src="./assets/car Image.jpg" width="100" height="60">

        </div> -->
        <h1>Car Web</h1>
        
        <el-menu class="el-menu-demo" mode="horizontal"
          background-color="#4799e6aa" text-color="#333" active-text-color="#ffd04b">
          <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to="/Update">Updata information</router-link></el-menu-item>
          <el-menu-item index="3" ><router-link to="/AddCar">Add car</router-link></el-menu-item>
          <el-menu-item index="4" ><router-link to="/QueryByVim">Query By Vim</router-link></el-menu-item>
          
          <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
        </el-menu>
      </div>
    </el-header>

    <el-container>
      <!-- <el-aside width="200px">
        <el-menu router default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-platform-eleme"></i><span>nav1</span></template>
            <el-menu-item index="/manage">op1</el-menu-item>
            <el-menu-item index="/add">op2</el-menu-item>
          </el-submenu>
         
        </el-menu>
      </el-aside> -->
      <el-container>
        <el-main height="300px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">Main Page</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
   
<script>
export default {

  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleOpen() {
    },
    handleClose() {
    }
  },
  data() {

    return {

    }
  }
}
</script>
   
<style scoped>
.homecontainer {
  height: 763px;
  width: 100%;

}

.head {
  display: flex;
  flex-direction: row;
}

.div1 {
  /* margin-top: 0px;
  margin-left: 0px; */
  text-align:center;
}

.div2 {
  margin-left: 1270px;
  margin-top: 30px;
  float: right;
  font-size: 12px;
}

.el-header {
  background-color: #4799e6aa;
  color: #333;
  text-align: center;
  line-height: 10px;
}

.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #010e1b;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>