import { useProductsStore } from "@/store/products";

export default async function (editor) {
  const domComponent = editor.DomComponents;

  const store = useProductsStore();

  const basketComponent = (v) => {
    const { price } = v;
    return `
    <div class="wrapper">
      <hr />
        <div>
            <span>قیمت کالا:</span>
            <div class="price">تومان ${price.toLocaleString("fa-IR")}</div>
        </div>
        <div>
          <button class="add_to_basket">افزودن به سبد خرید</button>
        </div>
    </div>`;
  };

  domComponent.addType("basket", {
    model: {
      defaults: {
        styles: `.wrapper {
          width: 278px;
          text-align: right;
          background-color: #e2e2e2;
          padding: 12px 14px 20px 14.5px;
          border: solid 1px #e2e2e2;
          border-radius: 8px;
        }
        
        .price {
          text-align:left;
          font-size: 18px;
          font-weight: bold;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.67;
          letter-spacing: normal;
          text-align: left;
          color: #fc406c;
        }     
        
        .add_to_basket {
          width:100%;
          background-color: #fc406c;
          color: #ffffff;
          border: none;
        }
        `,
      },

      // not on client side, only dashboard
      async init() {
        const res = await store.getProductWithId();
        this.components(basketComponent(res));
      },
    },
  });

  editor.BlockManager.add("basket", {
    label: "basket comp",
    content: { type: "basket" },
  });
}
