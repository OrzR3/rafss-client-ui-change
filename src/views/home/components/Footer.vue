<template>
  <div class="login-bottom">
    <!--<div class="logo">-->
      <!--<img src="~@/assets/img/login/small-logo.png" alt />-->
    <!--</div>-->
    <div class="text">Copyright © {{ new Date().getFullYear() }}  档案远程预约利用服务平台</div>
    <!--  -->
  </div>
</template>

<script>
export default {
  name: "BotView",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
.login-bottom {
  @include flex;
  width: 100%;
  height: 30px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  background: #A1A9B9;
  .logo {
    width: 17px;
    height: 20px;
    margin-right: 10px;
  }
}
</style>
