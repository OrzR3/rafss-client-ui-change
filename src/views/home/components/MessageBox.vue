<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      v-if="visible"
      custom-class="custom"
      width="40%"
      :modal="false"
      :show-close="true"
    >
      <div class="dialog-content" id="dialog-content">
        <div
          class="dialog-content-item"
          v-for="(item, index) in list"
          :key="item.id"
        >
          <div v-if="item.urgeContent">
            <div align="center" style="padding: 15px 0">
              <el-tag type="info" size="mini">{{ item.createTime }}</el-tag>
            </div>
            <div v-if="item.type == '2'">
              <div class="flex-item item-left">
                <div class="left-chat-pop">
                  <img
                    src="~@/assets/img/home/steps/default-avatar.png"
                    alt=""
                  />
                </div>
                <div class="left-chat-pop">
                  <span style="line-height: 23px">
                    {{ item.urgeContent }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="item.type == '1'">
              <div class="flex-item item-right">
                <div
                  class="add-loading"
                  element-loading-spinner="el-icon-loading"
                  v-loading="addFlag"
                  v-if="addFlag && index == list.length - 1"
                ></div>
                <div class="right-chat-pop">
                  <span style="line-height: 23px">
                    {{ item.urgeContent }}
                  </span>
                </div>
                <div class="right-chat-pop">
                  <img :src="avatar" v-if="avatar" />
                  <img
                    src="~@/assets/img/home/header/default-avatar.png"
                    alt=""
                    v-if="!avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-box">
        <div style="margin: 20px 20px 10px 20px">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 3 }"
            placeholder=""
            v-model="textarea"
            resize="none"
            autofocus
            maxlength="500"
          >
          </el-input>
        </div>
        <div class="sendButton">
          <el-button size="medium" @click="visible = false">关闭</el-button>
          <el-button
            size="medium"
            type="primary"
            @click="addUrgeProcess"
            v-if="showSendBut"
          >
            发送
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MessageBox",
  components: {},
  props: {
    title: {
      type: String,
      default: "站内消息",
    },
    squareUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: false,
      showSendBut: false,
      input: "",
      textarea: "",
      reservationId: "",
      addFlag: false,
      list: [],
      url: {
        getUrgeContentList: "/homePage/getUrgeContentList",
        addUrgeProcess: "/homePage/addUrgeProcess",
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["avatar"]),
  },
  methods: {
    getUrgeContentList() {
      let params = {
        reservationId: this.reservationId,
      };
      this.$api.getAction(this.url.getUrgeContentList, params).then((res) => {
        if (res.success) {
          this.list = res.result;
          this.updated();
        }
        setTimeout(() => {
          this.addFlag = false;
        }, 500);
      });
    },
    addUrgeProcess() {
      if (!this.textarea) {
        this.$message.warning("不能发送空白消息！");
        return;
      }
      let params = {
        reservationId: this.reservationId,
        urgeContent: this.textarea,
      };
      let httpurl = this.url.addUrgeProcess;
      let formData = params;
      let method = "post";
      this.$api.httpActionByQuery(httpurl, formData, {}, method).then((res) => {
        if (res.success) {
          this.textarea = "";
          this.addFlag = true;
          this.getUrgeContentList();
        }
      });
    },
    updated() {
      this.$nextTick(function () {
        const div = document.getElementById("dialog-content");
        div.scrollTop = div.scrollHeight;
      });
    },
    show(id, blStatusType) {
      this.addFlag = false;
      this.list = [];
      this.textarea = "";
      this.reservationId = id;
      this.getUrgeContentList();
      this.visible = true;
      this.showSendBut =
        blStatusType != "4" && blStatusType != "9" ? true : false;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
$left-chat-popBg: #e3e3e3;
$left-chat-popText: #000;

$right-chat-popBg: #409eff;
$right-chat-popText: #fff;

.el-dialog__header {
  padding: 20px 20px 10px;
}
/deep/ .el-dialog__body {
  padding: 20px !important;
}

.add-loading {
  width: 10px;
  height: 48px;
  line-height: 48px;
  /deep/.el-loading-spinner {
    width: 10px;
    height: 48px;
    line-height: 48px;
    position: absolute;
    i {
    }
    .el-loading-text {
    }
  }
}

.left-chat-pop {
  margin-right: 5px;
}

.left-chat-pop > img,
.right-chat-pop > img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-top: 2px;
}

.left-chat-pop :hover {
  /* background-color: #fafafa; */
}

.left-chat-pop span {
  background-color: $left-chat-popBg;
  padding: 5px 8px;
  display: inline-block;
  border-radius: 10px;
  margin: 10px 0 10px 10px;
  position: relative;
  border: 1px solid $left-chat-popBg;
  max-width: 290px;
}

.left-chat-pop span::after {
  content: "";
  border: 8px solid #ffffff00;
  border-right: 8px solid $left-chat-popBg;
  position: absolute;
  top: 8px;
  left: -16px;
}

.right-chat-pop :hover {
  /* background-color: #2683f5; */
}

.right-chat-pop span {
  background-color: $right-chat-popBg;
  padding: 5px 8px;
  display: inline-block;
  border-radius: 10px;
  margin: 10px 15px 10px 10px;
  position: relative;
  border: 1px solid $right-chat-popBg;
  max-width: 290px;
  float: right;
  color: $right-chat-popText;
}

.right-chat-pop span::after {
  content: "";
  border: 8px solid #ffffff00;
  border-right: 8px solid $right-chat-popBg;
  position: absolute;
  top: 8px;
  right: -16px;
  transform: rotateY(180deg);
}

.custom {
  height: 500px;
  width: 500px;
}

.dialog-content {
  width: 100%;
  // height: 360px;
  height: 30vh;
  border: 1px solid #eee;
  display: block;
  margin-bottom: 20px;
  padding: 10px 0;
  overflow-y: auto;
}

.dialog-content-item {
  margin: 0 15px;
}

.flex-item {
  display: flex;
  align-items: flex-start;
  text-align: left;
  word-break: break-word;
}

.item-left {
  justify-content: flex-start;
}

.item-right {
  justify-content: flex-end;
}

.input-box {
  width: 100%;
  // height: 160px;
  background-color: #fff;
  border: 1px solid #eee;
  display: block;
  margin-right: -20px;
}

.sendButton {
  margin: 15px 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
