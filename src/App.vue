<template>
  <div id="gjs"></div>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import grapesjs from "grapesjs";
import compose from "@/composable/compose";
import basket from "@/composable/basket";
import brand from "@/composable/brand";
import name from "@/composable/name";
import product from "@/composable/product";
import productPage from "@/composable/productPage";

onMounted(() => {
  grapesjs.init({
    container: "#gjs",
    fromElement: true,
    plugins: [compose, basket, brand, name, product, productPage],
    height: "100vh",
    width: "auto",
    storageManager: false,
  });
});
</script>

<style>
@font-face {
  font-family: sans;
  src: url("./assets/IRANSansMedium.ttf");
}

body {
  margin: 0;
}

#app {
  font-family: sans !important;
  text-align: center;
  color: #2c3e50;
}
</style>
