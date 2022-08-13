<template>
  <div class='content'>
    <div class='audit-bg'>
      <div class='info tc pt40'>
        <div class='fs18 cfff pb20 ls2' v-bind:class='status=="YES"?"sususu fs22 fw":""'>
          {{ appointmentStatus }}
        </div>
        <div class='qr-bg'>
          <div class='qr'>
            <div class='qrcode' ref='qrCodeUrl'></div>
          </div>
          <div class='p-info w fs16'>
            <!--            <span>生产业务部</span>-->
            <span>{{ info.auditDeptName }}</span>
            <span>{{ info.auditUserName }}</span>
            <span>{{ info.auditUserPhone }}</span>
          </div>
        </div>
        <!--        <div class='fs14 mb5 pt20'>-->
        <!--          <span>搜索码 ：</span>-->
        <!--          <span>1666</span>-->
        <!--        </div>-->
        <!--        <div class='fs14 mb5 pt20'>-->
        <!--          <span>预约单位名称 ：</span>-->
        <!--          <span>{{ ap.apEnt }}</span>-->
        <!--        </div>-->

        <div class='fs14 mt10' v-if='time!=="-"'>
          <span>有效期 ：</span>
          <span>{{ time }}</span>
        </div>

        <div class='w pl50 pr50 mt20'>
          <van-button round block
                      class='button'
                      color='linear-gradient(to bottom, #6FCAB3, #2085A8)'
                      @click='reset()'>重新预约
          </van-button>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import { apStatusByOpenId } from 'api/user'

export default {
  name: 'audit',
  data() {
    return {
      apPersonId: '',
      info: '',
      status: '',
      appointmentStatus: '',
      person: '',
      ap: '',
      time: '-'
    }
  },
  methods: {
    reset() {
      this.$apPersonId.setApPersonId(this.apPersonId)
      console.log(this.apPersonId)
      console.log(this.$apPersonId.apPersonId)
      this.$router.replace({ path: '/safety-notify', query: { apPersonId: this.info?.apPersonId } })
    },
    creatQrCode(qrApPersonId) {
      // eslint-disable-next-line no-unused-vars
      const qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: qrApPersonId,
        width: 130,
        height: 130
        // colorDark: '#000000',
        // colorLight: '#ffffff',
        // correctLevel: QRCode.CorrectLevel.H
      })
    }
  },
  mounted() {
    if (this.$route.query.apPersonId) {
      this.apPersonId = this.$route.query.apPersonId
    }
    console.log(this.apPersonId)
    console.log(this.$apPersonId.apPersonId)

    // this.status = this.$appointmentStatus.appointmentStatus
    // console.log(this.apPersonId)
    // console.log(this.status)


    apStatusByOpenId(this.$openId.openId).then(res => {
      console.log(res)
      this.status = res?.data?.status
      this.info = res?.data
      if (this.status === 'AUDIT') {
        this.appointmentStatus = '等待审核中...'
      } else if (this.status === 'YES') {
        this.appointmentStatus = '审核通过'
      } else if (this.status === 'OVERDUE') {
        this.appointmentStatus = '预约过期'
      } else if (this.status === 'PER') {
        this.appointmentStatus = '未到开始时间'
      } else if (this.status === 'REJECT') {
        this.appointmentStatus = '预约被驳回'
      }
      if (this.info.type === 'LONG') {
        this.time = '长期'
      } else if (this.info.type === 'SHORT') {
        this.time = this.$moment(this.info.apTimeIn).format('YYYY-MM-DD')
      }
      this.creatQrCode(this.info?.apPersonId)
    })

    // preloadApByApPersonId(this.apPersonId).then(res => {
    //   this.info = res?.data
    //   this.person = this.info.person
    //   this.ap = this.info.ap
    //   console.log(this.ap)
    //   console.log(this.person)
    //   this.creatQrCode(this.apPersonId)
    // })

  }
}
</script>

<style scoped lang='scss'>
.audit-bg {
  width: 100%;
  height: 348px;
  background-image: url('../../../static/img/audit-bg.png');
  background-size: cover;
}

.qr-bg {
  width: 336px;
  height: 322px;
  background-image: url('../../../static/img/qr-bg.png');
  background-size: cover;
  margin: 0 auto;
  padding-top: 40px;
}

.qr {
  width: 160px;
  height: 160px;
  //border: 1px solid #000000;
  margin: 0px auto 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-info {
  height: 80px;
  line-height: 80px;
  color: #488B9B;
  display: flex;
  justify-content: space-evenly;
}

.sususu {
  color: darkgreen !important;
}
</style>
