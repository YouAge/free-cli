<!--github： https://github.com/YouAge-->
<template>
  <div class="copyright">{{title}}</div>
</template>

<script>
import {defineComponent, computed} from 'vue'

export default defineComponent({
  name: "freeFooter",
  props:{
    title:{
      type:String,
      default:'vue3-vite-js 版本'
    }
  },
})
</script>

<style scoped lang='less'>
.copyright{
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
  border-top: 1px solid #c3c3c3;
  background: #cdd1d8;
}
</style>
