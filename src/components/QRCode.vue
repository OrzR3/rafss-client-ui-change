<template>
  <div class="QRCode" :style="{'width':width, 'height':height}">
    <canvas :id="canvasId" :style="{'width':width, 'height':height}"></canvas>
  </div>
</template>
<script>
import QRCode from 'qrcode'
export default {
  name: 'QRCode',
  props: {
    content: {
      type: String,
      default: '测试二维码'
    },
    width: {
      type: String,
      default: '100'
    },
    height: {
      type: String,
      default: '100'
    },
    codeName: {
      type: String,
      default: '二维码'
    },
    load: {
      type: Boolean,
      default: true
    },
    view: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      canvasId: ''
    }
  },
  computed: {},
  created() {
    this.canvasId = this.getUUID()
    this.$nextTick(() => {
      this.init()
    })
  },
  mounted: function() {},
  methods: {
    init() {
      let width = this.width,
        height = this.height
      QRCode.toCanvas(
        document.getElementById(this.canvasId),
        this.content,
        { width, height, toSJISFunc: QRCode.toSJIS },
        error => {}
      )
    },
    getUUID() {
      let d = new Date().getTime()
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16)
      })
      return uuid
    }
  },
  watch: {
    content(val) {
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
.QRCode {
  position: relative;
  overflow: hidden;
  .QQMode {
    position: absolute;
    left: 0;
    bottom: 100%;
    right: 0;
    height: 0;
    background-color: rgba(0, 0, 0, 0.45);
    transition: all 200ms ease-in-out;
    cursor: pointer;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    font-weight: bolder;
    box-sizing: border-box;
    padding: 5px;
  }
}
.QRCode:hover .QQMode {
  bottom: 0;
  height: 100%;
}
</style>
