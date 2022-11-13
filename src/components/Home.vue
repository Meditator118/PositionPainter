<template>
  <!-- <div class="common-layout"> -->
    <el-container class="container">
          <el-header class="header" >
            <div class="top-nav">
              <el-image class="logo" src="../../public/icon/logo.svg" mode="aspectFit|aspectFill|widthFix" lazy-load="false" binderror="" bindload="">
              </el-image>
              <el-switch active-icon inactive-icon />
              <span class="user">
                <el-image class="user-icon" src="../../public/icon/user.svg" mode="aspectFit|aspectFill|widthFix" lazy-load="false" binderror="" bindload="">
                </el-image>
              </span>
              <el-image class="github" src="../../public/icon/github.svg" mode="aspectFit|aspectFill|widthFix" lazy-load="false" binderror="" bindload="">
              </el-image>
            </div>
          </el-header>
          <el-container>
            <el-aside class="aside" width="240px">
              <div>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content ep-bg-purple-dark">
                    <span></span>
                    <RouterLink class="jump" to="/map">轨迹测算</RouterLink>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content ep-bg-purple-dark">
                      <span></span>
                      <RouterLink class="jump" to="/data">数据上传</RouterLink>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-aside>
            <el-main class="main"><RouterView /></el-main>
          </el-container>
        </el-container>
      <!-- </div> -->
     
      <!-- <nav>
        
      </nav> -->
  <!--  -->
</template>

<script lang="ts">
export default {

}
</script>

<style>
.el-container{
  width: 100%;
  height: 100vh;
}
.el-header{
  background:   #337ecc;
  border-bottom: 1px solid var(--el-border-color);
}
.el-aside{
  background:    #79bbff;
  border-right: 1px solid var(--el-border-color);
}
.el-main{
  background-color: rgb(245, 245, 245);
}
.el-row {
  margin:10px 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.grid-content {
  min-height: 60px;
  line-height: 60px;
  text-align: center;
}
.jump{
  font-size: 16px;
  color:  white;
}
.top-nav{
  height: 100%;
  display: grid;
  grid-template-columns: 85% 5% 5% 5%;
  align-items: center;
}
.user-icon{
  margin: 0 auto;
  width: 30px;
  height: 30px;
}
.user{
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: rgb(225, 225, 225);
}
.logo{
  width: 40px;
  height: 40px;
}
.github{
  width: 30px;
  height: 30px;
}
</style>