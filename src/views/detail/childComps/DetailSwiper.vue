<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) in topImgs" :key="index">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  data() {
    return {};
  },
  props: {
    topImgs: {
      type: Array,
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
  margin-top: 44px;
}
</style>