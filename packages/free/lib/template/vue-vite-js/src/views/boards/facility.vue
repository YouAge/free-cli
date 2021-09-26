<!--github： https://github.com/YouAge-->
<template>
  <header v-title :data-title="`CTU-${CTU_INFO.project}-${CTU_INFO.factory}-${CTU_INFO.line}`"/>
  <cut-heard :factory="CTU_INFO.factory" :line="CTU_INFO.line">
    <template #top>
      <div class="ort-sum-1">
        <div class="ort-sum-number1">192000</div>
        <div class="ort-sum-number2">192000</div>
        <div class="ort-sum-title">投入和产出</div>
      </div>
      <div class="ort-sum-2">
        <div class="ort-sum-number1">{{errorCtuBoxNumber}}</div>
        <div class="ort-sum-number2">{{cutBoxNumber}}</div>
        <div class="ort-sum-title">机台开机数量</div>
      </div>
    </template>
    <template #content>
      <Row :gutter="[10,10]" class="free-row">
        <Col :span="24">
          <div class="img1">
            <div class="box-left">
              <div class="img1-box">
                <icon-font type="icon-a-mapnavigationlocationnavigatearrows" class="img1-box-font0" color="#1BA3CE" size="20"/>
                <icon-font type="icon-a-mapnavigationlocationnavigatearrows" class="img1-box-font1" color="#1BA3CE" size="20"/>
                <icon-font type="icon-a-mapnavigationlocationnavigatearrows" class="img1-box-font2" color="#1BA3CE" size="20"/>
                <icon-font type="icon-a-mapnavigationlocationnavigatearrows" class="img1-box-font3" color="#1BA3CE" size="20"/>
                <icon-font type="icon-a-mapnavigationlocationnavigatearrows" class="img1-box-font4" color="#1BA3CE" size="20"/>
              </div>

              <template v-for="(boxs,index) in ctu_box">
                <div :class="`gear-${index+1}`">
                    <gear class="gear-item"  :title="title+item.machine_code" :cut-obj="item" :INFO="CTU_INFO"
                          v-for="item in boxs" :key="item.machine_code" :temp="item.code===3"/>
                </div>
              </template>
            </div>
            <div class="box-right">
            </div>
          </div>
        </Col>
        <Col :span="8" ><div class="img3">
          <div class="img3-title">{{MapTitle1}}</div>
          <div class="img3-content">
            <FEcharts :options="MapImg1" id="mapImg1"/>
          </div>
        </div></Col>
        <Col :span="8" >
          <div class="img3">
            <div class="img3-title">{{MapTitle2}}</div>
            <div class="img3-content">
              <FEcharts :options="MapImg2" id="mapImg2"/>
            </div>
          </div>
        </Col>
        <Col :span="8" ><div class="img3">
          <div class="img3-title">联系方式</div>
          <div class="img3-content img3-user">
            <Row :gutter="10">
              <Col :span="24">
                <div class="user-title-card">
                  <a-space :size="10">
                    <div class="user-card" v-for="item in userTable" @click="seleContact(item.id)"
                         :key="item.id" :class="phaseId===item.id?'user-card-img':''">{{ item.title}}</div>
                  </a-space>
                </div>
              </Col>
              <Col :span="10">
                <div class="user-content font-describe">
                  {{userInfo.content.describe}}
                </div>
              </Col>
              <Col :span="14">
                <SeamlessScroll ref="scroll" :data="userInfo.content.users"
                                :class-option="classOption" :min-limit-move-num="4"
                                class="wrap">
                  <!--                  <a-space direction="vertical" :size="15" >-->
                  <ort-user :name="item.name" :job="item.position"
                            :iphone="item.iphone" :key="item.userID" v-for="item in userInfo.content.users"/>
                  <!--                  </a-space>-->
                </SeamlessScroll>
              </Col>
            </Row>
          </div>
        </div></Col>
      </Row>
    </template>
  </cut-heard>
</template>

<script>
import {defineComponent, computed, reactive, toRefs, ref, unref, onMounted} from 'vue'
import {Row,Col} from "ant-design-vue";
import {RightOutlined} from '@ant-design/icons-vue'
import IconFont from "../../components/free-icon/src/IconFont";
import Gear from "../../components/free-gear/gear.vue";
import SvgIcon from "../../components/free-icon/src/SvgIcon.vue";
import FEcharts from '../../components/free-echarts'
import './less/index.less'
import OrtUser from "./components/ort-user.vue";
import SeamlessScroll from "../../components/ReSeamlessScroll/src";
import { templateRef } from "@vueuse/core";
import CutHeard from "./components/cut-heard.vue";
import {useRoute} from "vue-router";
import {getUserInfo, postCtuAnalysis, postMachineTop10} from "./httpAPI.js";
import {ctuMap} from "../../utils/echartMap/cut-boards.js";

/**
 * 机台个人分布计算 -2 /4  于数上下分  最多84个  最少38
 * */
function maimaiNumber(MACHINE=[]) {
  let cutList = []
  let surplus = null
  const mber = MACHINE.length
  if(mber> 84 || mber<10){
    throw new Error('机台个数已经超出限制，或者小于10太')
  }
  // 去中间的2台机台
 const  box3 = MACHINE.splice((mber/2)-1,2)
  const remainder  = (mber - 2) % 4
  if(remainder !== 0){
    surplus = MACHINE.splice(MACHINE.length-remainder,remainder)
  }
  const j = (mber - 2) /4
  // const f = (mber - 2) /j
  for(let i=0;i<4;i++){
    const o = MACHINE.splice(0,j)
    cutList.push(o)
  }
  if(surplus){
    for (let index in surplus){
      cutList[index].push(surplus[index])
    }
  }
  cutList.splice(2,0,box3)

  return cutList
}


function mapDateDeal(array){
  let t = {
    name:[],
    data:[]
  }
  for (let item of array){
    t.name.push('M'+item.machine_Code)
    t.data.push(item.codeCount)
  }
  return t
}


export default defineComponent({
  name: "facility",

  setup() {
    const route = useRoute()
    // 滚动 element 和 滚动方向
    const scroll = templateRef("scroll", null);
    let classOption = ref({
      direction: "top"
    });

    const state = reactive({
      title:'M',
      // 用户处理
      userTable:[],
       CTU_MACHINE:[], // 机台信息
       spinning:true,
        MapTitle1:'机台byIDL总时长top10',
        MapTitle2:'机台by异常发生频次op10',
       MapImg1:{},
       MapImg2:{},
        phaseId: 1, // 段id

       cutBoxNumber:0,
      errorCtuBoxNumber:0,
       // 机台
       ctu_box:[], // [[],[],[],[]] 5个  // 3中间的，只有2个

     })
    /**
     * 改变滚动数据
     * */
    async function seleContact(id){
      // 改变对应的数据
       state.phaseId = id
      await unref(scroll).reset(); // 重新运行, 必须要， 不然会出现数据还是原来的
    }

    const { site, project, factory, line} = route.query
    const CTU_INFO = { site, project, factory, line:line.split('_').pop()}

    /**
     * 数据请求， 定时回调
     * */
   async function getCtuConfig(time){
        postCtuAnalysis({site, project, factory, line}).then(item=>{
         state.CTU_MACHINE = [...item]
         state.cutBoxNumber = state.CTU_MACHINE.length
         state.errorCtuBoxNumber = state.CTU_MACHINE.filter(item=> item.code !== 1).length
         state.ctu_box  = maimaiNumber(item)
       })

      postMachineTop10({site, project, factory, line}).then((item)=>{
        // console.log('机台',item)
        const Top10ByError = item.Top10ByError || []
        const Top10ByIDL = item.Top10ByIDL || []
        const op1 = mapDateDeal(Top10ByError)
        const op2 = mapDateDeal(Top10ByIDL)
        state.MapImg1 = ctuMap(op1)
        state.MapImg2 = ctuMap(op2)

      })

    const item =  await getUserInfo()
      //数据处理
      let userinfo = []
      for (let t of item){
        let s = false
        for(let g of userinfo){
          if(g.id === t.phaseID){
            g.content.users.push(t)
            s = true
            break
          }
        }
        if(!s){
          userinfo.push({
            id:t.phaseID,
            title: t.phaseName,
            content:{
              describe: t.phaseDescribe,
              users:[t]
            },
          })
        }
      }
      state.userTable = userinfo
      await unref(scroll).reset();
      setTimeout(function (){
        getCtuConfig(time)
      },time*1000)
   }

   const userInfo= computed(()=>state.userTable.find(item=>item.id ===state.phaseId) ||
    {id:1, title:'',content:{describe:'', users:[]}}
   )
    getCtuConfig(15) // 定时15秒 请求一次
    return {
      ...toRefs(state),
      classOption,
      seleContact,
      userInfo,
      CTU_INFO,
    }
  },
  components:{
    CutHeard,
    SeamlessScroll,
    OrtUser,
    SvgIcon,
    IconFont,
    Gear,
    RightOutlined,
    Row,
    Col,
    FEcharts
  },
})
</script>

<style scoped  lang='less'>
//@import "./less/index";
</style>
