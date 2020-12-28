<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  padding: 0px;
  margin: 0px;
  /*  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border: hidden; */
}
/* 在默认情况下html和body标签的高度为auto，而浏览器是不会自动给标签添加高度的，
   所以html和body在这里设置为100%，否则在Elements中height仍然是0px. */
html,
body {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
.word-break{
  word-wrap: break-word;
  word-break: keep-all;
}
/*chrome滚动条颜色设置*/
/* css滚动条美化 webkit内核的浏览器滚动条 */
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e9e8e2;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #FFFFFF;
}
</style>
