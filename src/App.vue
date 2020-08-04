<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar'

export default {
  name: "App",
  components: {
    MainTabBar
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
