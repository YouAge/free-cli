<!--github： https://github.com/YouAge-->
<template>
  <Popover  v-model:visible="visible"   overlayClassName="nameTooltipClass" destroyTooltipOnHide >
    <template #content>
      <p><span style="font-weight: bold">编号：</span>{{title}}</p>
      <p><span style="font-weight: bold">机台名：</span>{{cutObj.assy_function}}</p>
      <p>运行信息： <span :style="{color:'#F1A006'}">{{ cutObj.contents}} </span></p>
<!--      // 如果信息量多了，会出现卡片很大， 会很丑的问题，解决办法就是最多显示2到3个，单机台页面全部显示。
 或者全部显示采用单机台页面的滚动（个人不推荐）因为有单机台详情信息了-->
      <template v-for="item in cutObj.userMessage" >
        <p>{{item.position}}：{{item.name}}</p>
        <p>电话：{{item.phone}}</p>
      </template>
    </template>
  <div class="f-container" :style="{color,width,height}" @click="getOneCtu">
    <svg-icon name="gear" ref="fGear" :color="color" class="free-ore-gear" :style="{width,height}"></svg-icon>
    <div class="f-title">
      <div class="f-title-1">{{ title}}</div>
      <div class="f-title-2" :style="{color:titleColor}">{{status}}</div>
    </div>
  </div>
  </Popover>
</template>

<script>
import {defineComponent,  ref,onMounted,reactive,toRefs} from 'vue'
import SvgIcon from "../free-icon/src/SvgIcon.vue";
import {Popover} from 'ant-design-vue'

const ctuCode = {
  '1':'', //:'正常生产',on
  '2':'IDL', // 待料
  '3':'OFF', // 异常停机
}
const ctuColor ={
  '1':'#fff',
  '2':'#F1A006',
  '3':'#E1040C',
}


export default defineComponent({
  name: "gear",
  props:{
    title:{
      type: String,
      default: 'M120'
    },
    width:{
      type:String,
      default: '78px' // 1.067rem
    },
    height:{
      type:String,
      default:'78px'
    },
    color:{
      type:String,
      default:'#fff'
    },
    status:{
      type:String,
      default:''
    },
    cutObj:{
      type:Object,
      default:{
        userMessage:[]
      }
    },
    temp:{
      type:Boolean,
      default:false
    },
    INFO:{
      type:Object,
      require:true
    }

  },
  components: {SvgIcon,Popover},
  setup(props) {
    const codeRef = ref(null)
    const fGear = ref(null)
    const visible = ref(false)
    const state = reactive({
      color:props.color,
      titleColor:'#F1A006',
      status: ''
    })

    if(props.temp){
      //显示信息， 只要不是是正确的.  如果父页有错误，就会导致子组件渲染多次，从而出现卡片位子不准确
      visible.value = true
    }
    state.status = ctuCode[props.cutObj.code]
    state.titleColor = ctuColor[props.cutObj.code]
    state.color = ctuColor[props.cutObj.code]
    onMounted(()=>{
      //渲染完成执行， 坏的机器，停止运动
      if(props.cutObj.code !== 1){ // 只要不是
        fGear.value.$el.style.animation = 'none' // 停止动画
      }
    })
    function getOneCtu(){
      window.open(`/one-facility?factory=${props.INFO.factory}&line=${props.INFO.line} &id=${props.cutObj.machine_code}&title=${props.title}&machineName=${props.cutObj.assy_function}`,props.title)
    }

    return{
      ...toRefs(state),
      codeRef,
      fGear,
      visible,
      getOneCtu
    }
  }
})
</script>

<style scoped lang='less'>
.f-container{
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  &:hover .free-ore-gear{
    animation:none;
  }
}
.f-title{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  font-weight: bold;
  text-align: center;
  .f-title-1{
    color: #eff1f4;
  }
  .f-title-2{
    font-size: 0.16rem;
    margin-top: 0.013rem;
  }
}




@-webkit-keyframes music { /* Safari and Chrome */
  from{transform: rotate(0deg);}
  to{transform: rotate(360deg);}
}

@-moz-keyframes music { /* Firefox */
  from{transform: rotate(0deg);}
  to{transform: rotate(360deg);}
}

@keyframes music {
  from{transform: rotate(0deg);}
  to{transform: rotate(360deg);}
}



</style>
