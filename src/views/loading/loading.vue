<template>
  <div>
    <!--    <h1>加载中。。。</h1>-->
    <!--    <h1>加载中。。。</h1>-->
    <!--    <h1>{{ status }}</h1>-->
  </div>
</template>

<script>
import { apStatusByOpenId } from 'api/user'
export default {
  name: 'loading',
  data() {
    return {
      status: '',
      apPersonId: '',
      setAppointmentId(appointmentId) {
        this.appointmentId = appointmentId
      },
      setOpenId(openId) {
        this.openId = openId
      },
      setAppointmentStatus(appointmentStatus) {
        this.appointmentStatus = appointmentStatus
      },
      setApPersonId(apPersonId) {
        this.apPersonId = apPersonId
      }
    }
  },
  mounted() {
    if (this.$route.query.openId) {
      this.$openId.setOpenId(this.$route.query.openId)
    } else {
      this.$openId.setOpenId('998')
    }
    apStatusByOpenId(this.$openId.openId).then(res => {
      this.status = res?.data?.status
      this.apPersonId = res?.data?.apPersonId
      this.$appointmentStatus.setAppointmentStatus(this.status)
      this.$apPersonId.setApPersonId(this.apPersonId)
      if (this.status === 'NOTHING') {
        this.$router.replace('/safety-notify')
      } else {
        this.apPersonId = res?.data?.apPersonId
        this.$router.replace({ path: '/audit', query: { apPersonId: res?.data?.apPersonId } })
      }
    })

    // navigationByOpenId(this.$openId.openId).then(res => {
    //   this.status = res?.data?.status
    //   if (this.status === 'APPROVED') {
    //     this.$router.replace({ path: '/navigation', query: { licenseNumber: res?.data?.licenseNumber } })
    //   } else if (this.status === 'IN_APPLICATION') {
    //     this.$appointmentId.setAppointmentId(res?.data?.appointmentId)
    //     this.$router.replace('/result')
    //   } else {
    //     this.$router.replace('/safety-notify-order')
    //   }
    // })


    // this.$openId = this.$route.query.openId
    // console.log(this.$openId)
  }
}
</script>

<style scoped>

</style>
