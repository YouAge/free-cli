<!--github： https://github.com/YouAge-->
<template>
  <header v-title :data-title="title+ '-机台'"/>
<cut-heard :factory="factory" :line="line">
  <template #content>
    <Row :gutter="[10,40]">
      <Col :span="8" class="cut-one-co flex-content">
          <div class="cut-one-1">
            <span></span>
            <div class="cut-one-info">
              <p class="title"><span>机台名：</span>{{machineName}}</p>
              <SeamlessScroll ref="scroll" :class-option="classOption" :data="CUT_INFO"
                              class="wrap" :min-limit-move-num="4">
                <template v-for="item in CUT_INFO">
                  <p><span>{{item.managerPosition}}：</span>{{item.managerName}}</p>
                  <p><span>电话：</span>{{item.managerPhone}}</p>
                </template>
              </SeamlessScroll>
            </div>
          </div>
      </Col>
      <Col :span="8" class="cut-one-2">
        <div class="cut-one-img">
          <div class="cut-box-ui"></div>
        </div>
        <div class="cut-model">
          <div class="cut-title">{{title}}</div>
        </div>
      </Col>
      <Col :span="8" class="cut-one-co">
<!--        <div class="cut-one-co">-->
          <cut-stencil id="cut-opt" :options="img1Map" height="5.2rem" color-title="#072A6C" :title="mapTitle1"/>
<!--        </div>-->

      </Col >
      <Col :span="24">
        <cut-stencil id="cut-opt-map" :options="img2Map" :title="mapTitle2"/>
      </Col>
    </Row>
  </template>
</cut-heard>
</template>

<script>
import CutHeard from "./components/cut-heard.vue";
import {Col,Row} from 'ant-design-vue'
import CutStencil from "./components/cut-stencil.vue";
import {img1Map} from "../../../mock/mapDatas/facility.js";
import {useRoute,useRouter} from 'vue-router'
import SeamlessScroll from "../../components/ReSeamlessScroll/src";
import {ref, defineComponent, reactive, toRefs} from "vue";
import {postMachineFrequency, postMachineManager, postTimeVibrationRate} from "./httpAPI.js";
import {transformTimestamp} from "../../utils/common.js";
import {ctuMap, danCtuMap} from "../../utils/echartMap/cut-boards.js";


// const CUT_INFO =[
//   { dist:'生产负责人',name:'张三丰',iphone:12345678911},
//   { dist:'机台负责人',name:'张三',iphone:12345678911},
//   { dist:'机台负责人',name:'张四',iphone:12345678911},
//   { dist:'生产负责人',name:'张五',iphone:12345678911},
//   { dist:'机台负责人',name:'张六',iphone:12345678911},
// ]


function mapDeal(array,value){
  let item = {
    name:[],
    data:[]
  }
  for (let t of array){
    const time =  transformTimestamp(t.date)
    item.name.push(time)
    item.data.push(t[value])
  }
  return item
}

export default   defineComponent({
  name: "oneMachine",
  components: {SeamlessScroll, CutStencil, CutHeard,Col,Row},
  setup(){
    let classOption = ref({
      direction: "top"
    });
    const start = reactive({
      mapTitle1:'机台异常频率推移图',
      mapTitle2:'时间稼动率推移图',

      img1Map:{},
      img2Map:{},
      CUT_INFO:[],
      machineName: 'xxx机台'
    })

    const route = useRoute()
    const router = useRouter()
    const title = route.query.title
    const factory = route.query.factory || ''
    const line = route.query.line || ''
    start.machineName = route.query.machineName || ''
    const id = route.query.id? Number(route.query.id):null
    if(!id){
      router.go(-1)
      return
    }


    /**
     * 获取到 机台参数后， 请求机台信息
     * 图表信息
     * */
    function getCtuMain() {
      postMachineFrequency(id).then(item=>{
       const map1 = mapDeal(item,'codeCount')
        console.log(map1)
        start.img1Map = ctuMap(map1)
      })
      postTimeVibrationRate(id).then(item=>{
        const map2 = mapDeal(item,'timeVibrationRate')
        console.log(map2)
        start.img2Map = danCtuMap(map2)
      })

      postMachineManager(id).then(item=>{
        start.CUT_INFO = item.manager || []
      })

      setTimeout(()=>{
        getCtuMain()
      },1000*60*5)
    }

    getCtuMain()

    return{
      ...toRefs(start),
      // img1Map,
      title,
      classOption,
      factory,
      line
    }
  }
})


</script>

<style scoped lang="less">

@one-with: 6.187rem;
@one-height:6.2rem;

.flex-content{
  display: flex;
  justify-content: center;
  align-items: center;
}

.cut-one-1{
  height: 5.2rem;
  width: 80%;
  background: #053F93;
  color: #eff1f4;
  border-radius: 10px;
  position: relative;
  z-index: 3;
  .flex-content();
  .cut-one-info{
    width: 80%;
    .cut-one-info{
      height: 0.5rem;
    }
    .wrap{
      height: 4rem;
      overflow: hidden;
    }



  }
  >span{
    //background: #eff1f4;
    position: absolute;
    top: 45%;
    right: -60px;
    z-index: 1;
    // 三角形
    border-top: 20px solid transparent;
    border-left: 100px solid #053F93;
    border-bottom: 50px solid transparent;
    transform: rotate(40deg);
  }
  p{
    font-size: 20px;
    letter-spacing:2px; // 字体间距
    line-height: 2.5; // 字体行距
    span{
      font-weight: bold;
    }
  }
}


.cut-one-2{
  position: relative;
  .flex-content();
  width: 100%;
  box-sizing: border-box;
  //border: 1px solid red;
  .cut-one-img{
    border-radius: 60%;
    position: relative;
    background: url("./img/machine.png") no-repeat 100% 100%;
    z-index: 10;
    height: 373px;
    width: 373px;
    display: flex;
    justify-content: center;
    align-items: center;
    .free-ore-gear();
    //box-shadow: 0 0 30px 50px #053F93; // 轮廓闪光

    .cut-box-ui{
      position: absolute;
      border-radius: 50%;
      height: 373px;
      width: 373px;
      animation:cut-img-adi 3s infinite linear;
    }

  }
  .cut-model{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    //z-index: 4;
    //background: #eff1f4;
    border-radius: 50%;
    height: 373px;
    width: 373px;
    .flex-content();
    .cut-title{
      //position: absolute;
      //top: 50%;
      //left: 50%;
      //transform: translate(-50%, -50%);
      font-size: 30px;
      font-weight: bold;
      //animation: none;
      animation-play-state: paused;
      transform:none;
    }
  }
}

.cut-one-co{
  @one-height:6.2rem;
  padding: 80px 0;
  box-sizing: border-box;
}

@keyframes cut-img-adi {
  0%{
    //transform: rotate(0deg);
    box-shadow: none;
  }
  50%{
    //transform: rotate(360deg);
    box-shadow: 0 0 60px 30px rgba(1,128,229,.7) // 轮廓闪光
  }
  100%{
    box-shadow: none;
  }
}


</style>
