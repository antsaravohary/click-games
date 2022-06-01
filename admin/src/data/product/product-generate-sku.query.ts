import Product from "@repositories/product";
import { useQuery } from "react-query";
import { Product as TProduct } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchProductSKU = async () => {
  const { data } = await Product.http("product-generate-sku", "get");
  return data;
};

export const useProductSKU = () => {
  return useQuery<{ sku: string }, Error>("product-generate-sku", () =>
    fetchProductSKU()
  );
};
