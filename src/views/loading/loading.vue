<template>
  <div>
    <!--    <h1>加载中。。。</h1>-->
    <!--    <h1>加载中。。。</h1>-->
    <!--    <h1>{{ status }}</h1>-->
  </div>
</template>

<script>
export default {
  name: 'loading',
  data() {
    return {
      status: '',
      apPersonId: '',
      setOpenId(openId) {
        this.openId = openId
      }
    }
  },
  mounted() {
    if (this.$route.query.openId) {
      this.$openId.setOpenId(this.$route.query.openId)
    } else {
      this.$openId.setOpenId('998')
    }
    this.$router.replace('/scan')
  }
}
</script>

<style scoped>

</style>
