<template lang='jade'>
vue-file-upload(url="http://localhost:8000/vue-file-upload/demo/upload.php",
v-bind:files.sync = 'files',
v-bind:on-complete-upload = 'completeUpload',
v-bind:filters = "filters"
)
button(type='button',@click="doPost") 上传
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
        button(type='button',value='upload',@click="uploadItem(file)") upload
button(type='button',@click="uploadAll") 上传所有文件
</template>
<script>
import VueFileUpload from '../src/vue-file-upload.vue';
import UploadActions from '../src/config/msg.js';
export default{
  data(){
    return{
      files:[],
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ]
    }
  },
  created(){

  },
  methods:{
    doPost(){
      this.$broadcast(UploadActions.DOPOST);
    },
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
      file.upload();
    },
    uploadAll(){
      this.$broadcast(UploadActions.DOPOST);
    },
    completeUpload(file,response,status,header){
      console.log("finish upload;")
    }
  },
  components:{
    VueFileUpload
  }
}
</script>
