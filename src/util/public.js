import Vue from 'vue';

var pub = {};
Vue.util.extend(pub,Vue.util);

pub.extend(pub,{
  /**
   * [isHTML5 支持html5判断]
   * vue.js肯定是支持html5的
   * @return {Boolean} [description]
   */
  isHTML5(){
    return !!(window.FormData && File);
  },
  /**
   * [extend 多个对象复制]
   * 原来的vue的extend函数只支持2个参数，太不仁道了
   * @param  {[Object]} target     [目标对象]
   * @param  {[Object]} ...sources [原对象（可能多个）]
   * @return {[Object]}            [返回新的对象]
   */
  extend(target,...sources){

    sources.forEach(source => {
      Object.defineProperties(target, Object.keys(source).reduce((descriptors, key) => {
          descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
          return descriptors;
    }, {}));
    });
    return target;
  },
  /**
   * [isEmptyObject 空对象检查]
   * @param  {[type]}  obj [description]
   * @return {Boolean}     [description]
   */
  isEmptyObject(obj){
    if(this.isObject(obj)){
      let name = null;

      for(name in obj){
        if(name)return false;
      }
    }
    return true;
  },
  /**
   * [_isFile check文件]
   * @param  {[type]}  file [description]
   * @return {Boolean}      [description]
   */
  isFile(file){
    return !!(file instanceof File && (file.size || file.type))
  }
})
export default pub;
