<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-Swiper :banners="banners" @swiperImgLoad="swiperImgLoad" />
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!--native监听组件的原生事件-->
  </div>
</template>

<script>
//公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

//子组件
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeFeatureView from "./childComps/HomeFeatureView";

//数据
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听每张图片加载完成并刷新BScroll高度
    //因为异步的原因，使图片未渲染出来，上拉加载图片时会卡，在每张图片加载完成后刷新BScroll高度
    //调用防抖动
    const refresh = debounce(this.$refs.scroll.refresh, 50);

    //对监听事件进行保存
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    //取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    /*
      事件监听相关的方法
    */
    //判断流行，新款，精选
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.countIndex = index;
      this.$refs.tabControl2.countIndex = index;
    },
    //点击返回顶部
    backClick() {
      //拿到scroll对象，再拿到scroll属性找scrollTo方法
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500);

      //在组件中定义scrollTo方法，拿到scroll对象，找scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //判断页面滚动是否小于-1000
    contentScroll(position) {
      //1.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000;

      //2.决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    //上拉加载更多
    loadMore() {
      //调用获取商品数据的方法
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoad() {
      //获取tabControl的tabOffsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /*
      网络请求相关的方法
    */
    //请求轮播图和推荐的数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //请求流行，新款，精选的数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        //把请求的数据一个个放到goods[]里
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 可以多次上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh; /* 视口，整个看得见的屏幕大小 */
}
.home-nav {
  background: #ff9aad;
  color: white;
}
.tab-control {
  z-index: 9;
  position: relative;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>