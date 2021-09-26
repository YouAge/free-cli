<!--github： https://github.com/YouAge-->
<template>
  <a-popover v-model:visible="aot">
    <template #content>
      <p>菜单{{item}}</p>
    </template>
    <a-button>数据{{item}}</a-button>
  </a-popover>
</template>

<script>
import {toRefs,reactive} from "vue";

export default {
  name: "popover",
  props:{
    item:Number
  },
  setup(props){
    const t = reactive({
      aot:false
    })
    console.log(props.item)
    if([3,6,7,10].includes(props.item)){
      t.aot = true
    }
    return{
      ...toRefs(t)
    }
  }
}
</script>

<style scoped>

</style>
