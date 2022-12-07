<template >
  <h1>Welcome to Car Web</h1>
  <img alt = "Logo" src = "../assets/car Image.jpg">
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