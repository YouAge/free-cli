<!--github： https://github.com/YouAge-->
<template>
  <div id="app">
    {{title}}
    <div class="img">
<!--      <img src="@/assets/imgs/logo.png" />-->
<!--      <img :src="body" />-->
    </div>
<!--    <span class="img"></span>-->
  </div>
</template>

<script>
import {defineComponent, computed,toRefs,reactive} from 'vue'
import body from '@/assets/imgs/logo.png'
export default defineComponent({
  name: "App",
  setup() {
     const state = reactive({
       title:'vue3'
     })
    return {
       ...toRefs(state),
      body,
    }
  }
})
</script>

<style scoped lang='less'>
@import "./style/index";
</style>
