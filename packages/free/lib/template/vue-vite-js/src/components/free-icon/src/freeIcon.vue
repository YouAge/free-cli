<!--github： https://github.com/YouAge-->
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script>
export default {
  name: 'FreeIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
