<template>
  <div class="advanced-steps">
    <div v-for="(item, index) in list" :key="index" class="steps-item">
      <div class="steps-main">
        <div class="steps-slide" :class="{ 'steps-one-slide': list.length == 1}">
          <div class="steps-logo" v-if="index < active">
            <img src="~@/assets/img/home/steps/finish-logo.png" />
          </div>
          <div class="steps-logo" v-if="index == active">
            <img src="~@/assets/img/home/steps/process-logo.png" />
          </div>
          <div class="steps-logo" v-if="index > active">
            <div class="steps-logo-text">{{ list.length -  index }}</div>
          </div>
          <div
            class="steps-line"
            :class="{ 'steps-line-grey': index >= active }"
            v-if="index < list.length - 1"
          ></div>
        </div>
        <div class="steps-info">
          <div class="steps-content">
            <div class="logo">
              <img src="~@/assets/img/home/steps/default-avatar.png" />
            </div>
            <div class="content-text">
              <div class="title">{{ item.title }}</div>
              <div class="time">{{ item.time }}</div>
            </div>
          </div>
          <div class="steps-status" :class="{ 'orange-text': item.state == 0}">
            <div>{{ item.statusText }}</div>
          </div>
        </div>
        <div
          class="steps-remarks steps-remarks-bg"
        >
          <!-- :class="{ 'steps-remarks-bg': item.remarks }" -->
          <div>{{ item.remarks }}</div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    active: {
      type: Number,
      default: 0,
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
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/variable.scss";

.advanced-steps {
  margin-top: 20px;
  margin-left: 15px;
  padding: 0 15px;
  .steps-item {
    @include flex;
    align-items: flex-start;
    vertical-align: top;
    margin-bottom: 5px;
    .steps-main {
      position: relative;
      width: 100%;
      overflow: hidden;
      .steps-slide {
        position: absolute;
        width: 28px;
        height: 100%;
        margin-top: 2px;
        & > div {
          margin: 0 auto;
        }
        .steps-logo {
          width: 28px;
          height: 28px;
          .steps-logo-text {
            width: 28px;
            height: 28px;
            line-height: 28px;
            background: #dddddd;
            border: 1px solid #dddddd;
            border-radius: 50%;
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .steps-line {
          width: 2px;
          min-height: 140px;
          height: 100%;
          background: #2c62f2;
          margin-top: 6px;
        }
        .steps-line-grey {
          background: #dddddd;
        }
      }
      .steps-one-slide{
        margin-top: 12px;
      }
      .steps-info {
        @include flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 87%;
        position: relative;
        float: right;
        .steps-content {
          @include flex;
          .logo {
            width: 48px;
            height: 48px;
          }
          .content-text {
            text-align: left;
            margin-left: 12px;
            .title {
              height: 25px;
              line-height: 25px;
              font-size: 16px;
              font-weight: 500;
              color: #3c3c3c;
            }
            .time {
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              font-weight: 400;
              color: #aaaaaa;
              white-space: nowrap;
            }
          }
        }
        .steps-status {
          height: 55px;
          line-height: 55px;
          font-size: 16px;
          font-weight: 500;
          color: #2c62f2;
          padding-right: 22px;
          white-space: nowrap;
        }
        .orange-text {
          color: #da9328 !important;
        }
      }
      .steps-remarks {
        clear: both;
        width: 75%;
        min-height: 70px;
        font-size: 14px;
        font-weight: 400;
        color: #3c3c3c;
        line-height: 20px;
        border-radius: 8px;
        margin: 0 auto;
        margin-left: 14%;
        padding: 10px;
        text-align: left;
      }
      .steps-remarks-bg {
        background: #f6f6f6;
      }
    }
  }
}

@media only screen and (max-width: 1500px) {
  .advanced-steps {
    margin-left: 0 !important;
  }
  .content-text {
    margin-left: 0 !important;
  }
  .steps-status {
    font-size: 14px !important;
  }
}
</style>
