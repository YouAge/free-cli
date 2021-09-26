<!--github： https://github.com/YouAge-->
<template>
<!--  可以通过再路由里面直接添加-->
  <header v-title data-title="CTU-机台菜单"/>
  <card title="机台看板选择">
    <a-spin tip="数据加载中..." :spinning="spinning">
    <Row :gutter="[10,28]">
      <Col :span="8">
        <div class="cut-title">
          <label>厂区：</label>
          <Select v-model:value="site" style="width: 100%" placeholder="选择厂区"
                  :options="siteList.map(pro => ({ value: pro }))">
          </Select>
        </div>
      </Col>

      <Col :span="8">
        <div class="cut-title">
          <label>专案：</label>
          <Select v-model:value="project" style="width: 100%" placeholder="选择厂别"
                  :options="projectList.map(pro => ({ value: pro }))">
          </Select>
        </div>
      </Col>
      <Col :span="8">
        <div class="cut-title">
          <label>厂别：</label>
          <Select v-model:value="factory" style="width: 100%" placeholder="选择专案"
                  :options="factoryList.map(pro => ({ value: pro }))">
          </Select>
        </div>
      </Col>

      <Col :span="8">
        <div class="cut-title">
          <label>线体：</label>
          <Select v-model:value="line" style="width: 100%" placeholder="选择线体"
                  :options="lineList.map(pro => ({ value: pro }))">
          </Select>
        </div>
      </Col>
      <Col :span="8">
        <div class="cut-title cut-button">
          <a-button type="primary" style="width: 3rem;" @click="skipMachine">查看</a-button>
        </div>
      </Col>
    </Row>
    </a-spin>
  </card>
</template>

<script>
import {defineComponent,reactive,toRefs,computed,watch} from "vue";
import {Row,Col,Card,Menu,Space,Select } from 'ant-design-vue'
import {getConfigHttp} from "./httpAPI.js";
import {Mart} from "../../utils/message.js";

export default defineComponent({
  name: "machineIndex",
  setup(){
    // document = 'CTU-机台看板选择'
    let state = reactive({
      //configData
      configData:[],
      site: null,
      project:null,
      factory:null,
      line:null,
      siteList: [],
      spinning:true
    });
    async function getConfig(){
      state.spinning = true
      const item = await getConfigHttp()
      console.log(item)
      state.configData = item
      state.siteList = Object.keys(item)
      state.spinning = false
    }

    getConfig()

    const projectList = computed(() => {
      state.project = null
      if(state.site){
        return Object.keys(state.configData[state.site])
      }
      return []
    });
    const factoryList = computed(() => {
      state.factory = null
      if(state.project){
        return Object.keys(state.configData[state.site][state.project])
      }
      return []
    });
    const lineList = computed(() => {
      state.line =null
      if(state.factory){
        return state.configData[state.site][state.project][state.factory]
      }
      return []
    });

    // watch(
    //     () => state.province,
    //     val => {
    //       state.secondCity = state.cityData[val][0];
    //     },
    // );


    /**
     * 跳转看板页面
     * */
    function skipMachine(){
      if(state.site && state.project && state.line && state.factory){
        window.open(`/facility?site=${state.site}&project=${state.project}&factory=${state.factory}&line=${state.line}`)
      }else {
        return Mart({title:'不能为空',content:'您有选择未选择，请选择完整'})
      }
    }

    return { ...toRefs(state),projectList,factoryList,lineList, skipMachine };
  },


  components:{
    Row,
    Col,
    Card,
    Menu,
    Space,
    Select
  }

})
</script>

<style scoped lang="less">
.cut-title{
  display: flex;
  align-items: center;
  flex-flow: wrap;
  >label{
    min-width: 60px;
    text-align: center;
  }
  >div{
    flex: 1;
  }
}

.cut-button{
  //align-items: flex-end;
  //text-align: right;
  justify-content: flex-end;
  //width: 800px;
  text-align: right;
}

</style>
