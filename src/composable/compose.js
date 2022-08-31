import { computed } from "vue";
import { useProductsStore } from "@/store/products";

export default async function (editor) {
  const store = useProductsStore();
  const domComponent = editor.DomComponents;

  domComponent.addType("user", {
    model: {
      defaults: {
        components: `
        <h1>Header test</h1>
        <p>Paragraph test</p>
        `,
      },
      async init() {
        await store.getProductWithId();
        const res = computed(() => store.products);
        res.value.forEach(({ body }) => this.append(body));
      },
    },
  });

  editor.BlockManager.add("user", {
    label: "user comp",
    content: { type: "user" },
  });
}
