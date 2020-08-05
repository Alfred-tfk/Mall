<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="item.id"
      :class="{active:index===countIndex}"
      class="tab-control-item"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      countIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.countIndex = index;
      this.$emit("tabClick", index);
    },
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background: white;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: #ff9aad;
}
.active span {
  border-bottom: 3px solid #ff9aad;
  padding: 5px;
}
</style>