<template>
  <div class="wrapper">
    <div class="info">
      <div class="info-content" v-if="tableList && tableList.length > 0">
        <table
          width="100%"
          class="info-table"
          style="border-collapse:separate; border-spacing:0px 10px;"
        >
          <tr v-for="(items, idx) in tableList" :key="idx">
            <td v-for="(item, index) in items" :key="index">
              <div :class="[index % 2 == 0?'right':'left']">{{ item }}</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "basicTable",
  components: {},
  props: {
    tableList: {
      type: Array,
      default: () => {
        return null;
      },
    },
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
.wrapper {
}

.info {
  margin: 30px auto 20px;
  padding: 10px 20px;
  color: #000;
  font-size: 14px;
}

.info-content{
  // @include flex;
}

.info-table {
  .right {
    text-align: right;
  }

  .left {
    text-align: left;
  }
}
</style>
