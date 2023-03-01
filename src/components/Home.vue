<template>
  <!-- <div class="common-layout"> -->
    <el-container class="container">
          <el-header class="header" >
            <div class="top-nav">
              <img class="logo" src="../../public/img/logo.svg" mode="aspectFit|aspectFill|widthFix" lazy-load="false" binderror="" bindload="">
            </div>
          </el-header>
          <el-container>
            <el-aside class="aside" width="80px">
              <div>
                <el-row :class="{'row-active': ismapactive}">
                  <el-col :span="24" @click="jump2map">
                   
                    <div :class="['jump',{'active': ismapactive}]" >
                      <img src="../../public/img/pos.svg" alt="" class="icon">
                      <div>轨迹测算</div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :class="{'row-active': isdataactive}">
                  <el-col :span="24" @click="jump2data">
                      <div :class="['jump',{'active': isdataactive}]" >
                        <img src="../../public/img/data.svg" alt=""  class="icon">
                        <div>数据上传</div>
                      </div>
                  </el-col>
                </el-row>
              </div>
            </el-aside>
            <el-main class="main"><RouterView /></el-main>
          </el-container>
        </el-container>
</template>

<script lang="ts" >
import { ref,defineComponent } from 'vue'

export default defineComponent({
  
  data(){
   return{
    value1 : ref(true),
    ismapactive:true,
    isdataactive:false,
   }

  },
  mounted(){
    
  },
  methods:{
    //路由跳转方法
    jump2data(){
      this.$router.replace('/data')
      this.ismapactive=false
      this.isdataactive=true
    },
    jump2map(){
      this.$router.replace('/map')
      this.ismapactive=true
      this.isdataactive=false
    }
  }
 
})
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
  background:    white;
  border-right: 1px solid var(--el-border-color);
  box-shadow: var(--el-box-shadow-dark);
}
.el-main{
  background-color: rgb(245, 245, 245);
}
.el-row{
  margin: 10px 0;
}
.el-col {
  margin:0 2px 0 0;
  border-left: 4px solid white
}
.el-row:last-child {
  margin-bottom: 0;
}
.icon{
  width: 20px;
  height: 20px;
}
.row-active{
  border-left: 4px solid #337ecc;
}
.jump{
  width: 90%;
  height: 60px;
  text-align: center;
  font-size: 12px;
  color:  #337ecc;
  padding:10px 0;
  border-radius: 10px;
  cursor: pointer;
}
.jump:hover{
  background-color: rgb(225, 224, 224);
  border-radius: 10px;
}
.active{
  background-color:rgb(225, 224, 224)
}
.top-nav{
  height: 100%;
  display: grid;
  grid-template-columns: 85% 7% 4% 4%;
  align-items: center;
}
.user-icon{
  margin: 0 auto;
  width: 26px;
  height: 26px;
}
.user{
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background: rgb(225, 225, 225);
}
.logo{
  width: 40px;
  height: 40px;
  margin-left: 80px;
}
.github{
  width: 30px;
  height: 30px;
}
</style>