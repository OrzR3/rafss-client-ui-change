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
  background: url("../../../../src/assets/img/login/bg11.png");
  background-repeat: no-repeat;
  background-size: 100% 99.99%;
  min-height: calc(100vh - 285px);
  width: 100%;
  position: relative;
  overflow: hidden;
  @include flex
}
</style>
