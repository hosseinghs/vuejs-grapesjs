import { useProductsStore } from "@/store/products";

export default async function (editor) {
  const domComponent = editor.DomComponents;

  const store = useProductsStore();
  console.log(store);

  domComponent.addType("product-name", {
    model: {
      defaults: {
        components: `product name component`,
      },
      async init() {
        console.log("product name init");
      },
    },
  });

  editor.BlockManager.add("product-name", {
    label: "product name comp",
    content: { type: "product-name" },
  });
}
