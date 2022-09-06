export default async function (editor) {
  const domComponents = editor.DomComponents;

  domComponents.addType("brand", {
    model: {
      defaults: {
        components: "brand component",
      },

      async init() {},
    },
  });

  editor.BlockManager.add("brand", {
    label: "brand comp",
    content: { type: "brand" },
  });
}
