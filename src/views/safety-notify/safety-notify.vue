<template>
  <div class='content safety-notify'>

    <div class='xize'></div>

    <div class='line-bg'></div>

    <div class='k flex flex-column align-items-center'>
      <div class='k-bg'>
        <div class="inform-style" v-html="safetyInfo"></div>
      </div>

      <div class='k-top'>

      </div>
      <div class='k-center'>

      </div>
      <div class='k-bottom'>

      </div>
    </div>

    <div class='w pl25 pr25 pt20 pb30' style='background-color: #BEDDE0'>

      <van-checkbox icon-size='15px' v-model='readCheck'>我已阅读<span class='text'>以上告知，并已传达所有随行人员。</span></van-checkbox>

      <div class='line'></div>

      <van-button round block
                  class='button'
                  :disabled='buttonState'
                  color='linear-gradient(to bottom, #6FCAB3, #2085A8)'
                  @click='gotoExam()'>{{ buttonContent }}
      </van-button>
    </div>
  </div>
</template>

<script>
import { getSafetyNotice } from '../../api/user'
import { Toast } from 'vant'


export default {
  name: 'safety-notify',
  data() {
    return {
      buttonState: true,
      readCheck: false,
      buttonContent: '预约入场',
      safetyInfo: '',
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 34, 2, 1, 13, 5, 6, 7, 1, 1, 2, 3, 4, 5, 6, 7, 8, 34, 2, 1, 13, 5, 6, 7, 1, 1, 2, 3, 4, 5, 6, 7, 8, 34, 2, 1, 13, 5, 6, 7, 1, 1, 2, 3, 4, 5, 6, 7, 8, 34, 2, 1, 13, 5, 6, 7, 1]
    }
  },
  mounted() {
    console.log(this.apPersonId)
    /* 定位*/
    // const url = window.location.href.split('#')[0]
    // getWX(url).then(res => {
    //   console.log(res)
    //   this.$wx.config({
    //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: res.appId, // 必填，公众号的唯一标识
    //     timestamp: res.timestamp, // 必填，生成签名的时间戳
    //     nonceStr: res.nonceStr, // 必填，生成签名的随机串
    //     signature: res.signature, // 必填，签名
    //     jsApiList: [
    //       'getLocation',
    //       'openLocation'
    //     ] // 必填，需要使用的JS接口列表
    //   })
    // })
    getSafetyNotice().then(res => {
      this.safetyInfo = res?.data;
    })

    this.countDown = Number(10)
    this.countDownTimer()
  },
  destroyed() {
  },
  methods: {
    gotoExam() {
      if (!this.readCheck) {
        Toast.fail('请仔细阅读安全告知内容')
        return
      } else {
        console.log('跳转安全考试')
        this.$router.replace('/answer')
      }
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
          this.buttonContent = '预约入场 (' + String(this.countDown) + 's)'
          if (this.countDown === 0) {
            this.buttonContent = '预约入场'
            this.buttonState = false
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.inform-style{
  padding-left: 40px;
  padding-right: 40px;
}
.k {
  position: relative;
  z-index: 999;
  background-image: linear-gradient(#fff, #BEDDE0);

  .k-top {
    position: absolute;
    top: 0;
    width: 352px;
    height: 40px;
    background-image: url('../../../static/img/k-top.png');
    //background-size: contain;
    background-size: 100% 100%;
    z-index: -1;
  }

  .k-bottom {
    position: absolute;
    top: calc(100% - 90px);
    //left: 0;
    width: 352px;
    height: 90px;
    background-image: url('../../../static/img/k-bottom.png');
    //background-size: contain;
    background-size: 100% 100%;
    z-index: -1;

  }

  .k-center {
    position: absolute;
    top: 40px;
    //left: 0;
    width: 352px;
    height: calc(100% - 130px);
    //height: 300px;
    background-image: url('../../../static/img/k-center.png');
    //background-size: contain;
    background-size: 100% 100%;
    z-index: -1;


  }

  .k-bg {
    //height: 100%;
    //width: 100%;
    //position: absolute;
    //left: 0;
    //top: 0;
    padding-top: 30px;
    padding-bottom: 30px;
  }
}

.line-bg {
  height: 5px;
  background-color: #ffffff;
}

.text {
  font-weight: 500;
  color: #30819D;
}

.xize {
  width: 375px;
  height: 195px;
  background-image: url('../../../static/img/xize.png');
  background-size: cover;
}

.content {
  width: 375px;
  height: 100vh;

}

.line {
  height: 10px;
}

.notify-content {
  width: 352px;
  height: 494px;
  background-image: url('../../../static/img/notify-bg.png');
  background-size: cover;
  margin-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
  margin-left: 8px;
}

.baidumap {
  width: 100vw;
  height: 400px;
  //margin: 0 auto;
}

.amap-demo {
  height: 300px;
  width: 300px;
}

.span-title {
  color: #E96617;
  font-size: 14px;
}

.span-body {
  //color: #E96617;
  font-size: 14px;
  line-height: 20px;
}

.van-popup {
  border-radius: 10px !important;
}

.popup-body {
  width: 300px;
  height: 250px;
  background-color: #ffffff;

  .popup-title {
    height: 40px;
    width: 100%;
    background-color: #F0F6F4;
    line-height: 40px;
    color: #555;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
  }
}

.van-cell.van-field {
  background-color: #EEEEEE;
  padding-left: 20px !important;
  //height: 50px !important;
}

.navigation {
  border-radius: 15px !important;
}
</style>
