<template>
<div id="app">
  <div class="echartContainer">
    <router-view />
  </div>
</div>
</template>
<script>
export default {

  components: {

  }
};
</script>
<style lang="scss">
body,
html {
    height: 100%;
    width: 100%;
}
* {
    margin: 0;
    padding: 0;
}
dl,
li,
ol,
ul {
    list-style: none;
}
#app {
    height: 100%;
    width: 100%;
    .echartContainer {
        height: 100%;
        width: 100%;
    }
}
</style>
