<template>
  <div class='content'>

    <div class='scan-bg'>
      <van-nav-bar
        title='设备报修'
        style='background-color: transparent !important'
      />
      <div class='bt'>
        <div class='flex justify-content-center'>
          <div class='scan flex flex-column align-items-center justify-content-center' @click='gotest()'>
            <img src='../../../static/img/saoma.svg' alt=''>
            <h3 class='cfff'>扫描二维码</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceInfo, getWX } from 'api/user'

export default {
  name: 'scan',
  data() {
    return {
      qrcode: false,
      torchActive: false,
      camera: 'off',
      info: ''
    }
  },
  mounted() {
    /* 定位*/
    const url = window.location.href.split('#')[0]
    getWX(url).then(res => {
      console.log(res)
      // alert(JSON.stringify(res))
      this.$wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: [
          'scanQRCode'
        ] // 必填，需要使用的JS接口列表
      })
    })
  },
  methods: {
    onClickLeft() {
    },
    gotoSxsm() {
      this.$wx.ready(() => {
        this.$wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: res => {
            var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
            this.info = result
            deviceInfo(this.info).then(res => {
              this.$router.replace({ path: '/device-info', query: { deviceId: this.info } })
            })
          }
        })
      })
    },
    gotest() {
      this.$router.replace({ path: '/device-info', query: { deviceId: '1556460376757436418' } })
    }
  }

}
</script>

<style scoped lang='scss'>
.scan-bg {
  width: 100%;
  height: 668px;
  background-image: url('../../../static/img/scan-bg.png');
  background-size: cover;
  position: relative;

  .bt {
    height: 130px;
    width: 100%;
    position: absolute;
    bottom: 30px;
    left: 0;
    //background-color: #44A4AD;
  }
}

.content {
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  //background-color: red;
  //overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: auto;
}


.scan {
  background-image: url('../../../static/img/cir.svg');
  width: 122px;
  height: 122px;
  background-size: cover;
}
</style>
