<template>
  <div class="wrapper">
    <div class="header-div">
      <div class="header-left">
        <div class="header-logo">
          <img src="~@/assets/img/home/header/hngy.png" alt />
        </div>
        <div class="header-title">
          <!-- 档案预约 -->
          <img src="~@/assets/img/home/header/title.png" alt />
        </div>
      </div>
      <div class="header-right"></div>
    </div>
  </div>
</template>

<script>
import PerfectInfo from "@/views/home/modules/PerfectInfo";
import NavMenu from "@/views/home/components/NavMenu";
export default {
  name: "LoginHeader",
  components: {
    NavMenu,
  },
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
@import "@/assets/scss/variable.scss";

.wrapper {
  height: 81px;
  color: #000;
  border: 1px solid rgba(204, 204, 204, 1);
  box-shadow: 0px 0px 10px 0px rgba(0, 13, 57, 0.1);
}

div {
  @include flex;
}

img {
  width: 100%;
}

.header-div {
  @include flex;
  justify-content: space-between;
  width: 78%;
  margin: 0 auto;
  .header-left {
    .header-logo {
      width: 80px;
      height: 80px;
    }
    .division-line {
      width: 1px;
      height: 40px;
      color: #fff;
      border-left: 2px solid #fff;
    }
    .header-title {
      color: #000;
      font-size: 20px;
      width: 300px;
      height: 22px;
      margin-left: 10px;
      margin-right: 70px;
    }
  }
  .header-right {
  }
}
</style>
