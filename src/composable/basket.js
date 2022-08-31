import { computed } from "vue";
import { useProductsStore } from "@/store/products";

export default async function (editor) {
  const store = useProductsStore();
  const domComponent = editor.DomComponents;

  const isAvailable =
    store.product.order_available && store.product.order_no_check > 0
      ? "موجود"
      : "ناموجود";

  const basektComponent = `
  <div>
    ${isAvailable}
    <hr />
        <div>
            <span>قیمت کالا:</span>
            <div>65880000</div>
        </div>
    </div>`;

  domComponent.addType("basket", {
    model: {
      defaults: {
        components: basektComponent,
      },
      async init() {
        await store.getProductWithId();
        const res = computed(() => store.product);
        res.value.forEach(({ body }) => this.append(body));
      },
    },
  });

  editor.BlockManager.add("basket", {
    label: "basket comp",
    content: { type: "basket" },
  });
}
