<template>
   欢迎使用 vite-js 版本
  <a-back-top />
</template>
<script>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  computed,
} from 'vue'
import { UserOutlined, PoweroffOutlined, AppleOutlined, AndroidOutlined,HomeOutlined } from '@ant-design/icons-vue'

export default defineComponent({
	setup(props) {
		
	},
	components: {
		IconFont,
		JabilFooter,
		JabilCoard,
		PoweroffOutlined,
    HomeOutlined,
		UserOutlined,
		AppleOutlined,
		AndroidOutlined,
		Dropdown,
		AMenu: Menu,
		AMenuDivider: Menu.Divider,

	},
	created() {},
})
</script>
<style scoped lang="less">

</style>
