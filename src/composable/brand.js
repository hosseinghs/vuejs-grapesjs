export default async function (editor) {
  const domComponents = editor.DomComponents;

  domComponents.addType("brand", {
    model: {
      defaults: {
        component: "brand component",
      },
      async init() {
        console.log("res");
      },
    },
  });

  editor.BlockManager.add("brand", {
    label: "brand comp",
    content: { type: "test" },
  });
}
