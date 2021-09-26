<template>
  <div class="top" >
    <div style="width: 3rem"  v-for="item in 20" :key="item">
      <popover :item="item"/>
    </div>

  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRaw ,toRefs} from 'vue';
import Popover from "./components/popover.vue";


export default defineComponent({
  name:'test',
  components: {Popover},
  setup() {
    const  state = reactive({
      aot: false
    })
   return {
     ...toRefs(state)
   }

  },
});
</script>

<style scoped lang="less">
.top{
  margin-top: 100px;
  display: flex;

  button{
    margin-left: 20px;
  }
}
</style>
