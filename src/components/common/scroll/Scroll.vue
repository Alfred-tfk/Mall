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
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
  mounted() {
    //默认情况下BScroll是不可以实时监听滚动位置
    //probe侦测
    //0，1都是不侦测实时位置
    //2：在手指滚动的工程中侦测，手指离开后的惯性过程中不侦测
    //3:只要是滚动都侦测

    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true, //默认是阻止div点击的，按钮可以
      pullUpLoad: this.pullUpLoad,
    });

    //2.监听滚动区域的位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    //3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
};
</script>

<style scoped>
</style>