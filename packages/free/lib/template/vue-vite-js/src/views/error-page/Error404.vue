<!--github： https://github.com/YouAge-->
<template>
  <div class="error-content">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <a type="primary" href="/">回到首页</a>
      </template>
    </a-result>
  </div>
</template>

<script lang='ts'>
import {defineComponent, computed} from 'vue'

export default defineComponent({
  name: "Error404",
  setup() {

  }
})
</script>

<style scoped lang='less'>

</style>
