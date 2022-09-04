import { useProductsStore } from "@/store/products";

export default async function (editor) {
  const domComponent = editor.DomComponents;

  const store = useProductsStore();

  const productName = (name) => `<div class="product_name">${name}</div>`;

  const productCode = (barcode) =>
    `<div class="product_code">${barcode} کد کالا</div>`;

  const productCommentsLink = () =>
    `<div class="product_comments"> <a># دیدگاه کاربران</a> </div>`;

  const productNotAvailable = () => `
     <div class="not_available">
          <div>ناموجود</div>
          <hr />
          <div>این کالا فعلا موجود نیست</div>
     </div>
  `;

  const productAvailable = (price) => `
    <div class="product_available">
        <div>موجود در انبار</div>
        <hr />
        <div class="product_price">
            <div>قیمت کالا</div>
            <h6>${price.toLocaleString("fa-IR")} تومان</h6>
        </div>
        <div>
          <button id="btn">افزودن به سبد خرید</button>
        </div>
    </div>
  `;

  const basket = (price, order_available, order_no_check) =>
    `
    <div class="basket">
        ${
          order_available || order_no_check > 0
            ? productAvailable(price)
            : productNotAvailable()
        }
    </div>`;

  const component = (v) => {
    return `
        <div class="wrapper">
            ${productName(v.name)}
            ${productCode(v.barcode)}
            <div class="product_info">
                <div class="left">
                    ${basket(v.price, v.order_available, v.order_no_check)}
                </div>
                <div class="right">
                    ${productCommentsLink()}
                </div>
            </div>
        </div>
    `;
  };

  const script = function () {
    const btn = document.getElementById("btn");
    console.log(btn);
  };

  domComponent.addType("product-page", {
    model: {
      defaults: {
        script,
        styles: `
        .wrapper {
            padding: 1rem;
        }

        .left {
            text-align: right;
        }

        .product_name {
             text-align: start;
             font-size: 16px;
             font-weight: bold;
             font-stretch: normal;
             font-style: normal;
             line-height: 1.88;
             letter-spacing: normal;
             text-align: right;
             color: #333;
         } 

         .product_code {
            font-size: 12px;
            font-weight: 300;
            font-stretch: normal;
            font-style: normal;
            line-height: 2.5;
            letter-spacing: normal;
            text-align: right;
            color: #959595;
         }

         .product_info {
            display: flex;
            align-items: start;
            justify: space-between;
         }

         .product_info > div {
            flex: 1;
         }

         .product_comments {
            font-size: 12px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 2.5;
            letter-spacing: normal;
            text-align: right;
            color: #2dc9e5;
         }

         .product_price > div:first-child {
            font-size: 12px;
            font-weight: 300;
            font-stretch: normal;
            font-style: normal;
            line-height: 2.5;
            letter-spacing: normal;
            text-align: right;
            color: #959595;
         }

         .product_price > h6 {
            text-align: left;
            margin-bottom: 1rem;
            font-size: 18px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.67;
            letter-spacing: normal;
            color: #fc406c;
         }

         .product_available {
            padding:.5rem;
         }

         .product_available button {
            width: 100%;
            color: #ffffff;
            background-color: #fc406c;
            border: none;
            border-radius: 7px;
            padding: 1rem 1.75rem;
            cursor: pointer;
         }

         .product_available > div {
            font-size: 14px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 2.14;
            letter-spacing: normal;
            text-align: right;
            color: #353535;
         }

         .product_available hr {
            width: 100%;
            heigth: 1px;
            background-color: #e2e2e2;
         }

         .not_available > div:first-child {
            font-size: 14px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 2.14;
            letter-spacing: normal;
            text-align: right;
            color: #353535;
         }

         .basket {
            text-align: right;
            background-color: #f5f5f5;
            padding: 12px 14px 20px 14.5px;
            border: solid 1px #e2e2e2;
            border-radius: 7px;
         }
        `,
      },

      async init() {
        const res = await store.getProductWithId();
        this.components(component(res));
      },
    },
  });

  editor.BlockManager.add("product-page", {
    label: "product-page",
    content: { type: "product-page" },
  });
}
