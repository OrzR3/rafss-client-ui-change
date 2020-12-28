<template>
  <div class="layout-main">
    <home-header />
    <home-main />
    <home-footer />
  </div>
</template>

<script>
import { HomeHeader, HomeMain, HomeFooter } from "./components";
export default {
  name: "",
  components: {
    HomeHeader,
    HomeMain,
    HomeFooter,
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.layout-main {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: hidden;
}

@media (max-width: 1080px) {
  .app-main {
    width: 100%;
    height: 100%;
    position: fixed;
    background-position: bottom left;
    background-size: auto;
  }
}
</style>
