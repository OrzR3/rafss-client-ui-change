<template>
  <div class="layout-login">
    <app-header />
    <app-main />
    <app-footer />
  </div>
</template>

<script>
import { AppHeader, AppMain, AppFooter } from "./components";
export default {
  name: "",
  components: {
    AppHeader,
    AppMain,
    AppFooter,
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
.layout-login {
 /*  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: hidden;
  overflow: hidden; */
  overflow: hidden;
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
