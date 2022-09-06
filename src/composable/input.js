import { useProductsStore } from "@/store/products";
export default async function (editor) {
  const domComponent = editor.DomComponents;

  const store = useProductsStore();
  console.log(store);

  domComponent.addType("input-component", {
    model: {
      defaults: {
        prop: 5,
        "script-props": ["prop"],
        traits: ["name", "placeholder", "title", "id"],
      },
      async init() {
        console.log("input inited");
        // const res = await store.getProductWithId();
        this.components("<input />");
      },
    },
  });

  editor.BlockManager.add("input comp", {
    label: "my input",
    content: { type: "input" },
  });
}
