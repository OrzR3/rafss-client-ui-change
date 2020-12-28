<template>
  <div class="app-main">
    <router-view :key="key" />
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    key() {
      return this.$route.fullPath;
    }
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";

.app-main {
  background: url("../../../../src/assets/img/home/bg21.png");
  background-repeat: no-repeat;
  background-size: 100% 99.99%;
  min-height: calc(100vh - 132px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
@media only screen and (max-width: 1080px) {
  .app-main {
    height: calc(100vh - 56px);
  }
}
</style>
