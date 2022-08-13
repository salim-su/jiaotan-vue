<template>
  <div class='login'>
    <div class='login-content'>
      <van-field type='number' v-model='phoneValue' placeholder='请输入手机号' class='mb25' clearable />
      <van-field
        v-model='captchaValue'
        type='number'
        center
        clearable
        placeholder='请输入验证码'
        class='mb40'
      >
        <template #button>
          <van-button class='btn' size='small' type='primary' :disabled='!flag' @click='start'>
            <template v-if='flag'>
              <span style='color: #000000'>获取验证码</span>
            </template>
            <template v-else>
              <van-count-down
                ref='countDown'
                millisecond
                :time='60000'
                :auto-start='false'
                format='ss秒'
                @finish='finish'
              />
            </template>
          </van-button>
        </template>
      </van-field>
      <van-button color='#FEDA2A' class='mt30 login-btn' block @click='login'>
        <span class='c000'>登 录</span>
      </van-button>


    </div>

    <div class='log-b'></div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { loginSystem, sendCode, getWX } from '../../api/user'

export default {
  name: 'login',
  data() {
    return {
      phoneValue: '',
      captchaValue: '',
      flag: true,
      openid: '',
      nickname: ''
    }
  },
  mounted() {
    // if (window.localStorage.getItem('token')) {
    //   this.$router.replace('/')
    // }
    // Toast('倒计时结束'
  },
  components: {
    [Toast.name]: Toast
  },
  methods: {

    start() {
      if (!this.phoneValue) {
        Toast('请输入手机号')
      } else {
        const ty = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
        if (!ty.test(this.phoneValue)) {
          Toast('手机号格式错误')
        } else {
          const postData = {
            phoneNumber: this.phoneValue
          }
          sendCode(postData).then(res => {
            this.flag = false
            Toast('发送验证码成功')
            setTimeout(res => {
              this.$refs.countDown.start()
            }, 300)
          }).catch(res => {
          })
        }
      }
    },
    finish() {
      this.flag = true
    },
    login() {
      if (!this.phoneValue) {
        Toast('请输入手机号')
        return
      }
      if (!this.captchaValue) {
        Toast('请输入验证码')
        return
      }
      const postdata = {
        phoneNumber: this.phoneValue,
        varCode: this.captchaValue
      }
      loginSystem(postdata).then(res => {
        // console.log(res)
        // Toast('登录成功')
        // this.$router.push('/')
        this.$router.replace('/safety-notify')
      }).catch(res => {
        Toast('验证码输入错误')
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.login {
  width: 375px;
  height: 100vh;
  background-image: url('../../../static/img/login-bg1.png');
  //background-size: cover;
  background-size: 100%;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  z-index: 999;
  left: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  /*background-color: #42b983;*/
}


.log-b {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 375px;
  height: 116px;
  background-image: url('../../../static/img/login-b.png');
  background-size: 100%;
  background-repeat: no-repeat;

}

.login-content {
  /*background-color: #ccc;*/
  /*width: 310px;*/
  height: 350px;
  margin-top: 155px;
  box-sizing: border-box;
  padding: 20px;
}

.btn {
  width: 100px !important;
  border-radius: 20px;
  background-color: #FEDA2A;
  border: none !important;
}

.van-cell.van-field {
  background-color: #EEEEEE;
  border-radius: 30px;
  padding-left: 20px !important;
  height: 50px !important;
}

.login-btn {
  border-radius: 30px;
}


.phone {
  font-size: 24px;
  color: #5626B8;
}

.van-field {
  padding-left: 0;
}

.spec-btn {
  width: 155px;
  height: 30px;
}

.van-cell::after {
  display: none;
}

.van-cell-group {
  /*border-bottom: 1px solid #e3e3e3;*/
  border: none !important;
}


</style>
