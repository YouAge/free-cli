<!--github： https://github.com/YouAge-->
<template>
  <div class="f-user">
    <a-avatar :size="60" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  style="background-color: #B8B9B4">U</a-avatar>
    <div class="user-info">
      <p>{{job}}：{{name}}</p>
      <p>电话：{{iphone}}</p>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "ort-user",
  props:{
    img:{
      type:String,
      default:''
    },
    iphone:{
      type:String,
      default:'xxxxxxx'
    },
    name:String,
    job:String,
  }

})
</script>

<style scoped lang="less">
.f-user{
  display: flex;
  //justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  .user-info{
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    //flex-flow: row;
    letter-spacing:2px; // 字体间距
    line-height: 1.6; // 字体行距
  }
}
</style>
