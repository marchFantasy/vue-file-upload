<template lang='jade'>
div
    vue-file-upload(url="http://localhost:8000/vue-file-upload/demo/upload.php",
    ref="vueFileUploader"
    v-bind:events = 'cbEvents',
    v-bind:filters = "filters",
    v-bind:request-options = "reqopts",
    v-on:onAdd = "onAddItem"
    )
    table
      thead
        tr
          th name
          th size
          th preview
          th progress
          th status
          th action
      tbody
        tr(v-for='file in files')
          td(v-text='file.name')
          td(v-text='file.size')
          td
            img(v-bind:src='onPreview(file)',width='220px')
          td(v-text='file.progress')
          td(v-text='onStatus(file)')
          td
            button(type='button',value='upload',@click="uploadItem(file)") upload
            button(type='button',value='upload',@click="deleteItem(file)") delete
    button(type='button',@click="uploadAll") 上传所有文件
    button(type='button',@click="clearAll") 清空文件列表
</template>
<script>
import VueFileUpload from '../src/vue-file-upload.vue';
export default{
  data(){
    return{
      files:[],
      //过滤器回调
      filters:[
        {
          name:"imageFilter",
          fn(file){
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        }
      ],
      //事件回调
      cbEvents:{
        onCompleteUpload:(file,response,status,header)=>{
          console.log(file);
          console.log("finish upload;")
        },
        onAddFileSuccess:(file)=>{
          console.log(file);
          console.log("success add to queue");
        }
      },
      reqopts:{
        formData:{
          tokens:'tttttttttttttt'
        },
        responseType:'json',
        withCredentials:false
      }
    }
  },
  created(){

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
    onPreview(file){
        var src = window.URL.createObjectURL(file.file);
        return src;
    },
    onAddItem(files){
        console.log(files);
        this.files = files;
    },
    uploadItem(file){
      file.upload();
    },
    deleteItem(file){
        file.remove();
    },
    uploadAll(){
      this.$refs.vueFileUploader.uploadAll();
    },
    clearAll(){
      this.$refs.vueFileUploader.clearAll();
    }
  },
  components:{
    VueFileUpload
  }
}
</script>
