<!--github： https://github.com/YouAge-->
<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from '@/plugins/echtarts'
import resize from '../resize'
export default {
  name: 'FEcharts',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    options:{
      type: Object,
      default:{
        color: "#0177FF",
        grid: {
          // top: '20px',
          left: "4%",
          right: "4%",
          bottom: "6%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "1", "6"],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff", // 字体颜色
            },
          },
        },
        yAxis: {
          type: "value",

          splitLine: {
            // 图中内部的x线图
            lineStyle: {
              // 使用深浅的间隔色
              color: "#545A7E",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 232, 57],
            type: "bar",
            barWidth: "24px", // 圆柱宽度
          },
        ],
      }
      // required:true
    }
  },
  data(){
    return {
      chart: null
    }
  },
  watch:{
    options: {
      handler(){
        this.initChart()
      },
      deep:true
    }
  },
  methods:{
    initChart() {
      if(Object.keys(this.options).length>0){
        const id = document.getElementById(this.id) || null
        if(id){
          this.chart = echarts.init(id)
          this.chart.setOption(this.options)
          this.chart.on('click',item=>{
            this.$emit('change',item)
          })
          this.initListener() // 注册图片相应
          // window.addEventListener('resize', () => {
          //   this.chart.resize()
          // }) // 响应式
        }
      }
    }
  },
  mounted () {
   this.initChart()
  },
  // beforeDestroy() {
  //   if (!this.chart) {
  //     return
  //   }
  //   this.chart.dispose()
  //   this.chart = null
  // },

}
</script>

<style scoped>

</style>
