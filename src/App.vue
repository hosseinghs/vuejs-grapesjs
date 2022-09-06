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
import productPage from "@/composable/productPage";
import tabs from "@/composable/tabs";
import input from "@/composable/input";

onMounted(() => {
  grapesjs.init({
    container: "#gjs",
    fromElement: true,
    plugins: [compose, basket, brand, input, tabs, name, productPage],
    height: "100vh",
    width: "auto",
    storageManager: false,
  });
});
</script>
