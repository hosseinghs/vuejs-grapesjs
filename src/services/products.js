import API from "./api";

export function getProductWithIdApi(id) {
  return API.get("/products/get/" + id);
}
