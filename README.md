# vue-file-upload
vue.js ，vue-loader 上传文件，vue-file-upload
代码里面包含demo，运行：
```javascript
npm run dev
```

## install
### npm
```shell
npm install --save vue-file-upload
```
### CommonJS
```javascript
var VueFileUpload = require('vue-file-upload');

```
### ES6
app.vue
```javascript
<template lang="jade">
vue-file-upload(url='upload.do',
  v-bind:files.sync = 'files',
  v-bind:filters = "filters",
  v-bind:events = 'cbEvents',
  v-bind:request-options = "reqopts")
table
  thead
    tr
      th name
      th size
      th progress
      th status
      th action
  tbody
    tr(v-for='file in files')
      td(v-text='file.name')
      td(v-text='file.size')
      td(v-text='file.progress')
      td(v-text='onStatus(file)')
      td
        button(type='button',@click="uploadItem(file)") 上传
button(type='button',@click="uploadAll") 上传所有文件
</template>
<script>
import VueFileUpload from 'vue-file-upload';
export default{
  data(){
    return{
      files:[],
      //文件过滤器，只能上传图片
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //回调函数绑定
      cbEvents:{
        onCompleteUpload:(file,response,status,header)=>{
          console.log(file);
          console.log("finish upload;")
        }
      },
      //xhr请求附带参数
      reqopts:{
        formData:{
          tokens:'tttttttttttttt'
        },
        responseType:'json',
        withCredentials:false
      }
    }
  },
  methods:{
    onStatus(file){
      if(file.isSuccess){
        return "上传成功";
      }else if(file.isError){
        return "上传失败";
      }else if(file.isUploading){
        return "正在上传";
      }else{
        return "待上传";
      }
    },
    uploadItem(file){
      //单个文件上传
      file.upload();
    },
    uploadAll(){
      //上传所有文件
      this.$broadcast('DO_POST_FILE');
    }
  },
  components:{
    VueFileUpload
  }
}
</script>
```
