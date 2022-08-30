import { CustomerProduct } from "@ts-types/customer-products-type";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";
import { CustomerProductService } from "./custome-product.service";

export const fetchCustomerProduct = async () => {
  const { data } = await CustomerProductService.findAll();

  return data;
};

export const useCustomerProductQuery = () => {
  return useQuery<CustomerProduct[], Error>(
    API_ENDPOINTS.CUSTOMER_PRODUCT,
    fetchCustomerProduct
  );
};
