<template>
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multipl
    >
      <el-image class="upload" src="../../public/icon/cloud.svg"></el-image>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
  </template>

<script lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
export default {

}
</script>

<style>
.upload{
    width: 80px;
    height: 50px;
}
.upload-demo{
    height: 300px;
}
</style>
  