<template>
 <div class="con">
  <!-- 地图区 -->
  <img src="../../public/img/map1.jpg" alt="" width="800" height="600">
  <canvas id="c" width="800" height="600"></canvas>
  <!-- 数据集切换区 -->
  <div class="control">
    <el-select v-model="dataset" class="m-2" 
    placeholder="请选择数据集" size="large" @change="initPaint">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <!-- 误差曲线区 -->
  <div class="figure-con" v-show="showcdf">
    <div id="chart" >
    </div>
    <el-descriptions
    direction="vertical"
    :column="4"
    size="small"
    border
    class="error-list"
  >
    <el-descriptions-item v-for="val in erroroptions"
    :key = "val" :label="val.label">{{ val.value }}</el-descriptions-item>
  </el-descriptions>
  </div>
  <!-- 定位点信息区 -->
 <div class="detail" v-show="showposdetail">
  <el-descriptions
    class="margin-top"
    :column="1"
    size="small"
    title="原始点数据"
    border
  >
  <el-descriptions-item
  v-for="(val,key) in pointDetail"
    :key = "val"
    width=80
    align="center"
  >
      <template #label>
        <div class="cell-item">
          {{ key }}
        </div>
      </template>
      {{ val }}
    </el-descriptions-item>

  </el-descriptions>
 </div>
 <div class="detail" v-show="showpdrdetail">
  <el-descriptions
    class="margin-top"
    :column="1"
    size="small"
    title="预测点数据"
    border
  >
  <el-descriptions-item
  v-for="(val,key) in pdrDetail"
    :key = "val"
    width=80
    align="center"
  >
      <template #label>
        <div class="cell-item">
          {{ key }}
        </div>
      </template>
      {{ val }}
    </el-descriptions-item>

  </el-descriptions>
 </div>
 <!-- 图例 -->
 <div class="tips">
  <div class="trueline">真实轨迹</div>
  <div class="posline">定位轨迹</div>
  <div class="pdrline">预测轨迹</div>
 </div>
</div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue';
import axios from 'axios'
import {Point} from '../../src/model/class'
// import {pointList} from '../../public/temp/postion28'
import type {initPosition} from '../../src/model'
import type {initAcc} from '../../src/model'
import type {truepos} from '../../src/model'
import * as echarts from 'echarts';
import { ElLoading } from 'element-plus';



const dpr=window.devicePixelRatio
const offx=89
const offy=69
export default defineComponent({
  data(){
    return{
       a:10,
       dataset:ref(''),
       showcdf:false,
       showposdetail:false,
       showpdrdetail:false,
       options:[
       {value:22,label:`数据集`}
       ],
       erroroptions:[
       {value:'',label:"50%误差"},
       {value:'',label:"75%误差"},
       {value:'',label:"90%误差"},
       {value:'',label:"平均误差"}
       ],
    pointDetail:{
      x:'-',
      y:'-',
      z:'-',
      stay:'-',
      sampleBatch:'-'
    },
    pdrDetail:{
      accx:'-',
      accy:'-',
      accz:'-',
      gyroscopez:'',
      gyroscopey:'',
      gyroscopex:'',
      theta:'-',
    }
    }
  },
  mounted(){
    //初始化屏幕像素换算
    let c=document.getElementById('c')as HTMLCanvasElement
    let width = c.width,height=c.height;
    if (dpr) {
	        c.style.width = width + "px";
	        c.style.height = height + "px";
	        c.height = height * dpr;
	        c.width = width * dpr;
    }
    this.initdatalist()
  },
  methods:{
    async initdatalist(){
      //初始化数据集
      const res2 = await axios.get(`/api/batchs`)
      this.options.pop()
      for(let i=0;i<res2.data.length;i++){
        this.options.push({value:res2.data[i],label:`数据集${res2.data[i]}`})
      }
    },
    async initPaint(batchSeq:number){
      const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
    })
      let c=document.getElementById('c')as HTMLCanvasElement
      let cvsCtx=c.getContext('2d')as CanvasRenderingContext2D
      let posList:Point[]=[]
      let pdrsamList:Point[]=[]
      this.showcdf=true
      //canvas画笔配置
      cvsCtx.save()
      cvsCtx.clearRect(0, 0,1712,1284);
      cvsCtx.fillRect(635,714, 10, 10);
      cvsCtx.strokeStyle = 'red';
      cvsCtx.lineCap = 'round';
      cvsCtx.lineJoin = 'round';
      cvsCtx.lineWidth = 5;

      
      //获取轨迹信息
      const res1 = await axios.get(`/api/positions?batch=${batchSeq}`)
      const res3 = await axios.get(`/api/runnings/pdr?batch=${batchSeq}`)
      let magic=1
      if(27<=batchSeq&&batchSeq<=31){
        magic=0
      }
      const res2 = await axios.get(`/api/truepoint?batch=${magic}`)
      console.log(res1,res2,res3);

      //绘制真实轨迹
      let truelist:truepos[]=res2.data
      console.log(truelist);
      cvsCtx.beginPath();
      cvsCtx.strokeStyle = 'red';
      cvsCtx.setLineDash([5, 15]);
      truelist.map((item)=>{
        cvsCtx.lineTo(item.x*120+635, 714-item.y*120);
        cvsCtx.stroke();
      })
      cvsCtx.setLineDash([]);
      cvsCtx.closePath()
      
      //绘制定位轨迹
      cvsCtx.strokeStyle = 'green';
      const pointList:initPosition[]=res1.data
      const pdrList:initAcc[]=res3.data
      cvsCtx.fillStyle = '#337ecc';
      cvsCtx.beginPath();
      pointList.map((item)=>{ 
        cvsCtx.lineTo(item.x*90+635, 714-item.y*90);
        cvsCtx.stroke();
      })
      cvsCtx.closePath()

      pointList.map((item,index)=>{
          let samplePoint=new Point(item.x*90+635, 714-item.y*90,index,cvsCtx,1,0)
          samplePoint.draw()
          posList.push(samplePoint)
        })
      
      //绘制预测轨迹
      cvsCtx.strokeStyle = 'yellow';
      cvsCtx.fillStyle = 'white';
      cvsCtx.beginPath();  
      pdrList.map((item)=>{ 
        cvsCtx.lineTo(item.x*90+635, 714-item.y*90);
        cvsCtx.stroke();
      })
      cvsCtx.closePath()

      //计算误差
      let cdf=new Array(pdrList.length)
      let pointSeq=new Array(pdrList.length)
      let sum=0
      pdrList.map((item,index)=>{
        cdf[index] = item.error
        sum+=item.error
          let samplePoint=new Point(item.x*90+635, 714-item.y*90,index,cvsCtx,0,item.theta)
          samplePoint.draw()
          pdrsamList.push(samplePoint)
        })
    cdf.sort((a,b) => a-b)

    for (let index = 0; index < pointSeq.length; index++) {
        pointSeq[index]=index/pointSeq.length;
      }
      
    this.erroroptions[0].value=String(cdf[Math.floor(cdf.length*0.5)]).slice(0,5)
    this.erroroptions[1].value=String(cdf[Math.floor(cdf.length*0.75)]).slice(0,5)
    this.erroroptions[2].value=String(cdf[Math.floor(cdf.length*0.9)]).slice(0,5)
    this.erroroptions[3].value=String(sum/cdf.length).slice(0,5)

    let cdfdata=[]
    for (let index = 0; index < pointSeq.length; index++) {
      cdfdata.push([cdf[index],pointSeq[index]])
    }

    //绑定点击事件
    c.onclick=(e)=>{
      // cvsCtx.isPointInPath(posList[posList.length-1].path, (e.clientX-offx)*dpr,(e.clientY-offy)*dpr) 
      this.showposdetail=false  
      this.showpdrdetail=false  

      for (const iterator of posList) {  
        if(cvsCtx.isPointInPath(iterator.path, (e.clientX-offx)*dpr, (e.clientY-offy)*dpr)) {
          this.setposDetail(iterator.index,pointList)
          this.showposdetail=true
          break;
        }
      }
      for (const iterator of pdrsamList) {  
        if(cvsCtx.isPointInPath(iterator.path, (e.clientX-offx)*dpr, (e.clientY-offy)*dpr)) {
          this.setpdrDetail(iterator.index,pdrList)
          this.showpdrdetail=true
          break;
        }
      }
    }
    cvsCtx.restore();

    //配置误差曲线图
    type EChartsOption = echarts.EChartsOption;
    let chartDom = document.getElementById('chart')!;
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;
    option = {
      title:{
        show: true ,
        text: ' CDF曲线' ,
        left: "center",
      },
      tooltip: {
      trigger: 'axis'
    },
      xAxis: {
        name: '误差',
        nameGap:4
      },
      yAxis: {
        name: '百分比',
      },
      series: [
        {
          data:  cdfdata,
          type: 'line',
        }
      ]
    };
    option && myChart.setOption(option);

    loading.close()
    },
    setposDetail(index:number,pointList:initPosition[]){
      // 显示定位点信息
      let point=pointList[index]
      this.pointDetail.x=String(point.x).slice(0,10)
      this.pointDetail.y=String(point.y).slice(0,10)
      this.pointDetail.z=String(point.z).slice(0,10)
      this.pointDetail.stay=String(point.stay)
      this.pointDetail.sampleBatch=String(point.sampleBatch)
    },
    setpdrDetail(index:number,pdrList:initAcc[]){
      // 显示预测点信息
      let point=pdrList[index]
      this.pdrDetail.accx=String(point.accx).slice(0,10)
      this.pdrDetail.accy=String(point.accy).slice(0,10)
      this.pdrDetail.accz=String(point.accz).slice(0,10)
      this.pdrDetail.gyroscopez=String(point.gyroscopez).slice(0,10)
      this.pdrDetail.gyroscopey=String(point.gyroscopey).slice(0,10)
      this.pdrDetail.gyroscopex=String(point.gyroscopex).slice(0,10)
      this.pdrDetail.theta=String(point.theta).slice(0,10)
    }
  }
})
</script>

<style>
#c{
  position: absolute;
  top: 0;
  left: 0;
}
.con{
  position: relative;
  top: -10px;
  left: -10px;
}
.control{
  position: absolute;
  top: 0;
  right:50px;
}
.title{
  text-align: center;
  font-size: 20px;
}
#chart{
  width: 300px;
  height: 240px;
}
.figure-con{
  position: absolute;
  padding: 10px 10px;
  border-radius: 20px;
  border: 1px solid #79bbff;
  top: 45px;
  right:0;
  height:300px;
  width: 320px;
  background-color: white;
}
.error-list{
  display:relative;
  top:-30px
}
.tips{
  position: absolute;
  top:570px;
  right:360px;
  width:220px;
  height:40px;
  display:flex;
  color:black;
  font-size:12px;
}
.posline{
  margin:0 10px;
  border-top:2px solid green;
  font-size:12px;
}
.pdrline{
  margin:0 10px;
  border-top:2px solid yellow;
}
.trueline{
  margin:0 10px;
  border-top:2px dashed red;
}

.detail{
  position: absolute;
  top: 350px;
  right: 0;
  width: 320px;
  padding: 10px 20px;
  border: 1px solid #79bbff;
  border-radius: 20px;
  background-color: #fff;
}
</style>