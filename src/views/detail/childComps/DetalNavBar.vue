<template>
  <div>
    <nav-bar class="white">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :class="{active: index===currenttIndex}"
          class="title-item"
          :key="index"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currenttIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    titleClick(index) {
      this.currenttIndex = index;
      console.log(this.currenttIndex);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.white{
  background: white;
}
.title {
  position: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
  margin: 10px;
  display: inline;
}
.active {
  color: #ff9aad;
}
.back img {
  margin-top: 12px;
}
</style>