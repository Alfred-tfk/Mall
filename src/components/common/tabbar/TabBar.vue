<!--  -->
<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style lang='css' scoped>
#tab-bar {
  display: flex;
  background-color: #f9f9f9;
  height: 49px;
  /* opacity: 0.6; */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8;
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.3);
}

</style>