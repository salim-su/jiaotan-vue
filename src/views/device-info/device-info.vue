<template>
  <div class='content device-info-content'>
    <van-nav-bar
      title='设备信息'
      left-arrow
      @click-left='onClickLeft'
      :fixed='true'
      style='background-color: #F6F6F6'
    />

    <div class='flex justify-content-center device-scan'>
      <!--      <img src='../../../static/img/qr-code.png' alt=''>-->
      <div class='scan-img'>

      </div>
    </div>

    <div class='device-info'>
      <van-cell-group>
        <van-cell>
          <template #title>
            <span class='custom-title'>设备编号:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info?.no?info?.no:'-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>设备名称:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info?.name?info?.name:'-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>主管部门:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info?.competentDeptName?info?.competentDeptName:'-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>品牌型号:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info?.brandModel?info?.brandModel:'-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>配置信息:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info?.config?info?.config:'-' }}</span>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <span class='custom-title'>所在位置:</span>
          </template>
          <template #default>
            <span class='custom-title'>{{ info?.location?info?.location:'-' }}</span>
          </template>
        </van-cell>

        <div class='pl50 pr50'>
          <van-button class='mt30 login-btn' color='linear-gradient(to bottom, #9e9be9, #7A76E4)'
                      round
                      block
                      @click='repairs'>
            <span class='cfff ls2'>报修</span>
          </van-button>
        </div>


      </van-cell-group>
    </div>


  </div>
</template>

<script>
import { deviceInfo } from 'api/user'

export default {
  name: 'device-info',
  data() {
    return {
      deviceId: '15564603767574364181',
      info: ''
    }
  },
  mounted() {
    if (this.$route.query.deviceId) {
      this.deviceId = this.$route.query.deviceId
      this.getDeviceInfo(this.deviceId)
    }
    console.log(this.deviceId)
  },
  methods: {
    getDeviceInfo(deviceId) {
      deviceInfo(deviceId).then(res => {
        console.log(res?.data)
        this.info = res?.data
      })
    },
    repairs() {
      this.$router.replace({ path: '/repairs', query: { deviceId: this.deviceId } })
    },
    onClickLeft() {
      this.$router.replace({ path: '/scan'})
    }
  }
}
</script>

<style scoped lang='scss'>
.content {
  padding: 20px;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: #F6F6F6;
  //padding-top: 50px;
  position: relative;
}

.scan-img {
  background-image: url('../../../static/img/qr-code.png');
  width: 130px;
  height: 130px;
  background-size: cover !important;
}

.van-cell-group {
  background-color: transparent !important;

  .van-cell {
    background-color: transparent !important;
  }
}

.device-scan {
  height: 35%;
  width: 100%;
  align-items: center;
}

.device-info {
  padding: 15px 10px 5px 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65%;
  background-color: #ffffff;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}
</style>
