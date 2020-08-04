<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-Swiper :banners="banners"></home-Swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then((res) => {
      console.log(res)
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style scoped>
.home-nav {
  background: #ff9aad;
  color: white;
}
</style>