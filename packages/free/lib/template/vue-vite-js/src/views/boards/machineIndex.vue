<!--github： https://github.com/YouAge-->
<template>
  <div class="machine">
    <div class="machine-index">
      <div class="machine-menu">
        <Menu id="machine-menus" style="width: 3rem" v-model:selectedKeys="selectedKeys"
              mode="inline" theme="dark" @click="handleClick">
          <a-menu-item :key="`/cut-machine`" title="看板选择">看板选择</a-menu-item>
          <a-menu-item :key="`/machine-config`" title="看板配置">看板配置</a-menu-item>
<!--          <sub-menu key="sub2" >-->
<!--            <template #icon>-->
<!--              &lt;!&ndash;             <AppstoreOutlined />&ndash;&gt;-->
<!--            </template>-->
<!--            <template #title>Navigation Two</template>-->
<!--            <a-menu-item key="5">Option 5</a-menu-item>-->
<!--            <a-menu-item key="6">Option 6</a-menu-item>-->
<!--            <sub-menu key="sub3" title="Submenu">-->
<!--              <a-menu-item key="7">Option 7</a-menu-item>-->
<!--              <a-menu-item key="8">Option 8</a-menu-item>-->
<!--            </sub-menu>-->
<!--          </sub-menu>-->
        </Menu>
      </div>
      <div class="machine-contenter">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent,reactive,toRefs} from "vue";
import {Row,Col,Card,Menu } from 'ant-design-vue'
import {useRoute,useRouter} from 'vue-router'

export default defineComponent({
  name: "machineIndex",
  setup(){
    const  router = useRouter()
    const route = useRoute()

    const state = reactive({
      selectedKeys: [route.path]
    })

    const handleClick = function ({ item, key, keyPath }){
      router.push(key)
    }

    return{
      ...toRefs(state),
      handleClick
    }
  },


  components:{
    Row,
    Col,
    Card,
    Menu,
    SubMenu:Menu.SubMenu,
    MenuItem:Menu.Item
  }

})
</script>

<style scoped lang="less">


// 页面卡片
@base_min_width: 13rem;
@base_min_height: 6.5rem;

.machine{
  height: 100vh;
  width: 100%;
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

  display: flex;
  justify-content: center;
  align-items: center;

  .machine-index{
    //min-height: @base_min_height;
    //min-width:@base_min_width;
    background: #eff1f4;
    border-radius: 0.133rem;
    display: flex;
    //padding: 5px;
    overflow:hidden; // 方式子元素覆盖圆角
    #machine-menus{
      min-width: 2.667rem;
    }
    .machine-menu{
      min-width: 2.667rem;
      width: 3rem;
      height: @base_min_height;
      background: #001529;
      //overflow: auto;
    }
    .machine-contenter{
      align-self: flex-start;
      min-width: calc(@base_min_width - 2.667rem);
      width: 13rem;
      min-height: @base_min_height;
      background:  #eff1f4;
      padding: 0.2rem;
    }
  }
}
</style>
