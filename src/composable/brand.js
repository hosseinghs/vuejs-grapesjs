export default async function (editor) {
  const domComponents = editor.DomComponents;

  function script() {
    console.log("hello");
  }

  domComponents.addType("brand", {
    model: {
      defaults: {
        script,
        components: "brand component",
      },

      async init() {
        console.log("res");
      },
    },
  });

  editor.BlockManager.add("brand", {
    label: "brand comp",
    content: { type: "brand" },
  });
}
