<template>
	<router-view />
</template>

<script>
import {defineComponent, provide, ref} from "vue";


export default defineComponent({
   setup(){
     // const isRouterAlive = ref(true)
     //  function reload(){
     //     isRouterAlive.value = false
     //
     //  }
     // provide('provide',reload)
     // return {
     //   isRouterAlive
     // }
   }
})
</script>
<style scoped lang="less">

</style>
