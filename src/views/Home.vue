<script>
export default {
  name: "HomePage",
};
</script>

<script setup>
// import { computed } from "vue";
// import Text from "@/components/Text.vue";
import { useProductsStore } from "@/store/products";

const store = useProductsStore();

function getData() {
  store.getProducts();
}
</script>

<template>
  <section>
    <!-- <Text
      v-for="{ id, postId, body } in comments"
      :key="id"
      :id="id"
      :post-id="postId"
      :body="body"
    /> -->
    <button @click="getData">add data</button>
  </section>
</template>
