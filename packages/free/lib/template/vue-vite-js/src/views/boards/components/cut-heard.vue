<!--github： https://github.com/YouAge-->
<template>
  <div class="facility">
    <slot name="top"></slot>
    <div class="ort-title">
      <div class="ort-item">
        <div></div>
        <a-tooltip title="点击全屏||退出全屏" placement="right">
        <div class="title" @click="fullScreen">{{factory.toUpperCase()}} {{line.toUpperCase()}}</div>
        </a-tooltip>
        <div class="time">{{time.year}}-{{time.mouth}}-{{time.date}} {{time.hour}}:{{time.minuter}}:{{time.seconds}}
          {{time.classes}}</div>
      </div>
    </div>
    <div class="ort-content">
      <slot name="content"/>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {exitFullScreen, fullscreenEnable, reqFullScreen, timeClock} from "../../../utils/common.js";
export default defineComponent({
  name: "cut-heard",
  props:{
    factory:{
      type:String,
      default:'ASSY',
    },
    line:{
      type:String,
      default:'L1',
    }
  },
  setup(){
    const time = ref({
      year:'',
      mouth: '',
      date: '',
      hour: '',
      minuter: '',
      seconds: '',
      classes:''
    })
    // 时间
    async function  startTime() {
      time.value =  await timeClock()
    }
    setInterval(()=>{
      startTime()
    },1000)

   function fullScreen(){
      if(fullscreenEnable()){

        exitFullScreen() // 退出
      }else {
        reqFullScreen()
      }
   }

   return {
     fullScreen,
     time
   }
  }
})
</script>

<style scoped lang="less">
.facility{
  position: relative;
  background: url("../img/bg.jpg")  no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
  min-width: 1900px;
  width: 100%;
  box-sizing: border-box;
  color: white;
  .ort-title{
    height: 1.347rem;
    background: url("../img/topbg.png") top center no-repeat;
    background-size: 100% 100%;
    z-index: 2;
    display: flex;
    vertical-align:bottom;
    justify-content: center;
    //line-height: 99px;
    .ort-item{
      width: 30%;
      height: 1.2rem;
      //border: 0.013rem solid #eff1f4;
      display: flex;
      justify-content: center;
      //text-align: center;
      align-items: center;
      >div{
        flex: 1;
      }
      .title{
        font-size: 0.4rem;
        height: 50%;
        text-align: center;
        font-weight: bold;
        vertical-align: bottom;
        cursor: pointer;
        flex: 1;
      }
      .time{
        flex: 1;
        height: 60%;
        //font-size: 0.267rem;
        align-self: flex-end;
        text-align: end;
        vertical-align: bottom;
        padding-bottom: 10px;
        font-weight: bold;
        //内容右对齐
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

      }
    }
    .ort-font-time{
      //font-size: 20px;
      vertical-align:bottom;

    }
  }
}
.ort-content{
  margin-top: 10px;
  min-height: calc(100vh - 1.347rem - 0.133rem);
  padding:  0 0.267rem;
  //border: 1px solid #f0f0f0;
  box-sizing: border-box;
  .free-row{
    margin: 0;
  }
}
</style>
