<template>
  <div class="nav-menu" v-if="navList">
    <div v-for="(item, index) in navList" :key="index">
      <div class="nav-menu-list" :class="{'nav-menu-active': item.name == activeNav}" @click="clickNaMenu(item)">
        <div ></div>
        {{ item.title }}
        <div class="nav-menu-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"NavMenu",
  components:{},
  props:{
    navList:{
      type:Array,
      default: ()=>{
        return null
      }
    }
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{
    activeNav(){
      return this.$route.name
    }
  },
  methods:{
    clickNaMenu(item){
      this.$router.push(item.path);
    }
  },
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/variable.scss";
.nav-menu{

}
.nav-menu-list{
  @include flex;
  position: relative;
  min-width: 65px;
  height: 99px;
  padding: 0 30px;
  font-size:24px;
  font-weight:500;
  color: #9BA3B5;
  overflow: hidden;
  cursor: pointer;
  .nav-menu-bottom{
    width: 100%;
    height: 4px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}

.nav-menu-active{
  color: #2C62F2;
  font-weight: bolder;
  background: #F4F7FD;
  .nav-menu-bottom{
    background: #2F5CD4;
  }
}

</style>
