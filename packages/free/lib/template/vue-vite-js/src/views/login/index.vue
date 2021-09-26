<template>
  <div class="jp-table">
    <div class="dynamic-area2"></div>
    <div class="jp-tablecell">
<!--      <div class="loginbox">-->
        <div class="login-tit">
          <h1><img src="@/assets/img/home/48.png" alt="" /></h1>

          <Row :gutter="16">
            <Col :span="6">  <a-divider style="background-color: #D4DBE1" /></Col>
            <Col :span="12" class="text-center">登录中心</Col>
            <Col :span="6"><a-divider style="background-color: #D4DBE1" /></Col>
          </Row>
        </div>
        <div class="vite-login">
          <a-form :model="formState" :rules="rules" ref="formRef" hideRequiredMark>
            <a-form-item name="userId">
              <a-input placeholder="请输入账号名" v-model:value="formState.userId" allowClear>
                <template #prefix>
                  <user-outlined type="user" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="passWord">
              <a-input-password  placeholder="请输入密码" v-model:value="formState.passWord" allowClear>
                <template #prefix>
                  <WindowsOutlined type="user" />
                </template>
              </a-input-password >
            </a-form-item>
          </a-form>
          <a-button  class="login-button"  type="primary" @click="onSubmit">登入</a-button>
          <div class="tourist">
            <router-link  to="/">访客模式 </router-link>
          </div>
        </div>

<!--      </div>-->
    </div>
    <div class="copyright text-effect">
      <span>vue</span>
      <span>-</span>
      <span>vite</span>
      <span>-</span>
      <span>js</span>
      <span>前</span>
      <span>端</span>
      <span>开</span>
      <span>发</span>
      <span>模</span>
      <span>板</span>
    </div>
  </div>
</template>

<script>
import {Row,Col,message} from 'ant-design-vue'
import {defineComponent, reactive, ref,watch} from "vue";
import {UserOutlined,WindowsOutlined}  from '@ant-design/icons-vue';
import {useRoute, useRouter} from 'vue-router'
import {useUserStore} from '../../store/modules/user.js'


export default defineComponent({
  components:{Row,Col,UserOutlined,WindowsOutlined},
  setup(){
    const rules = {
      userId:{required:true,message:'账号不能为空',trigger:'blur'},
      passWord:{required:true,message:'密码不能为空',trigger:'blur'},
    }
    const userStore = useUserStore()
    const router = useRouter()
    const route = useRoute(); // 路由
    const formRef = ref()
    const formState  = reactive({
      userId : '',
      passWord : ''
    })
    let redirect = ref()

    /** 监听路由*/
    watch(()=>route.fullPath,value => {
      redirect.value = route.query && route.query.redirect
    }, { immediate: true })

    const onSubmit = async ()=>{
      const status = await formRef.value.validate()
      // status.userId = Number(status.userId)
      // 请求登入
       userStore.Login(status).then(e=>{
        router.push({ path: redirect.value || '/' }).then(()=>{
          message.success('登入成功，欢迎回来');
        })
      })

    }
    return {
      formRef,
      formState, //...toRefs(state),
      rules,
      onSubmit
    }
  }
})

</script>

<style lang="less" scoped>
.jp-table{
  height: 100%;
  width: 100%;
  background: url("@/assets/img/home/bg.jpg") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.jp-tablecell{
  position: relative;
  width: 500px;
  background:rgba(255, 255, 255, 0.7);
  margin: 0 auto;
  border-radius: 5px;
  padding: 30px 50px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  z-index: 100;
  .login-tit{
    text-align: center;
    h1{

      margin: 10px 0 50px 0;
    }
    .ant-divider-horizontal{
      margin: 10px;
    }
    .text-center{
      text-align: center;
      line-height: 20px;
    }
  }


  .jabil-login{
    display: flex;
    flex-direction: column;
    .login-button,
    .ant-input-affix-wrapper{
      margin-top: 30px;
    }

    .ant-form-item{
      margin-bottom:0
    }
    .login-button{
      font-weight: bold;
    }
    .tourist{
      margin-top: 15px;
      text-align: center;
      font-size: 14px;
      color: #9E9EA0;
    }
  }
}


/** 动画*/
.dynamic-area2 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url("@/assets/img/home/poster-drop-animate2.png") repeat-x 0px 0px;
  background-size: cover;
  animation: posterDrop2 3000s linear infinite;
  opacity: 0.4;
  z-index: 2;
}
@keyframes posterDrop2 {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 30000% 0;
  }
}


.copyright {
  font-size: 18px;
  color: #666;
  position: absolute;
  bottom: 2px;
  left: 0;
  text-align: center;
  width: 100%;
  height: 30px;
}

/* copyright */
.text-effect {
  color: #fff;
  font-size: 0.24rem;
  font-weight: 600;
  text-align: center;
}
.text-effect span {
  animation: animate linear 2000ms infinite;
}
.text-effect span:nth-child(1n) {
  animation-delay: 0s;
}
.text-effect span:nth-child(2n) {
  animation-delay: 100ms;
}
.text-effect span:nth-child(3n) {
  animation-delay: 200ms;
}
.text-effect span:nth-child(4n) {
  animation-delay: 300ms;
}
.text-effect span:nth-child(5n) {
  animation-delay: 400ms;
}
.text-effect span:nth-child(6n) {
  animation-delay: 500ms;
}
.text-effect span:nth-child(7n) {
  animation-delay: 600ms;
}
.text-effect span:nth-child(8n) {
  animation-delay: 700ms;
}
.text-effect span:nth-child(9n) {
  animation-delay: 800ms;
}
.text-effect span:nth-child(10n) {
  animation-delay: 900ms;
}
@keyframes animate {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
    text-shadow: 0 0 80px #6472bb, 0 0 30px #6472bb, 0 0 6px #6472bb;
  }
}




</style>
