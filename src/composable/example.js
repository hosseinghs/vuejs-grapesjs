import { addUpdateToolbar } from "../utils";

export default function (editor) {
  const domComponents = editor.DomComponents;

  const shareButton = {
    attributes: { class: "text-left" },
    components: [
      {
        tagName: "button",
        attributes: {
          class:
            "share-btn justify-self-end rounded-md sm:absolute sm:top-7 sm:right-7",
        },
        components: {
          tagName: "svg",
          type: "svg",
          style: {
            height: "16px",
            fill: "black",
          },
          attributes: {
            viewBox: "0 0 24 24",
          },
          components: {
            tagName: "path",
            type: "svg-in",
            attributes: {
              d: "M21.62,16.57a4.37,4.37,0,0,0-6.18,0l-5.8-3.37a4.57,4.57,0,0,0,0-2.38l5.79-3.41a4.38,4.38,0,1,0-1.1-1.88L8.54,8.93h0a4.37,4.37,0,1,0,0,6.18l5.79,3.38a4.39,4.39,0,0,0-.17,1.19h0a4.37,4.37,0,1,0,7.45-3.1Zm-3.1-14.4a2.18,2.18,0,1,1-2.17,2.17A2.17,2.17,0,0,1,18.52,2.17ZM5.39,14.32a2.18,2.18,0,1,1,2.18-2.18A2.18,2.18,0,0,1,5.39,14.32Zm13.16,7.54a2.18,2.18,0,1,1,2.17-2.18A2.18,2.18,0,0,1,18.55,21.86Z",
            },
          },
        },
      },
    ],
  };

  const galleryComponent = {
    attributes: {
      class: "gallery sm:flex-none sm:pr-7 cursor-pointer h-64 lg:h-full",
    },
    components: [
      {
        tagName: "img",
        attributes: {
          src: "{{ settings.images_prefix.server }}{{ settings.images_prefix.products }}large/{{ images[0] }}",
          class: "w-72 lg:w-96",
        },
      },
      {
        attributes: {
          class: "hidden sm:flex sm:space-x-2.5 sm:space-x-reverse sm:mt-5.5",
        },
        components: `
          {% for image in images %}
            {% if loop.index0 < 4  %}
            <div class="rounded-xs border border-neutral-200 {{ 'more' if (loop.index0 == '4') and (images | length > 4) else 'overflow-hidden' }}">
              <img
                src="{{ settings.images_prefix.server }}{{ settings.images_prefix.products }}small/{{ image }}"
                class="object-contain w-24 h-24"
              />
            </div>
            {% endif %}
          {% endfor %}
        `,
      },
    ],
  };

  const mobileGalleryComponent = {
    attributes: { class: "gallery cursor-pointer h-full" },
    components: {
      attributes: { class: "swiper mobile mb-9" },
      components: [
        {
          attributes: { class: "swiper-wrapper" },
          components: `
            {% for image in images %}
              <div class="swiper-slide">
                <img src="{{ settings.images_prefix.server }}{{ settings.images_prefix.products }}medium/{{ image }}" />
              </div>
            {% endfor %}
          `,
        },
        {
          attributes: { class: "swiper-pagination" },
        },
      ],
    },
  };

  const priceComponent = {
    attributes: {
      class:
        "quantity bg-white rounded-xs font-iranyekan w-full xl:w-[17.375rem] sm:bg-neutral-100 sm:border sm:border-neutral-200 sm:p-3.5",
    },
    components: [
      {
        attributes: {
          class:
            "text-neutral-700 flex items-center border-b border-neutral-200 pb-3.5",
        },
        components: [
          {
            tagName: "svg",
            type: "svg",
            style: {
              height: "18px",
            },
            attributes: {
              viewBox: "0 0 24 24",
            },
            components: {
              tagName: "path",
              type: "svg-in",
              attributes: {
                d: "M6.8,24a6.6,6.6,0,0,1-4.93-2A7.27,7.27,0,0,1,0,16.9V7.1A7.22,7.22,0,0,1,1.87,2,6.6,6.6,0,0,1,6.8,0H17.2a6.6,6.6,0,0,1,4.93,2A7.22,7.22,0,0,1,24,7.1v9.8A7.22,7.22,0,0,1,22.13,22a6.6,6.6,0,0,1-4.93,2ZM1.8,7.1v9.8c0,3.22,2,5.3,5,5.3H17.2c3,0,5-2.08,5-5.3V7.1a5.52,5.52,0,0,0-1.35-3.86A4.89,4.89,0,0,0,17.2,1.8H6.8C3.76,1.8,1.8,3.88,1.8,7.1ZM9.28,17l-.14-.12L5.19,12.88A1.25,1.25,0,0,1,6.82,11l.14.12L10,14.19l7-7A1.25,1.25,0,0,1,18.93,8.8l-.12.14-7.9,7.9A1.26,1.26,0,0,1,9.28,17Z",
              },
            },
          },
          {
            content: "موجود در انبار",
            attributes: { class: "text-base font-bold mr-3" },
          },
        ],
      },
      {
        attributes: { class: "space-y-2.5" },
        components: [
          {
            content: "قیمت کالا:",
            attributes: { class: "text-xs text-neutral-400 font-light mt-2.5" },
          },
          {
            attributes: {
              class: "flex items-center justify-end text-base font-bold",
            },
            components: [
              `
                {% if price_discount %}
                  <del class="text-neutral-400">
                    {{ price | currency }}
                  </del>

                  <div class="bg-rose-500 rounded-sm text-white px-2 mr-2.5">
                    {% set computePrice=(price-price_discount)/price*100 %}
                    {{ computePrice | round(0, "floor") }}%
                  </div>
                {% endif %}
              `,
            ],
          },
          {
            attributes: {
              class: "price-label text-xl text-rose-500 font-bold text-left",
            },
            content:
              "{{ (price_discount if price_discount else price) | currency }} تومان",
          },
          `
            <button class="add-to-basket bg-rose-500 w-full text-base text-white font-bold rounded-xs py-3.5">
              افزودن به سبد خرید
            </button>
          `,
        ],
      },
    ],
  };

  const priceComponentNoQuantity = {
    attributes: {
      class:
        "hidden not-quantity text-center sm:w-[17.375rem] bg-white sm:bg-neutral-100 sm:border sm:border-neutral-200 rounded-xs font-iranyekan sm:p-3.5",
    },
    components: [
      {
        attributes: {
          class: "text-neutral-700 border-b border-neutral-200 pb-3.5",
        },
        components: [
          {
            content: "ناموجود",
            attributes: { class: "text-base font-bold text-center" },
          },
        ],
      },
      {
        content: "این کالا فعلا موجود نیست",
        attributes: {
          class:
            "text-sm text-neutral-700 font-light mt-3.5 font-iranyekan text-center",
        },
      },
    ],
  };

  const detailsComponent = {
    attributes: { class: "hidden lg:flex bg-white rounded-md p-7 relative" },
    style: { "box-shadow": "0 3px 10px 0 rgba(0, 0, 0, 0.06)" },
    components: [
      shareButton,
      galleryComponent,
      {
        tagName: "hr",
        attributes: { class: "self-stretch h-auto w-px bg-neutral-200 mx-4" },
      },
      {
        attributes: { class: "flex flex-col grow" },
        components: [
          {
            attributes: { class: "mb-2.5" },
            components: [
              {
                tagName: "h1",
                content: "{{ name }}",
                attributes: {
                  class: "text-lg font-bold text-neutral-800 font-iranyekan",
                },
              },
              {
                attributes: { class: "text-xs text-neutral-400 font-light" },
                components: [
                  {
                    tagName: "span",
                    content: "کد کالا: ",
                    attributes: { class: "font-iranyekan" },
                  },
                  {
                    type: "textnode",
                    content: "{{ barcode }}",
                  },
                ],
              },
            ],
          },
          {
            attributes: { class: "flex flex-col justify-between h-full" },
            components: [
              {
                attributes: {
                  class: "flex flex-col xl:flex-row justify-between",
                },
                components: [
                  {
                    components: [
                      {
                        tagName: "a",
                        content: "{{ comments | length }} دیدگاه کاربران",
                        attributes: {
                          href: "#comments",
                          class:
                            "user-comments text-cyan-400 text-xs font-bold font-iranyekan",
                        },
                      },
                      {
                        attributes: {
                          class:
                            "font-iranyekan text-xs text-neutral-700 space-y-2.5 space-reverse mt-7 mb-7 xl:mb-0",
                        },
                        components: `
                          {% for key, values in productVariants %}
                            <div class="flex items-center">
                              <div class="font-light w-12">{{ key }}</div>
                              <select class="variant-type-{{ loop.index }} bg-white border border-neutral-200 rounded-xs w-44 h-7">
                                {% for variantType in values %}
                                  <option value="{{ variantType.value }}">{{ variantType.value }}</option>
                                {% endfor %}
                              </select>
                            </div>
                          {% endfor %}
                        `,
                      },
                    ],
                  },
                  priceComponent,
                  priceComponentNoQuantity,
                ],
              },
              {
                attributes: {
                  class: "flex items-center font-iranyekan text-xs mt-2.5",
                },
                components: [
                  {
                    content: "تگ‌ها:",
                    attributes: { class: "font-light ml-2.5" },
                  },
                  {
                    attributes: {
                      class:
                        "display-inline text-cyan-400 font-bold space-x-3.5 space-x-reverse",
                    },
                    components: `
                      {% for tag in categories %}
                        {% if tag.is_tag  %}
                        <a href="/collections/?search={{ tag.name }}" onclick="singleSpaNavigate(event)">{{ tag.name }}</a>
                        {% endif %}
                      {% endfor %}
                    `,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const detailsComponentMobile = {
    attributes: {
      class: "lg:hidden flex flex-col bg-white rounded-md p-7 relative",
    },
    style: { "box-shadow": "0 3px 10px 0 rgba(0, 0, 0, 0.06)" },
    components: [
      {
        attributes: { class: "flex flex-col grow" },
        components: [
          {
            attributes: { class: "mb-2.5" },
            components: [
              {
                tagName: "h1",
                content: "{{ name }}",
                attributes: {
                  class: "text-base font-bold text-neutral-800 font-iranyekan",
                },
              },
              {
                attributes: {
                  class: "text-xs text-neutral-400 font-light my-2.5",
                },
                components: [
                  {
                    tagName: "span",
                    content: "کد کالا: ",
                    attributes: { class: "font-iranyekan" },
                  },
                  {
                    type: "textnode",
                    content: "{{ barcode }}",
                  },
                ],
              },
              shareButton,
            ],
          },
          {
            attributes: { class: "flex flex-col" },
            components: [
              mobileGalleryComponent,
              {
                attributes: {
                  class:
                    "flex flex-col md:flex-row md:space-x-7 md:space-x-reverse",
                },
                components: [
                  {
                    attributes: {
                      class:
                        "font-iranyekan text-xs text-neutral-700 space-y-2.5 space-reverse mt-1 sm:mt-5 mb-7",
                    },
                    components: `
                      {% for key, values in productVariants %}
                        <div class="flex items-center">
                          <div class="font-light w-12">{{ key }}</div>
                          <select class="bg-white border border-neutral-200 rounded-xs w-44 h-7">
                            {% for variantType in values %}
                              <option value="{{ variantType.value }}">{{ variantType.value }}</option>
                            {% endfor %}
                          </select>
                        </div>
                      {% endfor %}
                    `,
                  },
                  priceComponent,
                  priceComponentNoQuantity,
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const descriptionComponent = {
    attributes: { id: "descriptions" },
    components: [
      {
        attributes: {
          class: "sm:flex-none flex flex-row sm:flex-col justify-between",
        },
        components: [
          {
            content: "نقد و بررسی",
            attributes: {
              class:
                "text-base items-center text-neutral-700 font-bold mb-3.5 sm:mb-2.5",
            },
          },
          {
            tagName: "h2",
            content: "{{ name }}",
            attributes: {
              class: "hidden sm:block text-xs text-neutral-500 font-light",
            },
          },
          {
            tagName: "button",
            attributes: {
              class:
                "description-btn sm:hidden flex text-xs text-cyan-400 font-bold items-center mb-3.5 sm:mb-2.5",
            },
            components: [
              {
                type: "textnode",
                content: "بیشتر",
              },
              {
                tagName: "svg",
                type: "svg",
                style: {
                  width: "9px",
                },
                attributes: {
                  class: "fill-current mr-2.5",
                  viewBox: "0 0 24 24",
                },
                components: {
                  tagName: "path",
                  type: "svg-in",
                  attributes: {
                    d: "M18.38.36A1.22,1.22,0,0,1,18.5,2l-.12.14L8.29,12l10.09,9.89a1.22,1.22,0,0,1,.12,1.61l-.12.14a1.29,1.29,0,0,1-1.64.12l-.14-.12-11-10.77a1.22,1.22,0,0,1-.12-1.61l.12-.13L16.6.36A1.28,1.28,0,0,1,18.38.36Z",
                  },
                },
              },
            ],
          },
        ],
      },
      {
        attributes: {
          class:
            "description-content mt-4 text-base text-neutral-700 font-light leading-7 overflow-hidden h-[10.938rem]",
        },
        components: "{{ description | safe }}",
      },
      {
        tagName: "button",
        attributes: {
          class:
            "desc-collaps hidden sm:flex text-xs text-cyan-400 font-bold mt-3.5 items-center",
        },
        components: [
          {
            tagName: "span",
            content: "نمایش بیشتر",
            attributes: { class: "see-more" },
          },
          {
            tagName: "span",
            content: "نمایش کمتر",
            attributes: { class: "hidden see-less" },
          },
          {
            tagName: "svg",
            type: "svg",
            style: {
              width: "9px",
            },
            attributes: {
              class: "fill-current mr-2.5",
              viewBox: "0 0 24 24",
            },
            components: {
              tagName: "path",
              type: "svg-in",
              attributes: {
                d: "M.36,5.62A1.22,1.22,0,0,1,2,5.5l.14.12L12,15.71,21.89,5.62A1.22,1.22,0,0,1,23.5,5.5l.14.12a1.29,1.29,0,0,1,.12,1.64l-.12.14-10.77,11a1.22,1.22,0,0,1-1.61.12l-.13-.12L.36,7.4A1.28,1.28,0,0,1,.36,5.62Z",
              },
            },
          },
        ],
      },
    ],
  };

  const specsComponent = {
    attributes: {
      id: "specs",
    },
    components: [
      {
        attributes: { class: "sm:flex-none flex flex-row justify-between" },
        components: [
          {
            content: "مشخصات کالا",
            attributes: {
              class:
                "text-base items-center text-neutral-700 font-bold mb-5.5 sm:mb-2.5",
            },
          },
          {
            tagName: "button",
            attributes: {
              class:
                "specs-btn sm:hidden flex text-xs text-cyan-400 font-bold items-center mb-3.5 sm:mb-2.5",
            },
            components: [
              {
                type: "textnode",
                content: "بیشتر",
              },
              {
                tagName: "svg",
                type: "svg",
                style: {
                  width: "9px",
                },
                attributes: {
                  class: "fill-current mr-2.5",
                  viewBox: "0 0 24 24",
                },
                components: {
                  tagName: "path",
                  type: "svg-in",
                  attributes: {
                    d: "M18.38.36A1.22,1.22,0,0,1,18.5,2l-.12.14L8.29,12l10.09,9.89a1.22,1.22,0,0,1,.12,1.61l-.12.14a1.29,1.29,0,0,1-1.64.12l-.14-.12-11-10.77a1.22,1.22,0,0,1-.12-1.61l.12-.13L16.6.36A1.28,1.28,0,0,1,18.38.36Z",
                  },
                },
              },
            ],
          },
        ],
      },
      `
        <div class="specs-content flex flex-row h-[10.938rem]">
          <ul class="overflow-hidden">
            {% for spec in specs %}
              {% if spec.value.name %}
              <li class="mb-4 sm:mb-7 flex border-b pb-4 no-border border-[#eee]">
                <div class="w-full sm:w-52 text-base text-neutral-400 font-bold">{{ spec.key }}</div>
                <div class="w-full text-base text-neutral-700 font-light">{{ spec.value.name }}</div>
              </li>
              {% endif %}
            {% endfor %}
          </ul>
        </div>
      `,
      {
        tagName: "button",
        attributes: {
          id: "specs-collaps",
          class:
            "hidden sm:flex text-xs text-cyan-400 font-bold mt-7 items-center",
        },
        components: [
          {
            tagName: "span",
            content: "ادامه مشخصات",
            attributes: { class: "see-more" },
          },
          {
            tagName: "span",
            content: "بستن مشخصات",
            attributes: { class: "hidden see-less" },
          },
          // {
          //   type: 'textnode',
          //   content: 'ادامه مشخصات'
          // },
          {
            tagName: "svg",
            type: "svg",
            style: {
              width: "9px",
            },
            attributes: {
              class: "fill-current mr-2.5",
              viewBox: "0 0 24 24",
            },
            components: {
              tagName: "path",
              type: "svg-in",
              attributes: {
                d: "M.36,5.62A1.22,1.22,0,0,1,2,5.5l.14.12L12,15.71,21.89,5.62A1.22,1.22,0,0,1,23.5,5.5l.14.12a1.29,1.29,0,0,1,.12,1.64l-.12.14-10.77,11a1.22,1.22,0,0,1-1.61.12l-.13-.12L.36,7.4A1.28,1.28,0,0,1,.36,5.62Z",
              },
            },
          },
        ],
      },
    ],
  };

  const commentFormComponent = {
    tagName: "form",
    attributes: {
      id: "comment-form",
      class:
        "text-base font-bold text-neutral-700 mt-14 space-y-3.5 sapce-y-reverse",
    },
    components: [
      `{% if not IS_AUTHENTICATED %}
      <div>
        <label class="mb-1.5 block">نام شما</label>
        <input class="w-full sm:w-1/2 px-4 py-3 rounded-xs border border-neutral-200 focus:outline-none" name="name" required />
      </div>
      {% endif %}`,
      {
        components: [
          {
            type: "label",
            content: "متن نظر",
            attributes: { class: "mb-1.5 block" },
          },
          {
            tagName: "textarea",
            attributes: {
              class:
                "w-full px-4 py-3 rounded-xs border border-neutral-200 focus:outline-none",
              required: true,
              rows: 3,
            },
          },
        ],
      },
      {
        attributes: { class: "text-left" },
        components: {
          tagName: "button",
          content: "ثبت دیدگاه",
          attributes: {
            class: "bg-cyan-400 text-white px-7 py-3 rounded-xs",
            type: "submit",
          },
        },
      },
    ],
  };

  const commentsListComponent = {
    attributes: { id: "comment-list" },
    components: `
      {% for comment in comments %}
      <div>
        <div>
          <div class="text-base text-neutral-700 font-bold mb-2.5">{{ comment.user.firstname }} {{ comment.user.lastname }}</div>
          <div class="text-xs text-neutral-500 font-light my-2.5">{{ comment.created_at | dayjs('D MMMM YYYY') }}</div>
          <p class="text-base text-neutral-700 font-light">{{ comment.text }}</p>
        </div>
        {% if comment.answer %}
        <div class="bg-neutral-100 p-3.5 sm:p-5.5 rounded-md mr-5.5 sm:mr-7 mt-3.5">
          <div class="text-base font-medium text-rose-600">پاسخ فروشگاه</div>
          <div class="text-xs text-neutral-500 font-light my-2.5">{{ comment.answered_at | dayjs('D MMMM YYYY') }}</div>
          <p class="text-base text-neutral-700 font-light mt-2.5">{{ comment.answer }}</p>
        </div>
        {% endif %}
      </div>
      {% if (comments | length) !== loop.index %}
        <hr class="my-7 border-neutral-50">
      {% endif %}
      {% else %}
        <div class="text-center py-7">دیدگاهی ثبت نشده</div>
      {% endfor %}
    `,
  };

  const commentsComponent = {
    attributes: { id: "comments" },
    components: [
      {
        content: "دیدگاه کاربران",
        attributes: {
          class: "text-base text-neutral-700 font-bold mb-5.5 sm:mb-12",
        },
      },
      commentsListComponent,
      commentFormComponent,
    ],
  };

  const tabsComponent = {
    style: {
      top: 0,
      position: "sticky",
      "background-color": "#fff",
    },
    tagName: "ul",
    attributes: {
      class:
        "hidden tabs sm:flex items-center border-b border-neutral-200 text-base text-neutral-700 font-light space-x-7 space-x-reverse mb-7",
    },
    components: [
      {
        tagName: "li",
        attributes: {
          class: "text-rose-500 font-bold border-b-2 border-rose-500 pb-2.5",
        },
        components: {
          tagName: "a",
          content: "نقد و بررسی",
          attributes: { href: "#descriptions" },
        },
      },
      {
        tagName: "li",
        attributes: { class: "pb-2.5" },
        components: {
          tagName: "a",
          content: "مشخصات",
          attributes: { href: "#specs" },
        },
      },
      {
        tagName: "li",
        attributes: { class: "pb-2.5" },
        components: {
          tagName: "a",
          content: "دیدگاه کاربران",
          attributes: { href: "#comments" },
        },
      },
    ],
  };

  const shortDetailComponent = {
    attributes: {
      class:
        "hidden md:block bg-white rounded-sm p-5 font-iranyekan sticky top-0",
    },
    components: [
      {
        attributes: { class: "flex" },
        components: [
          {
            attributes: { class: "flex-none basis-[3.75rem]" },
            components: {
              tagName: "img",
              attributes: {
                src: "{{ settings.images_prefix.server }}{{ settings.images_prefix.products }}small/{{ images[0] }}",
                width: "60",
                height: "60",
              },
            },
          },
          {
            attributes: { class: "mr-5" },
            components: [
              {
                tagName: "h2",
                attributes: {
                  class: "text-xs text-neutral-800 font-bold mb-5",
                },
                content: "{{ name }}",
              },
              {
                tagName: "ul",
                attributes: {
                  class:
                    "varaints-label text-xs text-neutral-500 font-light space-y-2.5",
                },
              },
            ],
          },
        ],
      },
      {
        tagName: "hr",
        attributes: { class: "bg-neutral-200 my-7" },
      },
      `
        {% if order_available or (order_no_check and not order_available) %}
        <div class="no-quantity-price price-label text-xl text-neutral-700 text-left font-bold mb-5">
          {{ (price_discount if price_discount else price) | currency }} تومان
        </div>
        <button class="add-to-basket bg-rose-500 w-full text-base text-white font-bold rounded-xs py-3.5">
          افزودن به سبد خرید
        </button>
        <div class="hidden no-quantity text-center">
          <div>ناموجود</div>
          <hr class="bg-neutral-200 my-3.5" />
          <div class="text-neutral-700 font-light font-iranyekan text-sm">این کالا فعلا موجود نیست</div>
        </div>
        {% else %}
        <div class="hidden no-quantity-price price-label text-xl text-neutral-700 text-left font-bold mb-5">
          {{ (price_discount if price_discount else price) | currency }} تومان
        </div>
        <button class="add-to-basket hidden bg-rose-500 w-full text-base text-white font-bold rounded-xs py-3.5">
          افزودن به سبد خرید
        </button>
        <div class="no-quantity text-center">
          <div>ناموجود</div>
          <hr class="bg-neutral-200 my-3.5" />
          <div class="text-sm text-neutral-700 font-light font-iranyekan">این کالا فعلا موجود نیست</div>
        </div>
        {% endif %}
      `,
    ],
  };

  const shareModal = {
    tagName: "bd-modal",
    attributes: {
      class: "hidden share-modal",
    },
    components: {
      attributes: {
        class: "bg-white p-7 rounded-t-lg sm:rounded-lg font-iranyekan",
      },
      components: [
        {
          attributes: {
            class:
              "sm:ml-0 flex justify-between border-b border-neutral-200 pb-4",
          },
          components: [
            {
              tagName: "h3",
              attributes: {
                class: "text-lg text-neutral-800 leading-6 font-bold",
              },
              content: "اشتراک گذاری",
            },
            {
              tagName: "button",
              attributes: { class: "close rounded-md" },
              components: {
                tagName: "svg",
                type: "svg",
                style: { height: "12px" },
                attributes: {
                  viewBox: "0 0 24 24",
                },
                components: {
                  tagName: "path",
                  type: "svg-in",
                  attributes: {
                    d: "M19.44,23.44l-.32-.28L12,16,4.89,23.15A2.86,2.86,0,0,1,.57,19.43l.28-.32L8,12,.84,4.88A2.86,2.86,0,0,1,4.56.56l.32.28L12,8,19.11.84a2.86,2.86,0,0,1,4.32,3.73l-.27.32L16,12l7.12,7.12a2.86,2.86,0,0,1-3.72,4.32Z",
                  },
                },
              },
            },
          ],
        },
        {
          content:
            "با استفاده از روش‌های زیر می‌توانید این صفحه را با دوستان خود به اشتراک بگذارید.",
          attributes: {
            class: "text-base text-neutral-800 text-right font-light my-7",
          },
        },
        {
          attributes: { class: "flex flex-wrap gutter-15" },
          components: [
            {
              attributes: {
                class: "order-3 sm:order-1 w-1/2 sm:w-auto",
              },
              components: {
                tagName: "a",
                attributes: {
                  href: `https://twitter.com/intent/tweet?text=${location.href}`,
                  class:
                    "sm:w-10 h-10 rounded-xs flex items-center justify-center bg-[#4dceed]",
                  target: "_blank",
                },
                components: [
                  {
                    tagName: "svg",
                    type: "svg",
                    style: {
                      height: "18px",
                      fill: "#fff",
                    },
                    attributes: { viewBox: "0 0 24 24" },
                    components: {
                      tagName: "path",
                      type: "svg-in",
                      attributes: {
                        d: "M8.28,22A15.49,15.49,0,0,1,.53,19.92,1,1,0,0,1,0,18.81a1,1,0,0,1,.91-.7,10.23,10.23,0,0,0,4.93-1A9.61,9.61,0,0,1,1,9.05,12.71,12.71,0,0,1,2,3.61.91.91,0,0,1,2.84,3a1,1,0,0,1,.9.4A9.65,9.65,0,0,0,11,7.54,5.76,5.76,0,0,1,12.9,3.31a5.41,5.41,0,0,1,7.25.1,10.21,10.21,0,0,0,2.32-1.2,1.1,1.1,0,0,1,1.11,0,1.13,1.13,0,0,1,.4,1.1,8.2,8.2,0,0,1-2,3.83v.5c0,5.54-2.41,10.17-6.74,12.58a13.47,13.47,0,0,1-7,1.81ZM5,19.62a12.91,12.91,0,0,0,9.47-1.21A12.18,12.18,0,0,0,20.15,7.54a1.23,1.23,0,0,0-.1-.6.84.84,0,0,1,.3-.91c.2-.2.4-.5.6-.7a1.67,1.67,0,0,1-.7.2.91.91,0,0,1-1-.3,3.5,3.5,0,0,0-4.93-.3A3.07,3.07,0,0,0,13,7.55v1a1,1,0,0,1-1,1A11.47,11.47,0,0,1,3.35,6c-.6,2.62-.81,7.55,5,10.07A1.15,1.15,0,0,1,9,17a1,1,0,0,1-.4.91A11.85,11.85,0,0,1,5,19.62Z",
                      },
                    },
                  },
                  {
                    attributes: {
                      class: "sm:hidden text-white text-base font-bold mr-2.5",
                    },
                    components: {
                      type: "textnode",
                      content: "توییتر",
                    },
                  },
                ],
              },
            },
            {
              attributes: {
                class: "order-1 sm:order-2 w-1/2 sm:w-auto",
              },
              components: {
                tagName: "a",
                attributes: {
                  href: `https://web.whatsapp.com/send?text=${location.href}`,
                  class:
                    "sm:w-10 h-10 rounded-xs flex items-center justify-center bg-[#28c759]",
                  target: "_blank",
                },
                components: [
                  {
                    tagName: "svg",
                    type: "svg",
                    style: {
                      height: "18px",
                      fill: "#fff",
                    },
                    attributes: { viewBox: "0 0 24 24" },
                    components: {
                      tagName: "path",
                      type: "svg-in",
                      attributes: {
                        d: "M20.4,3.47A11.9,11.9,0,0,0,1.69,17.82L0,24l6.3-1.66A11.91,11.91,0,0,0,12,23.77h0A12,12,0,0,0,24,11.88a12,12,0,0,0-3.6-8.41ZM12,21.77a10,10,0,0,1-5-1.38l-.36-.21-3.73,1,1-3.65-.24-.37A9.9,9.9,0,1,1,22,11.88,10,10,0,0,1,12,21.77Zm5.42-7.4c-.29-.15-1.76-.87-2-1s-.47-.14-.67.16a13.45,13.45,0,0,1-.94,1.16c-.18.21-.35.23-.64.08a8.14,8.14,0,0,1-4.05-3.54c-.3-.52.31-.49.88-1.62a.59.59,0,0,0,0-.52C9.86,9,9.27,7.51,9,6.91s-.49-.5-.66-.51H7.79A1.1,1.1,0,0,0,7,6.76,3.31,3.31,0,0,0,6,9.24a5.73,5.73,0,0,0,1.2,3.07,13.32,13.32,0,0,0,5.08,4.49,5.79,5.79,0,0,0,3.57.75,3.07,3.07,0,0,0,2-1.42A2.53,2.53,0,0,0,18,14.72c-.07-.14-.27-.21-.56-.36Z",
                      },
                    },
                  },
                  {
                    attributes: {
                      class: "sm:hidden text-white text-base font-bold mr-2.5",
                    },
                    components: {
                      type: "textnode",
                      content: "واتس اپ",
                    },
                  },
                ],
              },
            },
            {
              attributes: {
                class: "order-2 sm:order-3 w-1/2 sm:w-auto",
              },
              components: {
                tagName: "a",
                attributes: {
                  href: "mailto:",
                  class:
                    "sm:w-10 h-10 rounded-xs flex items-center justify-center bg-[#fa4040]",
                },
                components: [
                  {
                    tagName: "svg",
                    type: "svg",
                    style: {
                      height: "18px",
                      fill: "#fff",
                    },
                    attributes: { viewBox: "0 0 24 24" },
                    components: {
                      tagName: "path",
                      type: "svg-in",
                      attributes: {
                        d: "M3.27,21.82A3.28,3.28,0,0,1,0,18.54V5.46A3.28,3.28,0,0,1,3.27,2.18H20.73A3.28,3.28,0,0,1,24,5.46V18.54a3.28,3.28,0,0,1-3.27,3.28ZM2.18,18.54a1.09,1.09,0,0,0,1.09,1.09H20.73a1.08,1.08,0,0,0,1.09-1.08v-11L12.63,14a1.1,1.1,0,0,1-1.25,0L2.18,7.55ZM12,11.76,21.7,5a1.09,1.09,0,0,0-1-.6H3.27a1.08,1.08,0,0,0-1,.6Z",
                      },
                    },
                  },
                  {
                    attributes: {
                      class: "sm:hidden text-white text-base font-bold mr-2.5",
                    },
                    components: {
                      type: "textnode",
                      content: "ایمیل",
                    },
                  },
                ],
              },
            },
            {
              attributes: {
                class: "order-0 sm:order-5 w-full sm:flex-1",
              },
              components: {
                tagName: "button",
                attributes: {
                  class:
                    "copy-link w-full h-10 text-neutral-500 font-bold px-2 py-2 rounded-xs border border-neutral-500 rounded-xs flex items-center justify-center",
                },
                components: [
                  {
                    tagName: "svg",
                    type: "svg",
                    style: {
                      height: "15px",
                      fill: "#757575",
                    },
                    attributes: {
                      class: " ml-1",
                      viewBox: "0 0 24 24",
                    },
                    components: {
                      tagName: "path",
                      type: "svg-in",
                      attributes: {
                        d: "M16.91,0H3.82A2.19,2.19,0,0,0,1.64,2.18V17.45H3.82V2.18H16.91Zm3.27,4.36h-12A2.19,2.19,0,0,0,6,6.55V21.82A2.19,2.19,0,0,0,8.18,24h12a2.19,2.19,0,0,0,2.18-2.18V6.55a2.19,2.19,0,0,0-2.18-2.19Zm0,17.46h-12V6.55h12Z",
                      },
                    },
                  },
                  {
                    content: "کپی لینک",
                    style: {
                      flex: "none",
                      "font-size": "12px",
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  };

  const galleryModal = {
    tagName: "bd-modal",
    attributes: {
      class: "hidden gallery-modal",
    },
    components: {
      attributes: {
        class: "bg-white p-7 sm:rounded-lg font-iranyekan h-full",
      },
      content: `
        <div class="flex ml-7 sm:ml-0 justify-between border-b border-neutral-200 pb-3.5 mb-7">
          <div class="flex flex-row">
            <button class="sm:hidden ml-5.5 close text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.92,12.42h0s0,0,0,0v0l0,0h0a.57.57,0,0,1-.08.13h0a.43.43,0,0,1-.09.1h0L14.9,21.67a1.08,1.08,0,0,1-1.52,0l0,0a1.12,1.12,0,0,1-.1-1.44l.1-.12,6.92-7H1.11A1.11,1.11,0,0,1,1,10.9H20.28l-6.93-7a1.12,1.12,0,0,1,0-1.57,1.09,1.09,0,0,1,1.42-.11l.12.11,8.79,8.88a1.3,1.3,0,0,1,.15.2v0s0,0,0,0A1.06,1.06,0,0,1,24,12,1.16,1.16,0,0,1,23.92,12.42Z"/></svg>
            </button>
            <h3 class="text-lg text-neutral-800 leading-6 font-bold">
              تصاویر کالا
            </h3>
          </div>
          <button class="hidden sm:block close text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
            <svg class="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.44,23.44l-.32-.28L12,16,4.89,23.15A2.86,2.86,0,0,1,.57,19.43l.28-.32L8,12,.84,4.88A2.86,2.86,0,0,1,4.56.56l.32.28L12,8,19.11.84a2.86,2.86,0,0,1,4.32,3.73l-.27.32L16,12l7.12,7.12a2.86,2.86,0,0,1-3.72,4.32Z"/></svg>
          </button>
        </div>
        <div class="justify-between flex flex-col sm:flex-row sm:space-x-7 space-x-reverse h-[calc(100%-70px)] sm:h-auto">
          <div class="pl-7 sm:pl-0">
            <h2 class="sm:hidden text-right text-lg text-neutral-800 mb-7 sm:mb-4 font-bold">{{ name }}</h2>
            <img id="selected-image" width="476" src="{{ settings.images_prefix.server }}{{ settings.images_prefix.products }}large/{{ images[0] }}" />
          </div>
          <div>
            <h2 class="hidden sm:block text-right text-lg text-neutral-800 mb-4 font-bold">{{ name }}</h2>
            <div class="sm:hidden font-bold text-neutral-700 text-sm mb-3.5">
              <span id="counter">1</span>/6
            </div>
            <div class="scrollable image-container flex flex-row gap-2.5 overflow-x-auto sm:overflow-x-hidden overflow-hidden overflow-y-hidden sm:flex-wrap flex-nowrap">
              {% for image in images %}
              <div data-index="{{ loop.index }}" class="block carousel-pointer grow-1 shrink-0 rounded-xs border-2 border-cyan-400 overflow-hidden cursor-pointer w-90 h-90">
                <img
                  src="{{ settings.images_prefix.server }}{{ settings.images_prefix.products }}medium/{{ image }}"
                  class="object-contain w-90 h-90"
                />
              </div>
              {% endfor %}
            </div>
          </div>
        </div>
      `,
    },
  };

  const descriptionModal = {
    tagName: "bd-modal",
    attributes: {
      class: "hidden description-modal",
    },
    components: {
      attributes: {
        class: "bg-white p-7 font-iranyekan h-full",
      },
      components: [
        {
          attributes: { class: "flex" },
          components: [
            {
              tagName: "button",
              attributes: { class: "close rounded-md" },
              components: {
                tagName: "svg",
                type: "svg",
                style: { height: "18px" },
                attributes: {
                  viewBox: "0 0 24 24",
                },
                components: {
                  tagName: "path",
                  type: "svg-in",
                  attributes: {
                    d: "M23.92,12.42h0s0,0,0,0v0l0,0h0a.57.57,0,0,1-.08.13h0a.43.43,0,0,1-.09.1h0L14.9,21.67a1.08,1.08,0,0,1-1.52,0l0,0a1.12,1.12,0,0,1-.1-1.44l.1-.12,6.92-7H1.11A1.11,1.11,0,0,1,1,10.9H20.28l-6.93-7a1.12,1.12,0,0,1,0-1.57,1.09,1.09,0,0,1,1.42-.11l.12.11,8.79,8.88a1.3,1.3,0,0,1,.15.2v0s0,0,0,0A1.06,1.06,0,0,1,24,12,1.16,1.16,0,0,1,23.92,12.42Z",
                  },
                },
              },
            },
            {
              content: "نقد و بررسی",
              attributes: {
                class: "mr-5.5 text-lg text-neutral-700 font-bold",
              },
            },
          ],
        },
        {
          tagName: "h2",
          content: "{{ name }}",
          attributes: {
            class: "text-right text-xs text-neutral-500 font-light mb-7 mt-3.5",
          },
        },
        {
          attributes: {
            class: "mt-4 text-base text-neutral-700 font-light leading-7",
          },
          content: '{{ description | urlize | safe if description else "" }}',
        },
      ],
    },
  };

  const specsModal = {
    tagName: "bd-modal",
    attributes: {
      class: "hidden specs-modal",
    },
    components: {
      attributes: {
        class: "bg-white p-7 pt-0 font-iranyekan h-full",
      },
      style: { overflow: "scroll" },
      components: [
        {
          attributes: { class: "flex sticky top-0 bg-white py-3 w-full" },
          components: [
            {
              tagName: "button",
              attributes: { class: "close rounded-md" },
              components: {
                tagName: "svg",
                type: "svg",
                style: { height: "18px" },
                attributes: {
                  viewBox: "0 0 24 24",
                },
                components: {
                  tagName: "path",
                  type: "svg-in",
                  attributes: {
                    d: "M23.92,12.42h0s0,0,0,0v0l0,0h0a.57.57,0,0,1-.08.13h0a.43.43,0,0,1-.09.1h0L14.9,21.67a1.08,1.08,0,0,1-1.52,0l0,0a1.12,1.12,0,0,1-.1-1.44l.1-.12,6.92-7H1.11A1.11,1.11,0,0,1,1,10.9H20.28l-6.93-7a1.12,1.12,0,0,1,0-1.57,1.09,1.09,0,0,1,1.42-.11l.12.11,8.79,8.88a1.3,1.3,0,0,1,.15.2v0s0,0,0,0A1.06,1.06,0,0,1,24,12,1.16,1.16,0,0,1,23.92,12.42Z",
                  },
                },
              },
            },
            {
              content: "مشخصات فنی",
              attributes: {
                class: "mr-5.5 text-lg text-neutral-700 font-bold",
              },
            },
          ],
        },
        `
          <div class="flex flex-row text-right mt-4">
            <ul class="inline-block w-full text-base">
              {% for spec in specs %}
                <li class="bg-neutral-50 rounded-xs p-1 mb-2.5 text-neutral-400 font-bold">{{ spec.key }} </li>
                <li class="mb-2.5 text-neutral-700 font-light">{{ spec.value.name }}</li>
              {% endfor %}
            </ul>
          </div>
        `,
      ],
    },
  };

  const script = function () {
    function currencyFilter(value) {
      return value
        ? String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        : 0;
    }

    setTimeout(() => {
      new window.Swiper(this.querySelector(".swiper.mobile"), {
        preloadImages: true,
        centeredSlides: true,
        pagination: {
          el: this.querySelector(".swiper-pagination"),
          clickable: true,
        },
      });
    }, 100);

    const shareModal = this.querySelector("bd-modal.share-modal");
    this.querySelectorAll("button.share-btn").forEach(
      (btn) => (btn.onclick = () => shareModal.show())
    );

    const galleryModal = this.querySelector("bd-modal.gallery-modal");
    Array.from(this.querySelectorAll("div.gallery")).forEach(
      (el) => (el.onclick = () => galleryModal.show())
    );

    const selectedVariants = () =>
      Array.from(this.querySelectorAll('select[class*="variant-type"]')).map(
        ({ value }) => value
      );
    const findVariant = (selectedVaraint) =>
      window.product.variants.find((variant) => {
        const variantTypeList = variant.variant_type.map(({ value }) => value);
        if (selectedVaraint.every((type) => variantTypeList.includes(type)))
          return variant;
        else return null;
      });

    let variantValues = selectedVariants();
    const checkOrderAvailable = (product) => {
      if (!product?.order_available && !product?.order_no_check) {
        this.querySelectorAll("div.quantity").forEach((div) =>
          div.classList.remove("block")
        );
        this.querySelectorAll("div.quantity").forEach((div) =>
          div.classList.add("hidden")
        );
        this.querySelectorAll("div.no-quantity").forEach((btn) =>
          btn.classList.remove("hidden")
        );
        this.querySelectorAll("div.no-quantity").forEach((btn) =>
          btn.classList.add("block")
        );
        this.querySelectorAll("div.not-quantity").forEach((div) =>
          div.classList.remove("hidden")
        );
        this.querySelectorAll("div.not-quantity").forEach((div) =>
          div.classList.add("block")
        );
        this.querySelectorAll("button.add-to-basket").forEach((btn) =>
          btn.classList.remove("block")
        );
        this.querySelectorAll("button.add-to-basket").forEach((btn) =>
          btn.classList.add("hidden")
        );
        this.querySelectorAll("div.no-quantity-price").forEach((div) =>
          div.classList.remove("block")
        );
        this.querySelectorAll("div.no-quantity-price").forEach((div) =>
          div.classList.add("hidden")
        );
      } else {
        this.querySelectorAll("div.quantity").forEach((div) =>
          div.classList.remove("hidden")
        );
        this.querySelectorAll("div.quantity").forEach((div) =>
          div.classList.add("block")
        );
        this.querySelectorAll("div.no-quantity").forEach((btn) =>
          btn.classList.remove("block")
        );
        this.querySelectorAll("div.no-quantity").forEach((btn) =>
          btn.classList.add("hidden")
        );
        this.querySelectorAll("div.not-quantity").forEach((div) =>
          div.classList.remove("block")
        );
        this.querySelectorAll("div.not-quantity").forEach((div) =>
          div.classList.add("hidden")
        );
        this.querySelectorAll("button.add-to-basket").forEach((btn) =>
          btn.classList.remove("hidden")
        );
        this.querySelectorAll("button.add-to-basket").forEach((btn) =>
          btn.classList.add("block")
        );
        this.querySelectorAll("div.no-quantity-price").forEach((div) =>
          div.classList.remove("hidden")
        );
        this.querySelectorAll("div.no-quantity-price").forEach((div) =>
          div.classList.add("block")
        );
      }
    };
    const relativePrice = (product) => {
      this.querySelectorAll("div.price-label").forEach(
        (el) => (el.innerHTML = `${currencyFilter(product.price)} تومان`)
      );
    };
    const retrieveVariableValues = (values) => {
      this.querySelector("ul.varaints-label").innerHTML = values
        .map((value) => `<li>${value}</li>`)
        .join("");
    };

    setTimeout(() => {
      if (window.product?.is_parent) {
        window.variantProduct = findVariant(variantValues);
        checkOrderAvailable(window.variantProduct);
        relativePrice(window.variantProduct);
        retrieveVariableValues(variantValues);
      }

      this.querySelectorAll('select[class*="variant-type"]').forEach((el) => {
        el.onchange = () => {
          variantValues = selectedVariants();
          const product = findVariant(variantValues);
          window.variantProduct = product;

          checkOrderAvailable(product);
          relativePrice(product);
          retrieveVariableValues(variantValues);
        };
      });
    }, 100);

    if (!window.product?.order_available && !window.product?.order_no_check) {
      this.querySelectorAll("div.not-quantity").forEach((div) =>
        div.classList.remove("hidden")
      );
      this.querySelectorAll("div.not-quantity").forEach((div) =>
        div.classList.add("block")
      );
      this.querySelectorAll("div.quantity").forEach((div) =>
        div.classList.remove("block")
      );
      this.querySelectorAll("div.quantity").forEach((div) =>
        div.classList.add("hidden")
      );
    } else {
      this.querySelectorAll("div.not-quantity").forEach((div) =>
        div.classList.remove("block")
      );
      this.querySelectorAll("div.not-quantity").forEach((div) =>
        div.classList.add("hidden")
      );
      this.querySelectorAll("div.quantity").forEach((div) =>
        div.classList.remove("hidden")
      );
      this.querySelectorAll("div.quantity").forEach((div) =>
        div.classList.add("block")
      );
    }

    const tabs = this.querySelectorAll("ul.tabs a");

    tabs.forEach((tab) => {
      tab.onclick = ({ target }) => {
        const activeClass = [
          "text-rose-500",
          "font-bold",
          "border-b-2",
          "border-rose-500",
        ];

        tabs.forEach((tab) => tab.parentNode.classList.remove(...activeClass));
        target.parentNode.classList.add(...activeClass);
      };
    });

    const activeClass = ["border-2", "border-cyan-400"];
    const selectedImage = this.querySelector("img#selected-image");
    const imageContainer = this.querySelectorAll("div.image-container > div");

    function removeSelectedImage() {
      imageContainer.forEach((el) => el.classList.remove(...activeClass));
    }

    imageContainer.forEach((image) => {
      image.onclick = ({ currentTarget, target }) => {
        const imagePath = target.src;

        const imageCounter = this.querySelector("span#counter");
        imageCounter.innerText = currentTarget.dataset.index;

        removeSelectedImage();
        currentTarget.classList.add(...activeClass);
        selectedImage.src = imagePath;
      };
    });

    const descriptionCollapsBtn = this.querySelector("button.desc-collaps");
    const descriptionContent = this.querySelector("div.description-content");

    // if (descriptionContent.clientHeight <= 100) {
    //   descriptionCollapsBtn.classList.remove('sm:flex')
    //   descriptionCollapsBtn.classList.add('sm:hidden')
    // }

    if (descriptionContent.classList.contains("h-[10.938rem]")) {
      descriptionContent.classList.remove("h-[10.938rem]");
      if (descriptionContent.clientHeight <= 100) {
        descriptionCollapsBtn.classList.remove("sm:flex");
        descriptionCollapsBtn.classList.add("sm:hidden");
        this.querySelector("button.description-btn").classList.remove("flex");
        this.querySelector("button.description-btn").classList.add("hidden");
      } else {
        descriptionContent.classList.add("h-[10.938rem]");
      }
    }

    // if (descriptionContent.classList.contains('h-[10.938rem]')) {
    //     descriptionContent.classList.remove('h-[10.938rem]')
    //   }

    descriptionCollapsBtn.onclick = () => {
      if (descriptionContent.classList.contains("h-[10.938rem]")) {
        descriptionContent.classList.remove("h-[10.938rem]");
        descriptionCollapsBtn
          .querySelector("span.see-less")
          .classList.remove("hidden");
        descriptionCollapsBtn
          .querySelector("span.see-more")
          .classList.add("hidden");
        descriptionCollapsBtn.querySelector("svg").classList.add("rotate-180");
      } else {
        descriptionContent.classList.add("h-[10.938rem]");
        descriptionCollapsBtn
          .querySelector("span.see-less")
          .classList.add("hidden");
        descriptionCollapsBtn
          .querySelector("span.see-more")
          .classList.remove("hidden");
        descriptionCollapsBtn
          .querySelector("svg")
          .classList.remove("rotate-180");
      }
    };

    const descriptionModal = this.querySelector("bd-modal.description-modal");

    this.querySelector("button.description-btn").onclick = () =>
      descriptionModal.show();

    const specsCollapsBtn = this.querySelector("button#specs-collaps");
    const specsContent = this.querySelector("div.specs-content");

    // if (specsContent.clientHeight <= 100) {
    //   specsCollapsBtn.classList.remove('sm:flex')
    //   specsCollapsBtn.classList.add('sm:hidden')
    // }

    // if (specsContent.classList.contains('h-[10.938rem]')) {
    //     specsContent.classList.remove('h-[10.938rem]')
    //   }

    // specsCollapsBtn.onclick = () => {
    //   if (specsContent.classList.contains('h-[10.938rem]')) {
    //     specsContent.classList.remove('h-[10.938rem]')
    //     specsCollapsBtn.querySelector('span.see-less').classList.add('hidden')
    //     specsCollapsBtn.querySelector('span.see-more').classList.remove('hidden')
    //     specsCollapsBtn.querySelector('svg').classList.remove('rotate-180')
    //   }
    //   else {
    //     specsContent.classList.add('h-[10.938rem]')
    //     specsCollapsBtn.querySelector('span.see-less').classList.remove('hidden')
    //     specsCollapsBtn.querySelector('span.see-more').classList.add('hidden')
    //     specsCollapsBtn.querySelector('svg').classList.add('rotate-180')
    //   }
    // }
    if (specsContent.classList.contains("h-[10.938rem]")) {
      specsContent.classList.remove("h-[10.938rem]");
      if (specsContent.clientHeight <= 100) {
        specsCollapsBtn.classList.remove("sm:flex");
        specsCollapsBtn.classList.add("sm:hidden");
        this.querySelector("button.specs-btn").classList.remove("flex");
        this.querySelector("button.specs-btn").classList.add("hidden");
      } else {
        specsContent.classList.add("h-[10.938rem]");
      }
    }

    specsCollapsBtn.onclick = () => {
      if (specsContent.classList.contains("h-[10.938rem]")) {
        specsContent.classList.remove("h-[10.938rem]");
        specsCollapsBtn
          .querySelector("span.see-less")
          .classList.remove("hidden");
        specsCollapsBtn.querySelector("span.see-more").classList.add("hidden");
        specsCollapsBtn.querySelector("svg").classList.add("rotate-180");
      } else {
        specsContent.classList.add("h-[10.938rem]");
        specsCollapsBtn.querySelector("span.see-less").classList.add("hidden");
        specsCollapsBtn
          .querySelector("span.see-more")
          .classList.remove("hidden");
        specsCollapsBtn.querySelector("svg").classList.remove("rotate-180");
      }
    };

    const specsModal = this.querySelector("bd-modal.specs-modal");

    this.querySelector("button.specs-btn").onclick = () => specsModal.show();

    const copyLinkBtn = this.querySelectorAll("button.copy-link");

    copyLinkBtn.forEach((el) => {
      el.onclick = async () => {
        await navigator.clipboard.writeText(location.href);
        const copyContent = el.innerHTML;

        el.innerHTML = "کپی شد!";

        setTimeout(() => (el.innerHTML = copyContent), 2000);
      };
    });

    const commentForm = this.querySelector("form#comment-form");
    const submitCommentForm = async (event) => {
      event.preventDefault();

      const { target, submitter } = event;

      submitter.setAttribute("disabled", true);

      const name = target[0].value;
      const message = target[1].value;
      const form = {
        product_id: window.product.id,
        comment: {
          name,
          text: message,
        },
      };

      try {
        await window.axios.post("/comments", form);
        commentForm.reset();
        alert("نظر شما با موفقیت ارسال شد و پس از تایید نمایش داده خواهد شد.");
      } catch (error) {
        if (error.response?.data.detail === "Not authenticated")
          submitCommentForm(event);
      } finally {
        submitter.removeAttribute("disabled");
      }
    };

    commentForm.onsubmit = submitCommentForm;

    this.querySelectorAll("button.add-to-basket").forEach((btn) => {
      btn.onclick = async () => {
        btn.setAttribute("disabled", true);

        const payload = {
          items: [
            {
              product: window.variantProduct?.id || window.product.id,
              count: 1,
            },
          ],
        };

        if (window.basket && window.basket.items)
          payload.items = payload.items.concat(window.basket.items);

        try {
          const { data } = await window.axios.patch("/baskets", payload);
          const basketBadge = document.querySelector("div.basket-badge");

          basketBadge.innerText = data.items.length;
          window.open("/order/process", "_self");
        } finally {
          btn.removeAttribute("disabled");
        }
      };
    });
  };

  domComponents.addType("bd-page-product-view", {
    model: {
      defaults: {
        script,
        attributes: { class: "container" },
        styles: `
          @media (max-width: 540px) {
            bd-modal.gallery-modal {
              --modal-width: 100%;
              --modal-height: 100%;
              --modal-max-width: 100vw;
            }

            bd-modal.share-modal {
              --modal-align: end;
              --modal-justify: center;
            }

            bd-modal.description-modal,
            bd-modal.specs-modal {
              --modal-width: 100%;
              --modal-height: 100%;
            }
          }

          @media (min-width: 540px) {
            bd-modal.gallery-modal {
              --modal-width: 987px;
              --modal-max-width: 90vw;
            }

            bd-modal.share-modal {
              --modal-width: 400px;
            }
          }

          .gutter-15 {
            margin-top: -15px;
            margin-left: -15px;
          }

          .gutter-15 > * {
            padding-top: 15px;
            padding-left: 15px;
          }

          .scrollable::-webkit-scrollbar {
            display: none;
          }

          .more {
            position: relative
          }

          .more:after {
            content: '';
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
            width: 1.375rem;
            height: 1.375rem;
            border-radius: 50%;
            background-color: rgb(0 0 0 / 30%);
            background-image: url("data:image/svg+xml,%3csvg fill='white' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath id='more' d='M18.94%2c12a2.53%2c2.53%2c0%2c1%2c1%2c2.53%2c2.53h0A2.53%2c2.53%2c0%2c0%2c1%2c18.94%2c12ZM9.47%2c12A2.53%2c2.53%2c0%2c1%2c1%2c12%2c14.53h0A2.53%2c2.53%2c0%2c0%2c1%2c9.47%2c12ZM0%2c12a2.53%2c2.53%2c0%2c1%2c1%2c2.53%2c2.53h0A2.53%2c2.53%2c0%2c0%2c1%2c0%2c12Z'/%3e%3c/svg%3e");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 12px;
          }

          .more > img {
            filter: blur(2.7px)
          }

          span.swiper-pagination-bullet {
            box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.08);
            background: #e6e6e6;
            opacity: 1;
          }

          span.swiper-pagination-bullet-active {
            background: #000000;
          }

          li.no-border:last-child {
            border: none;
          }
        `,
        components: {
          attributes: { class: "space-y-7" },
          components: [
            detailsComponent,
            detailsComponentMobile,
            {
              attributes: { class: "flex flex-row gap-7" },
              components: [
                {
                  attributes: { class: "w-full lg:w-3/4" },
                  components: [
                    {
                      attributes: {
                        class:
                          "bg-white p-7 rounded-md shadow-md font-iranyekan",
                      },
                      components: [
                        tabsComponent,
                        descriptionComponent,
                        {
                          tagName: "hr",
                          attributes: { class: "bg-neutral-200 my-7" },
                        },
                        specsComponent,
                        {
                          tagName: "hr",
                          attributes: { class: "bg-neutral-200 my-7" },
                        },
                        commentsComponent,
                      ],
                    },
                  ],
                },
                {
                  attributes: { class: "hidden lg:block w-3/12" },
                  components: shortDetailComponent,
                },
              ],
            },
            shareModal,
            galleryModal,
            descriptionModal,
            specsModal,
          ],
        },
      },
      init() {
        addUpdateToolbar.bind(this).call();
      },
    },
  });
}
