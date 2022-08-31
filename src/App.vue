<template>
  <div id="gjs"></div>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import grapesjs from "grapesjs";
import compose from "@/composable/compose";

onMounted(() => {
  grapesjs.init({
    container: "#gjs",
    fromElement: true,
    plugins: [compose],
    height: "100vh",
    width: "auto",
    storageManager: false,
  });
});
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
