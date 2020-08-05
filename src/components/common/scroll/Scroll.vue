<template>
  <!-- ref  可以这样拿this.$refs.wrapper，拿到的是唯一的 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //默认情况下BScroll是不可以实时监听滚动位置
    //probe侦测
    //0，1都是不侦测实时位置
    //2：在手指滚动的工程中侦测，手指离开后的惯性过程中不侦测
    //3:只要是滚动都侦测
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      click: true, //默认是阻止按钮监听的
      pullUpLoad: true,
    });

    //事件监听
    // this.scroll.on("scroll", (position) => {
    //   console.log(position);
    // });
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      //发送网络请求，请求更多数据

      //等数据请求完成，并且及那个新的数据展示出来后
      setTimeout(() => {
        this.scroll.finishPullUp();
      }, 2000);
    });
  },
};
</script>

<style scoped>
</style>