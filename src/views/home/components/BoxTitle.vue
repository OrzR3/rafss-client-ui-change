<template>
  <div class="wrapper">
    <div class="box-title" :class="{ 'box-title-max': maxSize }">
      <div class="box-logo"></div>
      <div class="box-text" :class="{ 'hide-underline': hideUnderLine, 'box-text-max': maxSize }" v-html="title"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boxTitle",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    hideUnderLine:{
      type: Boolean,
      default: false,
    },
    maxSize:{
      type: Boolean,
      default: false,
    }
  },
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
}
.box-title {
  @include flex;
  justify-content: flex-start;
  height: 40px;
  margin: 0 20px;
  .box-logo {
    width: 3px;
    height: 50%;
    margin-right: 10px;
    border-left: 3px solid $blue;
  }
  .box-text {
    @include flex;
    width: 97%;
    height: 100%;
    justify-content: start;
    color: #000;
    font-size: 14px;
    border-bottom: 1px solid #d2d2d2;
  }
  .box-text-max{
    width: 100%;
  }
  .hide-underline{
    border-bottom: none;
  }
}
.box-title-max{
  margin: 0;
}
</style>
