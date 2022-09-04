export default async function (editor) {
  const domComponent = editor.DomComponents;

  const script = function () {
    const liList = [...document.querySelectorAll("ul > li")];
    console.log(liList);
  };

  domComponent.addType("tabs", {
    model: {
      defaults: {
        script,
        components: `
            <div>
                <ul>
                    <li id="a">a</li>
                    <li id="b">b</li>
                    <li id="c">c</li>
                </ul>
        </div>`,
        styles: `
            ul {
                display: flex;
                list-style-type: none;
            }

            li {
                width: 100%
            }
        `,
      },
      async init() {},
    },
  });

  editor.BlockManager.add("tabs comp", {
    label: "tabs",
    content: { type: "tabs" },
  });
}
