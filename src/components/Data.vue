<template>
   <div class="continer">
    <el-upload
      class="upload-demo"
      drag
      action="api/runnings"
      :http-request="upPos" 
      multipl
    >
      <el-image class="upload" src="../../public/img/cloud.svg"></el-image>
      <div class="el-upload__text">
        拖动或者<em>点击上传</em>position文件
      </div>
      <template #tip>
      </template>
    </el-upload>
    <el-upload
      class="upload-demo"
      drag
      action="api/runnings"
      :http-request="upRun" 
      multipl
    >
      <el-image class="upload" src="../../public/img/cloud.svg"></el-image>
      <div class="el-upload__text">
        拖动或者<em>点击上传</em>running文件
      </div>
      <template #tip>
      </template>
    </el-upload>
    <el-upload
      class="upload-demo"
      drag
      action="api/runnings"
      :http-request="uptru" 
      multipl
    >
      <el-image class="upload" src="../../public/img/cloud.svg"></el-image>
      <div class="el-upload__text">
        拖动或者<em>点击上传</em>真实轨迹
      </div>
      <template #tip>
      </template>
    </el-upload>
    
   </div>
  </template>

<script lang="ts">
import axios from 'axios';
import type { UploadFile, UploadFiles, UploadRequestOptions } from 'element-plus';
import {defineComponent} from 'vue';
import type {csvinitPosition} from '../../src/model'

export default defineComponent( {
  methods:{
    async upPos(options: UploadRequestOptions) {
      // 上传position文件处理方法
        let data = options.file
				let reader = new FileReader()
        let uploadData = ''
        let that =this
				reader.readAsText(data,'utf-8')
				 reader.onload = async function(){
          uploadData=(this.result as string)
          let json = that.csvToJson1(uploadData)
          // 分片上传，每50条一组
          for (let i=0;i<Math.ceil(json.length/50);i++){
           let data=json.slice(i*50, i*50+50>=json.length?json.length:i*50+50);
           let mes=JSON.stringify(data, null, 2);
            console.log(mes);
            let res=await axios({
            method: "post",
            url: '/api/positions',
            data:  mes,
            headers: {
                'Content-Type': 'application/json',
            },
            })
          }
        }
			},
      async upRun(options: UploadRequestOptions) {
        // 上传running文件处理方法
        let data = options.file
				let reader = new FileReader()
        let uploadData = ''
        let that =this
				reader.readAsText(data,'utf-8')
				 reader.onload = async function(){
          uploadData=(this.result as string)
          let json = that.csvToJson2(uploadData)
          // 分片上传，每50条一组
          for (let i=0;i<Math.ceil(json.length/50);i++){
           let data=json.slice(i*50, i*50+50>=json.length?json.length:i*50+50);
           let mes=JSON.stringify(data, null, 2);
            let res=await axios({
            method: "post",
            url: '/api/runnings',
            data:  mes,
            headers: {
                'Content-Type': 'application/json',
            },
            })
            console.log(res);
          }
        }
			},
      
      async uptru(options: UploadRequestOptions) {
        // 上传真实轨迹文件处理方法
        let data = options.file
				let reader = new FileReader()
        let uploadData = ''
        let that =this
				reader.readAsText(data,'utf-8')
				 reader.onload = async function(){
          uploadData=(this.result as string)
          let json = that.csvToJson3(uploadData)
          // 分片上传，每50条一组
          for (let i=0;i<Math.ceil(json.length/50);i++){
           let data=json.slice(i*50, i*50+50>=json.length?json.length:i*50+50);
           let mes=JSON.stringify(data, null, 2);
            
            let res=await axios({
            method: "post",
            url: '/api/truepoint',
            data:  mes,
            headers: {
                'Content-Type': 'application/json',
            },
            })
            console.log(res);
          }
        }
			},
      csvToJson2(csv1:string) {
      // running.csv转json解析函数
      const lines = csv1.split('\n');
      const delimeter = ',';
      const result:csvinitPosition[]= [];
      // const headers = lines[0].split(delimeter);
      const headers = ['accx','accy','accz','gyroscopex','gyroscopey','gyroscopez'
      ,'stay','timestamp','sampleTime','sampleBatch','id'];
      for (let i=1;i<lines.length;i++) {
        let line=lines[i];    
        if (line) {
        const obj:any={}
        const row = line.split(delimeter);
        row.splice(0,8)
        row.splice(7,2)
        row.splice(8,1)
        row[8]=row[8]+'T'+row[9]
        row[9]=row[10]
        row[8]=row[8].replace(/"/g,'')
        row[8]+='Z'
      
        obj[headers[0]]=Number(row[0])
        obj[headers[1]]=Number(row[1])
        obj[headers[2]]=Number(row[2])
        obj[headers[3]]=Number(row[3])
        obj[headers[4]]=Number(row[4])
        obj[headers[5]]=Number(row[5])
        obj[headers[6]]=row[6]=="1"?true:false
        obj[headers[7]]=Number(row[7])
        obj[headers[8]]=row[8]
        obj[headers[9]]=Number(row[9])+100
        obj[headers[10]]=this.guid2()
        result.push(obj);
        }
        
      }
      // Prettify output
      return result;
    },
    csvToJson1(csv1:string) {
      // position.csv转json解析函数
      const lines = csv1.split('\n');
      const delimeter = ',';
      const result:csvinitPosition[]= [];
      // const headers = lines[0].split(delimeter);
      const headers = ['id','x','y','z','stay','timestamp','sampleTime','sampleBatch'];
      for (let i=1;i<lines.length;i++) {
        let line=lines[i];    
        if (line) {
          const obj:any={}
        const row = line.split(delimeter);
        row[8]=row[8]+'T'+row[9]
        row[9]=row[10]
        row.pop()
        row[8]=row[8].replace(/"/g,'')
        row[8]+='Z'
        row.splice(1,1)
        row.splice(6,1)
        console.log(row);
        obj[headers[0]]=this.guid2()
        obj[headers[1]]=Number(row[1])
        obj[headers[2]]=Number(row[2])
        obj[headers[3]]=Number(row[3])
        obj[headers[4]]=row[4]=="1"?true:false
        obj[headers[5]]=Number(row[5])
        obj[headers[6]]=row[6]
        obj[headers[7]]=Number(row[7])+100
        result.push(obj);
        }
        
      }
      return result;
    },
    csvToJson3(csv1:string) {
      // truepath.csv转json解析函数
      const lines = csv1.split('\n');
      const delimeter = ',';
      const result:csvinitPosition[]= [];
      const headers = ['id','x','y','step','magic'];
      for (let i=1;i<lines.length;i++) {
        let line=lines[i];    
        if (line) {
          const obj:any={}
        const row = line.split(delimeter);
        obj[headers[0]]=this.guid2()
        obj[headers[1]]=Number(row[1])
        obj[headers[2]]=Number(row[2])
        obj[headers[3]]=Number(row[0])
        obj[headers[4]]=1
        result.push(obj);
        }
        
      }
      // Prettify output
      return result;
    },
    guid2() {
      // uuid生成函数
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }


 

  }

})
</script>

<style>
.continer{
  display: flex;
  justify-content: space-around;
}
.upload{
    margin: 20px;
    width: 300px;
    height: 30px;
}
.upload-demo{
    height: 200px;
}
.up{
    width: 300px;
    height: 200px;
    line-height: 200px;
    margin: 0 30px;
    background: white;
    border-radius: 20px;
    border:1px solid #337ecc;
}
</style>
  