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
```javascript
<template lang="jade">
vue-file-upload(url='upload.do',
  v-bind:files.sync = 'files',
  v-bind:filters = "filters",
  v-bind:on-complete-upload = 'completeUpload')
</template>
<script>
import VueFileUpload from 'vue-file-upload';
export default{
  components:{
    VueFileUpload
  }
}
</script>
```
