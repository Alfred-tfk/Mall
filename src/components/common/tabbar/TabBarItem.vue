<template>
  <div class="tab-bar-item" @click="itemClick">
    <div :class="{active: isActive}">
      <slot v-if="isActive" name="item-icon"></slot>
      <slot v-else name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#666666",
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path);
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  data() {
    return {};
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style lang='css' scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #ff9aad;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  line-height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>