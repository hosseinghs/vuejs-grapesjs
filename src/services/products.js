import API from "./api";

export function getProductWithIdApi(id = "630f1afe8d4aae14aa8213b9") {
  return API.get("/products/get/" + id);
}
