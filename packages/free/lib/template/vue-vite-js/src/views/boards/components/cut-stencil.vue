<!--github： https://github.com/YouAge-->
<template>
  <div class="img3" :style="{height}">
    <div class="img3-title" :style="{background:colorTitle}">{{title}}</div>
    <div class="img3-content">
      <FEcharts :options="options" :id="id"/>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, computed} from 'vue'
import FEcharts from "../../../components/free-echarts/src/index.vue";

export default defineComponent({
  name: "cutStencil",
  components: {FEcharts},
  props:{
    height:{
      type:String,
      default: '4.5rem'
    },
    id:{
      type:String,
    },
    options:{
      type:Object,
      default: {}
    },
    title:{
      type:String,
      default: 'map-title'
    },
    colorTitle:{
      type:String,
      default: '#09144C'
    }

  },
  setup() {

  }
})
</script>

<style scoped lang='less'>
.img3 {
  min-height: calc(100vh - 1.347rem - 0.133rem - 8rem - 0.333rem);
  //height: 4.5rem;
  display: flex;
  justify-content: center;
  //align-items: center;
  .img3-title {
    width: 4rem;
    height: 0.533rem;
    background: #09144C;
    position: absolute;
    border-radius: 0.133rem;
    box-shadow: rgb(0, 150, 255) 0 0 0.067rem inset;
    text-align: center;
    line-height: 0.533rem;
    font-weight: bold;
  }

  .img3-content {
    width: 100%;
    margin-top: 0.267rem;
    min-height: 3rem;
    border-radius: 0.133rem;
    //border: 0.013rem solid #eff1f4;
    box-shadow: rgb(0, 150, 255) 0 0 0.067rem inset;
  }
}
</style>
