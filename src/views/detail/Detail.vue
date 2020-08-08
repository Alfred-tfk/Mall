<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-imgs="topImgs" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommendList" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetalNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { debounce } from "common/utils";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImgs: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      hemeTopYs: [],
      currentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;

    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      //1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImgs = data.itemInfo.topImages;

      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.取出评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      //7.请求推荐数据
      getRecommend().then((res, error) => {
        if (error) return;
        this.recommendList = res.data.list;
      });
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
  },
  destroyed() {
    //取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  background: white;
}
.content {
  height: calc(100% - 44px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>