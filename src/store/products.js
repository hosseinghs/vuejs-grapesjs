import { defineStore } from "pinia";
import { getProductWithIdApi } from "@/services/products";

export const useProductsStore = defineStore("products", {
  state: () => {
    return { product: null };
  },

  actions: {
    async getProductWithId() {
      const { status, data } = await getProductWithIdApi();
      if (status >= 200) this.product = Object.assign({}, data);
      return data;
    },
  },
});
