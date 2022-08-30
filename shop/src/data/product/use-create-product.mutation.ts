import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { ProductService, ProductType } from "./product.service";

export const useCreateProductMutation = () => {
  return useMutation(
    (input: ProductType) => ProductService.createProduct(input),
    {
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      },
    }
  );
};
