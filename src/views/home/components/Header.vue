<template>
  <div class="wrapper">
    <div class="header-div">
      <div class="header-left">
        <div class="header-logo">
          <img src="~@/assets/img/home/header/logo3.png" alt />
        </div>
        <div class="header-title">
          <!-- 档案预约 -->
          <img src="~@/assets/img/home/header/title.png" alt />
        </div>
        <nav-menu :navList="navList" v-if="showNavFlag && userRoleBing == '1'"></nav-menu>
      </div>
      <div class="header-right">
        <div class="user-avatar" @click="userClick">
          <!-- <img :src="baseURL + avatar" width="50" alt v-if="avatar"/> -->
          <img :src="avatar" width="50" alt v-if="avatar" />
          <img src="~@/assets/img/home/header/default-avatar.png" width="50" alt v-if="!avatar" />
        </div>
        <div class="welcome-text">欢迎 {{ $store.state.user.realname || $store.state.user.name }}</div>
        <div class="alert-logo hover-magnify pointer" @click="alertClick">
          <img src="~@/assets/img/home/header/alert.png" alt />
          <div class="alert-pointer" v-if="alertFlag"></div>
        </div>
        <div class="logout-logo hover-magnify pointer" @click="logout">
          <img src="~@/assets/img/home/header/logout.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PerfectInfo from "@/views/home/modules/PerfectInfo";
import NavMenu from "@/views/home/components/NavMenu";
export default {
  name: "HomeHeader",
  components: {
    NavMenu,
  },
  props: {},
  data() {
    return {
      navList: [
        {
          path: "/",
          name: "home",
          title: "首页",
        },
        /*  {
          path: 'booking-management',
          name: 'booking-management',
          title: '预约管理',
        } */
      ],
      alertFlag: false,
    };
  },
  watch: {},
  computed: {
    showNavFlag() {
      let name = this.$route.name;
      let flag = this.navList.find((item) => item.name == name);
      return flag;
    },
    userRoleBing() {
      return this.$store.state.user.roleBing;
    },
    ...mapGetters(["avatar"]),
    baseURL() {
      return window._CONFIG["BASE_API"];
    },
  },
  methods: {
    userClick() {
      /* xmp 设置的方法 */
      // this.$store.commit("SET_ROLE_BING", "1");
    },
    alertClick() {
      /* xmp 清除的方法 */
      // this.$store.commit("SET_ROLE_BING", "");
      // this.$store.commit("SET_APPLY_ROLE", "");
    },
    logout() {
      this.$confirm("您确定要退出吗？", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
          });
        })
        .catch(() => {});
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/variable.scss";
.wrapper {
  height: 100px;
  color: #000;
  border-bottom: 1px solid rgba(204, 204, 204, 1);
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
  width: 84%;
  margin: 0 auto;

  .header-left {
    .header-logo {
      width: 88px;
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
    & > div {
      margin: 0 10px;
      color: #9ba3b5;
    }
    .user-avatar {
      position: relative;
      // border: 2px solid #6F7BE7;
      border-radius: 100%;
      width: 44px;
      height: 44px;

      img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        margin: auto;
        border-radius: 100%;
      }
    }
    .alert-logo {
      position: relative;
      width: 28px;
      .alert-pointer {
        position: absolute;
        top: 0;
        right: 0;
        width: 9px;
        height: 9px;
        background: #e5b66f;
        border-radius: 50%;
      }
    }
    .welcome-text {
      font-size: 22px;
      min-width: 120px;
    }
    .logout-logo {
      width: 28px;
    }
  }
}
</style>
