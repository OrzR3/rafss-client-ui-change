<template>
  <div class="home-wrapper">
    <select-role v-if="userRoleBing !='1'"></select-role>
    <home-page v-if="userRoleBing == '1'"></home-page>
  </div>
</template>

<script>
import SelectRole from "@/views/home/SelectRole";
import HomePage from '@/views/home/HomePage'
export default {
  name: "home",
  components: {
    SelectRole,
    HomePage,
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    userRoleBing() {
      return this.$store.state.user.roleBing;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped>
.home-wrapper {
  width: 100%;
}
</style>
